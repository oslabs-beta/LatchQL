import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

import { ApolloServer } from "apollo-server-express";
import { readFile } from "fs/promises";
import { resolvers } from "../../test-db/resolvers.js";
import path from "path";
import { GraphQLError, GraphQLSchema } from "graphql";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";

// Import Limiters
import { calcCost } from "../limiters/cost-limiter.js";
import { depthLimit } from "../limiters/depth-limiter.js";
import {
  isConstructorDeclaration,
  ResolveProjectReferencePathHost,
} from "typescript";
import { rateLimiter } from "../limiters/rate-limiter.js";
import * as dotenv from "dotenv";
import process from "process";

import redis from "redis";


type schema = {
  typeDefs: string;
  resolvers: Object;
};

export default class LatchQL {
  public typeDefs: string;
  public resolvers: {};
  private schema: GraphQLSchema;
  public apolloServer: any; //figure out TS here
  // public middleWare: ((resolve: any, root: any, args: any, context: any, info: any) => Promise<any>);
  constructor(types: string, resolvers: {}) {
    this.typeDefs = types;
    this.resolvers = resolvers;
    this.schema = this.createSchema();
    this.apolloServer = this.createApolloServer();
  }
  createSchema() {
    //const args = {typeDefs: this.typeDefs, resolvers: this.resolvers};
    const schema = makeExecutableSchema({ typeDefs: this.typeDefs, resolvers });
    return schema;
  }
  createApolloServer() {
    const schemaWithMiddleware = applyMiddleware(this.schema, this.middleWare);
    const apolloServer = new ApolloServer({
      context: ({ req, res }: any) => ({ req, res }),
      schema: schemaWithMiddleware,
    });
    return apolloServer;
  }
 
  async middleWare(resolve, root, args, context, info) {
    const redisClient = redis.createClient();
    await redisClient.connect();
    context.test = "AWHOOOOOO!";
    console.log("inside midware");
    // let currentDate = new Date();
    

    //context.res.locals.cpu = [process.cpuUsage().system];
    // context.res.locals.time = [currentDate.getTime()];
    if (!context.alreadyRan) {
      //let cpu = process.cpuUsage().system;
     // await redisClient.incrBy('cpu', context.res.locals.cpu[0]);
      //redisClient.expire('cpu', 1);
      context.res.locals.cpuStart = process.cpuUsage().system;
      let now = new Date();
      context.res.locals.timeStart = now.getTime();
      const query = context.req.body.query;

      console.log(query);
      // the JWT token

      // if user logs in from GUI, bypass the JWT
      let authLevel: string = "Non-User";
      if (context.req.headers['gui']) {
        authLevel = context.req.headers["gui"];
        console.log(authLevel);
        // if not, do the JWT authorization
      } else {
        console.log("hi");
        const token = context.req.headers.authorization.split(" ")[1];
        //pull the secret key from the .env file
        dotenv.config();
        let key: string;
        if (process.env.SECRET_KEY) key = process.env.SECRET_KEY;
        else key = "GENERICKEY";
        //verify the JWT -- if not valid, the authLevel will reamin "nonUser"
        jwt.verify(token, key, (err, decoded) => {
          if (err) {
            console.log(err);
          } else {
            authLevel = decoded.authLevel;
          }
        });
      }
      const authLimits = await readFile("./latch_config.json", "utf8");
      console.log(authLimits);
      const parsedLimits = JSON.parse(authLimits);

      console.log(parsedLimits[authLevel].depthLimit);

      const maxDepth = parseInt(parsedLimits[authLevel].depthLimit);
      const rateLimit = parseInt(parsedLimits[authLevel].rateLimit);
      const costLimit = parseInt(parsedLimits[authLevel].costLimit);
      const depthLimitExceed = depthLimit(query, maxDepth);
      const user_ip = context.req.socket.remoteAddress;
      //console.log(context.req.headers);
      if (depthLimitExceed) {
        throw new GraphQLError(
          `Your query exceeds maximum operation depth of ${maxDepth}`,
          null,
          null,
          null,
          null,
          null,
          {
            code: "DEPTH_LIMIT_EXCEEDED",
            http: {
              status: 404,
            },
          }
        );
      }
      const { costSum, withinLimit } = calcCost(query, 1.5, costLimit);
      if (!withinLimit) {
        throw new GraphQLError(
          `Your query exceeds maximum operation cost of ${costLimit}`,
          null,
          null,
          null,
          null,
          null,
          {
            code: "LIMIT_EXCEEDED",
            http: {
              status: 404,
            },
          }
        );
      }
      const withinRateLimit = await rateLimiter(user_ip, costSum, rateLimit);
      if (!withinRateLimit) {
        throw new GraphQLError(
          `Your query exceeds maximum rate limit of ${rateLimit}`,
          null,
          null,
          null,
          null,
          null,
          {
            code: "RATE_LIMIT_EXCEEDED",
            http: {
              status: 404,
            },
          }
        );
      }

      context.alreadyRan = true;
    }
    console.log("running resolver");
    const result = await resolve(root, args, context, info);
    const newDate = new Date();
    // context.res.locals.time.push(now.getTime());
    let currCpu = process.cpuUsage().system;
    //context.res.locals.cpu.push(currCpu);
    const totalCpu = currCpu - context.res.locals.cpuStart;
    await redisClient.set('cpu', totalCpu);

    const totalTime = newDate.getTime() - context.res.locals.timeStart;
    await redisClient.set('time', totalTime);

    return result;
  }
  async startLatch(app: any) {
    await this.apolloServer.start();
    this.apolloServer.applyMiddleware({
      app,
      path: "/graphql",
    });
    app.get("/latchql", (req: any, res: any) => {
      res.header("Access-Control-Allow-Origin", "*");
      readFile("./latch_config.json", "utf-8")
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
    });
    app.get("/metrics", async (req: any, res: any) => {
      try{
        const redisClient = redis.createClient();
        await redisClient.connect();
        res.header("Access-Control-Allow-Origin", "*");
        const cpu = await redisClient.get('cpu');
        const time = await redisClient.get('time');
        res.status(200).send([cpu, time]);
      }catch(err){
        console.log(err);
        res.status(500).send(err);
      }
    });
  }
}

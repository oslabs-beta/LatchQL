import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

import { ApolloServer } from "apollo-server-express";
import { readFile } from "fs/promises";
import { resolvers } from "../test-db/resolvers.js";
import path from "path";
import { GraphQLError, GraphQLSchema } from "graphql";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";

// Import Limiters
import { calcCost } from "../src/limiters/cost-limiter.js";
import { depthLimit } from "../src/limiters/depth-limiter.js";
import { isConstructorDeclaration } from "typescript";

type schema = {
    typeDefs: string,
    resolvers: Object
}

class LatchQL {
    private typeDefs: string;
    private resolvers: Object;
    private schema: GraphQLSchema;
    public apolloServer: any; //figure out TS here
    public middleware: Array<Function>
    constructor(types: string , resolvers: Object){
        this.typeDefs = typeDefs;
        this.resolvers = resolvers;
        this.schema = this.createSchema();
        this.apolloServer = this.createApolloServer()
        this.middleWare = this.createMiddleWare();
    }

    createSchema(){
        const schema = makeExecutableSchema({ this.typeDefs, this.resolvers });
        return schema;
    }
    createApolloServer(){
        const schemaWithMiddleware = applyMiddleware(this.schema, ...middleware);
        const apolloServer = new ApolloServer({
        context: ({ req, res }: any) => ({ req, res }),
        schema: schemaWithMiddleware,
        });
        return apolloServer;
    }

}










const testMidware = async (resolve, root, args, context, info) => {
    // context.test = "AWHOOOOOO!";
    if (!context.alreadyRan) {
      const query = context.req.body.query;
      const authLimits = await readFile("./latch_config.json", "utf8");
      const parsedLimits = JSON.parse(authLimits);
      const maxDepth = parseInt(parsedLimits.admin.depthLimit);
      const rateLimit = parseInt(parsedLimits.admin.rateLimit);
      const costLimit = parseInt(parsedLimits.admin.costLimit);
      const depthLimitExceed = depthLimit(query, maxDepth);
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
      context.alreadyRan = true;
    }
    console.log("running resolver");
    const result = await resolve(root, args, context, info);
    return result;
  };

  const middleware = [testMidware];
// const middleware = [testMidware];

// console.log(resolvers);

// const schema = makeExecutableSchema({ typeDefs, resolvers });
// // console.log(schema);
// const schemaWithMiddleware = applyMiddleware(schema, ...middleware);

// const apolloServer = new ApolloServer({
//   context: ({ req, res }: any) => ({ req, res }),
//   schema: schemaWithMiddleware,
// });

await apolloServer.start();

//apolloServer.
apolloServer.applyMiddleware({
  app,
  path: "/graphql",
});


  const typeDefs = await readFile("src/schema.graphql", "utf-8");
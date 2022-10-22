// const express = require('express');
// const {ApolloServer} = require('apollo-server-express');
// const {readFile} = require('fs/promises');
// const {resolvers} = require('../src/test-db/resolvers.js')
// const {makeExecutableSchema} = require('@graphql-tools/schema');
// const {applyMiddleware} = require('graphql-middleware');
// const {bodyParser} = require('body-parser');
import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

import { ApolloServer } from "apollo-server-express";
import { readFile } from "fs/promises";
import { resolvers } from "../test-db/resolvers.js";
import path from "path";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";

// Import Limiters
import { calcCost } from "./limiters/cost-limiter.js";
// import { depthLimit } from "./limiters/depth-limiter.js";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req: any, res: any) => {
  res.send("Hello world!");
});

// // middleware sample
const testMidware = async (resolve, root, args, context, info) => {
  // context.test = "AWHOOOOOO!";
  if (!context.alreadyRan) {
    const query = context.req.body.query;
    const authLimits = await readFile("./latch_config.json", "utf8");
    const parsedLimits = JSON.parse(authLimits);
    const depthLimit = parseInt(parsedLimits.admin.depthLimit);
    const rateLimit = parseInt(parsedLimits.admin.rateLimit);
    const costLimit = parseInt(parsedLimits.admin.costLimit);
    const { costSum, withinLimit } = calcCost(query, 1.5, costLimit);
    if (!withinLimit) {
      context.limitError = "You have exceeded your cost limit";
      //return { error: "You have exceeded your cost limit" };
    }
    console.log(parsedLimits);
    console.log(costSum);
    context.alreadyRan = true;
  }
  if (context.limitError) {
    console.log("not running resolver");
    return context.limitError;
  }
  console.log("running resolver");
  const result = await resolve(root, args, context, info);
  return result;

  // const cache = {};
  // const query = context.req.body.query;
  // const cost = calcCost(query, 1.5);
  // let ran;
  // if (!cache[ran]) {
  //   cache[ran] = 1;
  //   console.log(cost);
  //   console.log("first middleware");
  // }
  // const result = await resolve(root, args, context, info);
  // return result;
};

// const middleware2 = async (resolve, root, args, context, info) => {
//   console.log("Second Middleware");

//   const result = await resolve(root, args, context, info);
//   console.log("ran resolver 2");
//   return result;
//   // return await resolve(root, args, context, info);
//   // console.log("Second middleware result: ", result);
//   // return result;
// };

const typeDefs = await readFile("src/schema.graphql", "utf-8");

// const testMidware = {
//   Query: {
//     jobs: loggingMidware,
//   },
//   Job: {
//     company: middleware2,
//   },
// };

// Add middleware limiters to middleware array
const middleware = [testMidware];
// const middleware = [testMidware];

// console.log(resolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });
// console.log(schema);
const schemaWithMiddleware = applyMiddleware(schema, ...middleware);

const apolloServer = new ApolloServer({
  context: ({ req, res }: any) => ({ req, res }),
  schema: schemaWithMiddleware,
});

await apolloServer.start();

//apolloServer.
apolloServer.applyMiddleware({
  app,
  path: "/graphql",
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
  console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
});

//export {};

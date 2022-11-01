import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

import { ApolloServer } from "apollo-server-express";
import { readFile } from "fs/promises";
import { resolvers } from "../test-db/resolvers.js";
import path from "path";
import { GraphQLError } from "graphql";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";

// Import Limiters
import { calcCost } from "./limiters/cost-limiter.js";
import { depthLimit } from "./limiters/depth-limiter.js";

import LatchQL from "./latch-ql-npm/latch.js";
import { jwtController } from "./latch-ql-npm/latch-auth.js";

const app = express();
const port = 8080; // default port to listen
app.use(cors()); 
// define a route handler for the default home page
app.get("/", (req: any, res: any) => {
  res.send("Hello world!");
});

//helper middleware function for testing JwtController
function authSet(req, res, next) {
  res.locals.authLevel = "user";
  res.locals.userName = "Ray";
  next();
}
//test route for jwtController
app.post("/login", authSet, jwtController.setJwt, (req, res) => {
  return res.status(200).send("YES RESPONSE");
});

const typeDefs = await readFile("src/schema.graphql", "utf-8");


let latch = new LatchQL(typeDefs, resolvers);


latch.startLatch(app);
// // middleware sample
// const testMidware = async (resolve, root, args, context, info) => {
//   // context.test = "AWHOOOOOO!";
//   if (!context.alreadyRan) {
//     const query = context.req.body.query;
//     const authLimits = await readFile("./latch_config.json", "utf8");
//     const parsedLimits = JSON.parse(authLimits);
//     const maxDepth = parseInt(parsedLimits.admin.depthLimit);
//     const rateLimit = parseInt(parsedLimits.admin.rateLimit);
//     const costLimit = parseInt(parsedLimits.admin.costLimit);
//     const depthLimitExceed = depthLimit(query, maxDepth);
//     if (depthLimitExceed) {
//       throw new GraphQLError(
//         `Your query exceeds maximum operation depth of ${maxDepth}`,
//         null,
//         null,
//         null,
//         null,
//         null,
//         {
//           code: "DEPTH_LIMIT_EXCEEDED",
//           http: {
//             status: 404,
//           },
//         }
//       );
//     }
//     const { costSum, withinLimit } = calcCost(query, 1.5, costLimit);
//     if (!withinLimit) {
//       throw new GraphQLError(
//         `Your query exceeds maximum operation cost of ${costLimit}`,
//         null,
//         null,
//         null,
//         null,
//         null,
//         {
//           code: "LIMIT_EXCEEDED",
//           http: {
//             status: 404,
//           },
//         }
//       );
//     }
//     context.alreadyRan = true;
//   }
//   console.log("running resolver");
//   const result = await resolve(root, args, context, info);
//   return result;
// };

// // const middleware2 = async (resolve, root, args, context, info) => {
// //   console.log("Second Middleware");

// //   const result = await resolve(root, args, context, info);
// //   console.log("ran resolver 2");
// //   return result;
// //   // return await resolve(root, args, context, info);
// //   // console.log("Second middleware result: ", result);
// //   // return result;
// // };

// const typeDefs = await readFile("src/schema.graphql", "utf-8");

// console.log(typeof typeDefs);
// console.log(typeof resolvers);
// // const testMidware = {
// //   Query: {
// //     jobs: loggingMidware,
// //   },
// //   Job: {
// //     company: middleware2,
// //   },
// // };

// // Add middleware limiters to middleware array
// const middleware = [testMidware];
// // const middleware = [testMidware];

// // console.log(resolvers);

// const schema = makeExecutableSchema({ typeDefs, resolvers });
// // console.log(schema);
// const schemaWithMiddleware = applyMiddleware(schema, ...middleware);

// const apolloServer = new ApolloServer({
//   context: ({ req, res }: any) => ({ req, res }),
//   schema: schemaWithMiddleware,
// });

// await apolloServer.start();

// //apolloServer.
// apolloServer.applyMiddleware({
//   app,
//   path: "/graphql",
// });

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
  console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
});

//export {};

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
import { isConstructorDeclaration, ResolveProjectReferencePathHost } from "typescript";


type schema = {
    typeDefs: string,
    resolvers: Object
}

export default class LatchQL {
    public typeDefs: string;
    public resolvers: {};
    private schema: GraphQLSchema;
    public apolloServer: any; //figure out TS here
   // public middleWare: ((resolve: any, root: any, args: any, context: any, info: any) => Promise<any>);
    constructor(types: string , resolvers: {}){
        this.typeDefs = types;
        this.resolvers = resolvers;
        this.schema = this.createSchema();
        this.apolloServer = this.createApolloServer()

    }

    createSchema(){
        //const args = {typeDefs: this.typeDefs, resolvers: this.resolvers};
        const schema = makeExecutableSchema({ typeDefs: this.typeDefs, resolvers });
        return schema;
    }
    createApolloServer(){
        const schemaWithMiddleware = applyMiddleware(this.schema, this.middleWare);
        const apolloServer = new ApolloServer({
        context: ({ req, res }: any) => ({ req, res }),
        schema: schemaWithMiddleware,
        });
        return apolloServer;
    }
    async middleWare(resolve, root, args, context, info){

        // context.test = "AWHOOOOOO!";
        if (!context.alreadyRan) {
          const query = context.req.body.query;
          const authLimits = await readFile("./latch_config.json", "utf8");
          const parsedLimits = JSON.parse(authLimits);
          const maxDepth = parseInt(parsedLimits.admin.depthLimit);
         // const rateLimit = parseInt(parsedLimits.admin.rateLimit);
          const costLimit = parseInt(parsedLimits.admin.costLimit);
          const depthLimitExceed = depthLimit(query, maxDepth);
          console.log(context.req.headers)
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
      
    }
    async startLatch(app: any){
      await this.apolloServer.start();
      this.apolloServer.applyMiddleware({
        app,
        path: "/graphql",
      });
    }

}










// const testMidware = async (resolve, root, args, context, info) => {
//     // context.test = "AWHOOOOOO!";
//     if (!context.alreadyRan) {
//       const query = context.req.body.query;
//       const authLimits = await readFile("./latch_config.json", "utf8");
//       const parsedLimits = JSON.parse(authLimits);
//       const maxDepth = parseInt(parsedLimits.admin.depthLimit);
//       const rateLimit = parseInt(parsedLimits.admin.rateLimit);
//       const costLimit = parseInt(parsedLimits.admin.costLimit);
//       const depthLimitExceed = depthLimit(query, maxDepth);
//       if (depthLimitExceed) {
//         throw new GraphQLError(
//           `Your query exceeds maximum operation depth of ${maxDepth}`,
//           null,
//           null,
//           null,
//           null,
//           null,
//           {
//             code: "DEPTH_LIMIT_EXCEEDED",
//             http: {
//               status: 404,
//             },
//           }
//         );
//       }
//       const { costSum, withinLimit } = calcCost(query, 1.5, costLimit);
//       if (!withinLimit) {
//         throw new GraphQLError(
//           `Your query exceeds maximum operation cost of ${costLimit}`,
//           null,
//           null,
//           null,
//           null,
//           null,
//           {
//             code: "LIMIT_EXCEEDED",
//             http: {
//               status: 404,
//             },
//           }
//         );
//       }
//       context.alreadyRan = true;
//     }
//     console.log("running resolver");
//     const result = await resolve(root, args, context, info);
//     return result;
//   };

//   const middleware = [testMidware];
// const middleware = [testMidware];

// console.log(resolvers);

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


  // const typeDefs = await readFile("src/schema.graphql", "utf-8");
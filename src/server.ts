
// const express = require('express');
// const {ApolloServer} = require('apollo-server-express');
// const {readFile} = require('fs/promises');
// const {resolvers} = require('../src/test-db/resolvers.js')
// const {makeExecutableSchema} = require('@graphql-tools/schema');
// const {applyMiddleware} = require('graphql-middleware');
// const {bodyParser} = require('body-parser');
import cors from 'cors';
import express from 'express';
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';

import {ApolloServer} from 'apollo-server-express';
import { readFile } from 'fs/promises';
import {resolvers} from '../test-db/resolvers.js';



import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';


// Import Limiters


const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req:any, res:any ) => {
    res.send( "Hello world!" );
} );


// // middleware sample 
const loggingMidware = async (resolve, root, args, context, info) => {
    context.test = "AWHOOOOOO!"
    
    //console.log('logging resolver args:', "resolve: ",resolve, "root: ", root,"args: ", args, "info: ", info );
    //console.log("context: ", context);
    //console.log(context.fieldNodes.arguments[0]);
    console.log("YEEEEEEEEEE")
    const result = await resolve(root, args, context, info)
    console.log('result: ', result);
    return result;
  }

const middleware2 = async (resolve, root, args, context, info) => {
    console.log("Second Middleware");
    const result = await resolve(root, args, context, info)
    console.log(result);
    return result;
}

const typeDefs = await readFile('src/schema.graphql', 'utf-8');

// const testMidware = {
//   Query: {
//     jobs: loggingMidware
//   },
//   Job: {
//     company: middleware2
//   }
// }

// Add middleware limiters to middleware array
const middleware = [loggingMidware, middleware2]
// const middleware = [testMidware]

// console.log(resolvers);

const schema = makeExecutableSchema({typeDefs, resolvers});
// console.log(schema);
const schemaWithMiddleware = applyMiddleware(schema, ...middleware);



const apolloServer = new ApolloServer({ 
  context : ({req, res}: any) => ({req, res}),
  schema: schemaWithMiddleware,
 });

await apolloServer.start();



//apolloServer.
apolloServer.applyMiddleware({ 
  app,
  path: '/graphql' });

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
    console.log(`GraphQL endpoint: http://localhost:${ port }/graphql`);
} );

//export {};
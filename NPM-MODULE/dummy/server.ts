import cors from "cors";
import express from "express";
import { readFile } from "fs/promises";
import { resolvers } from "./test-db/resolvers.js";
// import {LatchQL, jwtController} from 'latchql';
import { LatchQL, jwtController } from "../src/latch-ql-npm/latch.js";

const app = express();
const port = 8080; // default port to listen
app.use(cors());
app.use(express.json());

//helper middleware function for testing JwtController
function authSet(req, res, next) {
  res.locals.authLevel = "user";
  res.locals.userName = "Ray";
  next();
}

// test route for jwtController
app.post("/login", authSet, jwtController.setJwt, (req, res) => {
  return res.status(200).send("YES RESPONSE");
});

const typeDefs = await readFile("./schema.graphql", "utf-8");
const redisConfig = {
  port: 6379,
  host: "localhost",
};

// Instantiate LatchQL
let latch = new LatchQL(typeDefs, resolvers, redisConfig);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
  console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
});

latch.startLatch(app, port);

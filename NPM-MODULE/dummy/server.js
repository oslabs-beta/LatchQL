import cors from "cors";
import express from "express";
import { readFile } from "fs/promises";
//const resolvePath: string = path.resolve(__dirname, "./test-db/resolvers.js")
import { resolvers } from "./test-db/resolvers.js";
// import { resolvers } from "./../test-db/resolvers.js";
// import {JwtController} from "latchql";
import { LatchQL, jwtController } from 'latchql';
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
console.log(LatchQL);
// console.log(JwtController);
// test route for jwtController
// const jwts = new JwtController();
// app.post("/login", authSet, jwts.setJwt, (req, res) => {
//   return res.status(200).send("YES RESPONSE");
// });
app.post("/login", authSet, jwtController.setJwt, (req, res) => {
    return res.status(200).send("YES RESPONSE");
});
const typeDefs = await readFile("./schema.graphql", "utf-8");
let latch = new LatchQL(typeDefs, resolvers);
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
});
latch.startLatch(app, port);
//# sourceMappingURL=server.js.map
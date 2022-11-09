import express from "express";
import proxy from "express-http-proxy";
import { readFile } from "fs/promises";
import { GraphQLError } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { graphqlHTTP } from "express-graphql";
// Import Limiters
import { calcCost } from "./cost-limiter.js";
import { depthLimit } from "./depth-limiter.js";
import { rateLimiter } from "./rate-limiter.js";
import * as dotenv from "dotenv";
import process from "process";
import redis from "redis";
import findNearestFile from 'find-nearest-file';
import jwt from "jsonwebtoken";
dotenv.config();
let key;
//read secret KEY from .env file -- if not set-up, default to a generic key
if (process.env.SECRET_KEY)
    key = process.env.SECRET_KEY;
else
    key = "GENERICKEY";
//middleware to be setup in dev user's authentication process:
/*
    dev user will pass in the user's auth level and username to the jwt contorller through
    the res.locals element so that an authenticating jwt can be set on the user
*/
const jwtController = {
    setJwt: (req, res, next) => {
        if (!res.locals.authLevel || !res.locals.userName) {
            return next();
        }
        let authLevel = res.locals.authLevel;
        let userName = res.locals.userName;
        const payload = { userName: userName, authLevel: authLevel };
        const token = jwt.sign(payload, key, { expiresIn: "5d" });
        return res.json({ token });
    }
};
export { jwtController };
class LatchQL {
    constructor(types, resolvers) {
        this.typeDefs = types;
        this.resolvers = resolvers;
        this.schema = this.createSchema();
        this.schemaWithMiddleWare = this.addMiddleWare();
    }
    //use passed in typeDefs to create schema
    createSchema() {
        const schema = makeExecutableSchema({ typeDefs: this.typeDefs, resolvers: this.resolvers });
        return schema;
    }
    addMiddleWare() {
        const schemaWithMiddleware = applyMiddleware(this.schema, this.middleWare);
        return schemaWithMiddleware;
    }
    //primary functionality here
    async middleWare(resolve, root, args, context, info) {
        const redisClient = redis.createClient();
        await redisClient.connect();
        //only need to run checks on initial pass
        if (!context.alreadyRan) {
            context.res.locals.cpuStart = process.cpuUsage().system;
            let now = new Date();
            context.res.locals.timeStart = now.getTime();
            const query = context.params.query;
            // if user logs in from GUI, bypass the JWT
            let authLevel = "Non-User";
            if (context.req.headers["gui"]) {
                authLevel = context.req.headers["gui"];
                // if not, do the JWT authorization
            }
            else {
                const token = context.req.headers.authorization.split(" ")[1];
                //pull the secret key from the .env file
                dotenv.config();
                let key;
                if (process.env.SECRET_KEY)
                    key = process.env.SECRET_KEY;
                else
                    key = "GENERICKEY";
                //verify the JWT -- if not valid, the authLevel will reamin "nonUser"
                jwt.verify(token, key, (err, decoded) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        authLevel = decoded.authLevel;
                    }
                });
            }
            const configPath = findNearestFile('latch_config.json');
            console.log(configPath);
            const authLimits = await readFile(configPath, "utf8");
            const parsedLimits = JSON.parse(authLimits);
            const maxDepth = parseInt(parsedLimits[authLevel].depthLimit);
            const rateLimit = parseInt(parsedLimits[authLevel].rateLimit);
            const costLimit = parseInt(parsedLimits[authLevel].costLimit);
            const depthLimitResult = depthLimit(query, maxDepth);
            const user_ip = context.req.socket.remoteAddress;
            if (!depthLimitResult.withinLimit) {
                throw new GraphQLError(`Your query exceeds maximum operation depth of ${maxDepth}`, null, null, null, null, null, {
                    code: "DEPTH_LIMIT_EXCEEDED",
                    http: {
                        status: 404,
                    },
                });
            }
            const { costSum, withinLimit } = calcCost(query, 1.5, costLimit);
            console.log("COST SUM, WITHIN LIMIT:", costSum, withinLimit);
            if (!withinLimit) {
                throw new GraphQLError(`Your query exceeds maximum operation cost of ${costLimit}`, null, null, null, null, null, {
                    code: "LIMIT_EXCEEDED",
                    http: {
                        status: 404,
                    },
                });
            }
            const withinRateLimit = await rateLimiter(user_ip, costSum, rateLimit);
            if (!withinRateLimit) {
                throw new GraphQLError(`Your query exceeds maximum rate limit of ${rateLimit} per 10s`, null, null, null, null, null, {
                    code: "RATE_LIMIT_EXCEEDED",
                    http: {
                        status: 404,
                    },
                });
            }
            context.alreadyRan = true;
        }
        const result = await resolve(root, args, context, info);
        const newDate = new Date();
        let currCpu = process.cpuUsage().system;
        const totalCpu = currCpu - context.res.locals.cpuStart;
        await redisClient.set("cpu", totalCpu);
        const totalTime = newDate.getTime() - context.res.locals.timeStart;
        await redisClient.set("time", totalTime);
        return result;
    }
    async startLatch(app, port) {
        //start a pass through server to listen on 2222 and proxy those requests to dev user's port
        const newServer = express();
        newServer.all("/*", proxy(`http://localhost:${port}`));
        app.use("/graphql", graphqlHTTP((req, res, params) => {
            return {
                schema: this.schemaWithMiddleWare,
                rootValue: this.resolvers,
                graphiql: false,
                context: { req, res, params },
            };
        }));
        //set up an endpoint for the playground to retrieve the config file
        app.get("/latchql", (req, res) => {
            res.header("Access-Control-Allow-Origin", "*");
            const configPath = findNearestFile('latch_config.json');
            console.log(configPath);
            readFile(configPath, "utf-8")
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            });
        });
        //endpoint for playground to retrieve metrics
        app.get("/metrics", async (req, res) => {
            try {
                const redisClient = redis.createClient();
                await redisClient.connect();
                res.header("Access-Control-Allow-Origin", "*");
                const cpu = await redisClient.get("cpu");
                const time = await redisClient.get("time");
                const percent = Number(cpu) / 1000 / Number(time);
                res.status(200).send([percent, time]);
            }
            catch (err) {
                console.log(err);
                res.status(500).send(err);
            }
        });
        //endpoint for the playground to get preview stats
        app.post("/previews", async (req, res) => {
            try {
                const depthPreview = await depthLimit(req.body.queryPreview, req.body.maxDepth);
                const costPreview = await calcCost(req.body.queryPreview, 1.5, req.body.maxCost);
                return res.status(200).json([depthPreview, costPreview]);
            }
            catch (err) {
                console.log(err);
                res.status(500).send(err);
            }
        });
        newServer.listen(2222, () => {
            console.log("Proxying Playground requests on port 2222");
        });
    }
}
export { LatchQL };
// export default {jwtController, LatchQL};
// module.exports = {
//   JwtController, LatchQL
// }
//# sourceMappingURL=latch.js.map
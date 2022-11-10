![Preview](./PLAYGROUND/client/src/assets/finallogo.png)

# LatchQL NPM Package and Playground

# **LatchQL NPM Package**

An open-source, free-to-use, lightweight middleware package that adds additional layers of security to authenticate/authorize and provide permissions for users to have different levels of access to a database through graphQL queries.

## Features

- Enables users to customize depth, cost, and rate limiting for all GraphQL queries sent to the server.
- Authorize and customize limiting for admin, users, and non-user levels.
- Throw errors _before_ execution using depth and cost limiting algorithms.
- Utilize a caching method with Redis for limiting the rate of user requests to your GraphQL endpoint.

# Why do I need GraphQL limiters?

## Cost limiting

**Cost limiting** is essential for securing your GraphQL endpoint. By putting a limit on the cost of a single GraphQL transaction, you can prevent resource overload by blocking excessively expensive requests.

## Depth limiting

**Depth limiting** is vital for protecting the server against malicious query attacks. This limit is commonly used for never ending query loops that expose the endpoint to potential attacks. By using the depth limiter, you can validate the depth of imcoming queries on a user's permission level and prevent execution if it exceeds the limit.

## Rate limiting

**Rate limiting** is a strategy used for limiting network traffic and strain on the server. It's mainly used to prevent bot activity, brute force, DoS, DDoS, and web scraping attacks. By using the rate limiter, users are allocated a maximum of n operations for every fixed size 1-minute time window. Once the client has performed n operations, they must wait.

<br>

## Getting started

In your terminal:

1. Install LatchQL

```console
npm install LatchQL
```

2. Create a configuration file called `latch_config.json` in your project's root directory to assign and store your limiters.  
   Example:

```json
{
  "Admin": {
    "depthLimit": "100",
    "rateLimit": "100",
    "costLimit": "100"
  },
  "Gary": {
    "depthLimit": "10",
    "rateLimit": "25",
    "costLimit": "10"
  },
  "Non-User": {
    "depthLimit": "0",
    "rateLimit": "0",
    "costLimit": "0"
  }
}
```

3. Install redis globally on your machine

   Using Homebrew package manager for Mac OS users:

````console
 brew update
 brew install redis
```On Windows:
```console
 sudo apt-add-repository ppa:redislabs/redis
 sudo apt-get update
 sudo apt-get upgrade
 sudo apt-get install redis-server
````

4. Run redis server

```console
redis-server
```

- If you get an error on step 4, you may be running an instance of redis somewhere. To stop it:

```console
killall redis-server
```

and then repeat step 4.

<br>

# Implementation

## Sample Usage

```js
import cors from "cors";
import express from "express";
import { readFile } from "fs/promises";
import { resolvers } from "./test-db/resolvers.js";
import { LatchQL, jwtController } from "latchql";

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
let latch = new LatchQL(typeDefs, resolvers);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
  console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
});

latch.startLatch(app, port);
```

## In your server file...

Import LatchQL and jwtController from latchql

```js
import { LatchQL, jwtController } from "latchql";
```

Implment jwtController.setJwt middleware in your authentication step. You will need to pass the username and the selected authorization level of a given user to the jwtController.setJwt middleware via res.locals.username and res.locals.authLevel

```js
app.post("/login", authSet, jwtController.setJwt, (req, res) => {
  return res.status(200).send("YES RESPONSE");
});
```

Create a new instance of LatchQL passing in your schema and resolvers

```js
let latch = new LatchQL(typeDefs, resolvers);
```

Lastly, invoke startLatch passing in your express server and port to access endpoints

```js
latch.startLatch(app, port);
```

<br>

# **LatchQL Playground**

The LatchQL Playground is an optional, built-in playground for testing your GraphQL endpoint.

# Features

- Preview cost and depth of your current query before execution.
- Displays important metrics for tracking response time and CPU usage.
- Save variables to reference in the body of your GraphQL queries.

# Getting Started

1. Install LatchQL npm package.
2. Clone the playground.
3. Install its dependencies:

   ```console
   npm install --force
   ```

4. Build the playground:

   ```console
   npm run dev
   ```

# How to use LatchQL Playground

1. Select the right permission level
   ![Permission Level](./PLAYGROUND/client/src/assets/user-permission-example-2xSpeed.gif)

2. Preview Cost/Depth of the current query
   ![Preview](./PLAYGROUND/client/src/assets/cost-preview-example_AdobeExpress.gif)

3. Depth Limiter
   ![Depth Limiter](./PLAYGROUND/client/src/assets/depth-limitor.gif)

4. Cost Limiter
   ![Cost Limiter](./PLAYGROUND/client/src/assets/cost-limitor-example-2xSpeed.gif)

5. Rate Limiter
   ![Rate Limiter](./PLAYGROUND/client/src/assets/rate-limitor-example-2xSpeed.gif)

# Authors

Alex McPhail: [GitHub](https://github.com/mcphail-alex) ｜ [LinkedIn](https://www.linkedin.com/in/mcphail-alex/)  
Celine Leung: [GitHub](https://github.com/ccelineleung) ｜ [LinkedIn](https://www.linkedin.com/in/celineleung412/)  
Hannah Bernstein: [GitHub](https://github.com/hbernie) ｜ [LinkedIn](https://www.linkedin.com/in/bernstein-hannah/)  
Johnjered Tolentino: [GitHub](https://github.com/Johnjeredivant) | [LinkedIn](https://www.linkedin.com/in/johnjered-tolentino/)  
Raymond Kim: [GitHub](https://github.com/reykeem) | [LinkedIn](https://www.linkedin.com/in/raymondhkim/)

# How to Contribute

If you would like to contribute in improving the functionality of LatchQL, please submit your ideas and/or bug fixes to our team by forking the repo and submitting your changes via a pull request.

## Iteration Opportunities

1. Storing history GraphQL queries
2. Editing user's permission level on GUI
3. Calculating cost and depth of query mutations

# To Learn More

Visit the [LatchQL Website](https://www.latchql.io)
Read the [LatchQL Medium article](https://www.linkedin.com/company/latchql/)

# License

Distributed under the MIT License. See [LICENSE](https://github.com/oslabs-beta/LatchQL/blob/main/LICENSE.md) for more information.

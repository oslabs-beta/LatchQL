# LatchQL NPM Package and Playground

# LatchQL NPM Package

An open-source, free-to-use, lightweight middleware package that adds additional layers of security to authenticate/authorize and provide permissions for users to have different levels of access to a database through graphQL queries.

## Features

- Enables users to customize depth, cost, and rate limiting for all GraphQL queries sent to the server.
- Authorize and customize limiting for admin, users, and non-user levels.
- Throw errors _before_ execution using depth and cost limiting algorithms.
- Utilize a caching method with Redis for limiting the rate of user requests to your GraphQL endpoint.

## Getting started

In your terminal:

1. Install LatchQL

```console
npm install LatchQL
```

2. Install its dependencies

```console
npm install
```

3. Create a configuration file called `latch_config.json` to assign and store your limiters.  
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
  },
}
```

4. Run redis server

```console
redis-server
```

- If you get an error on step 3, you may be running an instance of redis somewhere. To stop it:

```console
killall redis-server
```
and then repeat step 4.

<br>

# Why do I need GraphQL limiters?

## Cost limiting

**Cost limiting** is essential for securing your GraphQL endpoint. By putting a limit on the cost of a single GraphQL transaction, you can prevent resource overload by blocking excessively expensive requests.

## Depth limiting

**Depth limiting** is vital for protecting the server against malicious query attacks. This limit is commonly used for never ending query loops that expose the endpoint to potential attacks. By using the depth limiter, you can validate the depth of imcoming queries on a user's permission level and prevent execution if it exceeds the limit.

## Rate limiting

**Rate limiting** is a strategy used for limiting network traffic and strain on the server. It's mainly used to prevent bot activity, brute force, DoS, DDoS, and web scraping attacks. By using the rate limiter, users are allocated a maximum of n operations for every fixed size 1-minute time window. Once the client has performed n operations, they must wait.

<br>

# LatchQL Playground

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
    ![Permission Level](./client/src/assets/user-permission-example-2xSpeed.gif)

2. Preview Cost/Depth of the current query
    ![Preview](./client/src/assets/cost-preview-example_AdobeExpress.gif)

3. Depth Limiter
    ![Depth Limiter](./client/src/assets/depth-limitor.gif)

4. Cost Limiter
   <!-- ![Cost Limiter](/Users/celine/Desktop/LatchQL/PLAYGROUND/client/src/assets/costLimitor.gif) -->

   ![Cost Limiter](./client/src/assets/cost-limitor-example-2xSpeed.gif)

5. Rate Limiter
   ![Rate Limiter](./client/src/assets/rate-limitor-example-2xSpeed.gif)
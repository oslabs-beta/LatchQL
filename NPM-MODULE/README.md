# LatchQL

An open-source, free-to-use, lightweight middleware package that adds additional layers of security to authenticate/authorize and provide permissions for users to have different levels of access to a database through graphQL queries.

## Features

- Enables users to customize depth, cost, and rate limiting for all GraphQL queries sent to the server.
- Authorize and customize limiting for admin, users, and non-user levels.
- Throw errors _before_ execution using depth and cost limiting algorithms.
- Utilize a caching method with Redis for limiting the rate of user requests to your GraphQL endpoint.

## Getting started

In your terminal:

1. Install LatchQL

`npm install LatchQL`

2. Install its dependencies

`npm install`

3. Create a configuration file called `latch_config.json` to assign and store your limiters.  
   Example:

```
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

`redis-server`

- If you get an error on step 3, you may be running an instance of redis somewhere. To stop it:

`killall redis-server`
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

## To Learn More

Visit the [LatchQL Website](https://github.com/reykeem)
Read the [LatchQL Medium article](https://github.com/reykeem)

### License

Distributed under the MIT License. See [LICENSE](https://github.com/oslabs-beta/LatchQL/blob/main/LICENSE.md) for more information.

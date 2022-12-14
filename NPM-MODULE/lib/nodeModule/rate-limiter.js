import redis from "redis";
const redisClient = redis.createClient();
await redisClient.connect();
export async function rateLimiter(user_ip, queryCost, rateLimit) {
    let time = 60; //1 minute
    let rounded = Math.floor(queryCost);
    //totalCost is user_ip's current total
    let totalCost = await redisClient.incrBy(user_ip, rounded);
    //if user_ip is just created, add an expiration of 60 seconds before deleting
    if (Number(totalCost) === rounded)
        redisClient.expire(user_ip, time);
    if (Number(totalCost) >= rateLimit)
        return false;
    else
        return true;
}
//# sourceMappingURL=rate-limiter.js.map
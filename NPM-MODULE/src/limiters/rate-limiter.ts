import redis from "redis";
const redisClient = redis.createClient();
await redisClient.connect();

export async function rateLimiter(user_ip: any, queryCost: number, rateLimit: number){
  let time = 10; //10 seconds
  let rounded = Math.floor(queryCost);

  //totalCost is user_ip's current total
  let totalCost = await redisClient.incrBy(user_ip, rounded);
  //if user_ip is just created, add an expiration of 10 seconds before deleting
  if (Number(totalCost) === rounded) redisClient.expire(user_ip, time);
  if (Number(totalCost) >= rateLimit) return false;
  else return true;
}
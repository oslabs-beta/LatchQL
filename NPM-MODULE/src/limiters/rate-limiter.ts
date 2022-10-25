import redis from "redis";
const redisClient = redis.createClient();
await redisClient.connect();

export async function rateLimiter(user_ip: any, queryCost: number, rateLimit: number){
  let time = 10;
  console.log(queryCost);
  
  let totalCost = await redisClient.incrBy(user_ip, queryCost);
  console.log(totalCost);
  if (Number(totalCost) === queryCost) redisClient.expire(user_ip, time);
  console.log(Number(totalCost), rateLimit);
  if (Number(totalCost) >= rateLimit) return false;
  else return true;
}
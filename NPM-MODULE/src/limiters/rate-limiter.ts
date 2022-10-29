import redis from "redis";
const redisClient = redis.createClient();
await redisClient.connect();

export async function rateLimiter(user_ip: any, queryCost: number, rateLimit: number){
  let time = 10;
  // console.log(queryCost);
  // console.log(typeof queryCost)
  // console.log("rounded: ", Math.floor(Number(queryCost)));
  
  let rounded = Math.floor(queryCost);
  let totalCost = await redisClient.incrBy(user_ip, rounded);
  // console.log(totalCost, " ", typeof totalCost);
  if (Number(totalCost) === rounded) redisClient.expire(user_ip, time);
  // console.log(Number(totalCost), rateLimit);
  if (Number(totalCost) >= rateLimit) return false;
  else return true;
}
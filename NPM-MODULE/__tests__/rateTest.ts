// import { describe, it } from "node:test";
import { describe, it, expect, beforeAll } from '@jest/globals';
//let rateLimiter = await import('../lib/limiters/rate-limiter.js');
import fs from "fs";
import path from 'path';
import redis from 'redis-mock';
//import { rateLimiter } from "../lib/limiters/rate-limiter.js";
// const rateLimiter = await (async () => {
//   const rateLimit = await import('../lib/limiters/rate-limiter.js');
//   return rateLimit
// })();


describe('Testing rate limiter', () => {
  
  // console.log(rateLimiter);
  let ips: {user_ip1:string, user_ip2:string, user_ip3:string, user_ip4:string};
  let client;
  
  beforeAll((done) => {
    const data = fs.readFileSync(path.resolve(__dirname, "./testQueries.json"), "utf8")
    ips = JSON.parse(data);
    
    client = redis.createClient();
    // client.connect();
    done();
  });

  // it('check to see if the ip address is saved with the current cost', () => {
  //   client.incrby(ips.user_ip1, 4);
  //   expect(client.get(ips.user_ip1)).toEqual(4);
  // })

  
  


  
  // xit('returns false if request is not within rate limit', () => {
  //   expect(rateLimiter(ips.user_ip2, 10, 4)).toBe(false);
  // })
  // xit('returns false once rate limit is exceeded', () =>{
  //   setInterval(() => {
  //   expect(rateLimiter(ips.user_ip3, 2, 4)).toBe(true)
  //   expect(rateLimiter(ips.user_ip3, 2, 4)).toBe(true)
  //   expect(rateLimiter(ips.user_ip3, 2, 4)).toBe(false), 100});
  //   setTimeout(clearInterval, 100);
  // })
  // xit('resets database when time limit is up', () => {
  //   setInterval(() => {
  //     expect(rateLimiter(ips.user_ip4, 2, 4)).toBe(true)
  //     expect(rateLimiter(ips.user_ip4, 2, 4)).toBe(true)
  //     expect(rateLimiter(ips.user_ip4, 2, 4)).toBe(false), 1000});
  //     setTimeout(clearInterval, 100);
  //     expect(rateLimiter(ips.user_ip4, 2, 4)).toBe(true);
  // })
})
// import { describe, it } from "node:test";
import { describe, it, expect, beforeAll } from '@jest/globals';
import { rateLimiter } from '../src/limiters/rate-limiter.js';
import fs from "fs";

describe('Testing rate limiter', () => {
  
  let ips: {user_ip1:string, user_ip2:string, user_ip3:string, user_ip4:string};
  beforeAll(() => {
    fs.readFile("./testQueries.json", "utf8", (err, data) => {
        if(err){ 
            console.log(err);
            return;
        }
        ips = JSON.parse(data);
    });
  });

  it('returns true if request is within rate limit', () => {
    expect(rateLimiter(ips.user_ip1, 2, 4)).toBe(true);
  })
  it('returns false if request is not within rate limit', () => {
    expect(rateLimiter(ips.user_ip2, 10, 4)).toBe(false);
  })
  it('returns false once rate limit is exceeded', () =>{
    setInterval(() => {
    expect(rateLimiter(ips.user_ip3, 2, 4)).toBe(true)
    expect(rateLimiter(ips.user_ip3, 2, 4)).toBe(true)
    expect(rateLimiter(ips.user_ip3, 2, 4)).toBe(false), 100});
    setTimeout(clearInterval, 100);
  })
  it('resets database when time limit is up', () => {
    setInterval(() => {
      expect(rateLimiter(ips.user_ip4, 2, 4)).toBe(true)
      expect(rateLimiter(ips.user_ip4, 2, 4)).toBe(true)
      expect(rateLimiter(ips.user_ip4, 2, 4)).toBe(false), 1000});
      setTimeout(clearInterval, 100);
      expect(rateLimiter(ips.user_ip4, 2, 4)).toBe(true);
  })
})
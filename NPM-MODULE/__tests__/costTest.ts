// import { describe, it } from "node:test";
import { describe, it, expect, beforeAll } from '@jest/globals';
import { calcCost } from '../lib/limiters/cost-limiter.js';
import fs from "fs";

describe('Testing cost limiter', () => {
  
  let queries: {queryCost2:string, queryCost10:string};

  beforeAll((done) => {
    fs.readFile("./testQueries.json", "utf8", (err, data) => {
        if(err){ 
            console.log(err);
            return;
        }
        queries = JSON.parse(data);
    });
    done();
  });

  it('returns true if query is within cost limit', () => {
    expect(calcCost(queries.queryCost2, 1.5, 5)).toBe(true)
    expect(calcCost(queries.queryCost10, 1.5, 15)).toBe(true)
  });
  it('returns false if query is not within cost limit', () => {
    expect(calcCost(queries.queryCost2, 1.5, 1)).toBe(false)
    expect(calcCost(queries.queryCost10, 1.5, 5)).toBe(false)
  });
  // it('successfully identifies query cost with fragment within bounds', () => {

  // });
  // it('successfully identifies query cost with fragement not within bounds', () => {

  // });
  // it('successfully identifies query cost with mutation within bounds', () => {

  // });
  // it('successfully identifies query cost with mutation not within bounds', () => {

  // });


})

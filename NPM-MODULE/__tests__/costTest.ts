// import { describe, it } from "node:test";
import { describe, it, expect, beforeAll } from '@jest/globals';
import { calcCost } from '../src/limiters/cost-limiter.js';
import fs from "fs";
import path from 'path';

describe('Testing cost limiter', () => {
  interface Queries {
    [key: string]: string;
  }
  let queries: Queries;
  beforeAll((done) => {
    const data = fs.readFileSync(path.resolve(__dirname, "../../__tests__/testQueries.json"), "utf8")
    
    queries = JSON.parse(data);
    done();
  }) 

  it('returns true if query is within cost limit', () => {
    expect(calcCost(queries.queryCost2, 1.5, 5)).toBe(true)
    expect(calcCost(queries.queryCost10, 1.5, 15)).toBe(true)
  });
  it('returns false if query is not within cost limit', () => {
    expect(calcCost(queries.queryCost2, 1.5, 1)).toBe(false)
    expect(calcCost(queries.queryCost10, 1.5, 5)).toBe(false)
  });
  xit('successfully identifies query cost with fragment within bounds', () => {
    expect(calcCost(queries.))
  });
  xit('successfully identifies query cost with fragement not within bounds', () => {

  });
  xit('successfully identifies query cost with mutation within bounds', () => {

  });
  xit('successfully identifies query cost with mutation not within bounds', () => {

  });


})

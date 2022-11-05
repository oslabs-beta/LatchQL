// import { describe, it } from "node:test";
import { describe, it, expect, beforeAll } from '@jest/globals';
import { calcCost } from '../lib/limiters/cost-limiter.js';
import fs from "fs";
import path from 'path';

describe('Testing cost limiter', () => {
  interface Queries {
    [key: string]: string;
  }
  let queries: Queries;
  beforeAll((done) => {
    const data = fs.readFileSync(path.resolve(__dirname, "./testQueries.json"), "utf8")
    
    queries = JSON.parse(data);
    done();
  }) 

  it('returns true if query is within cost limit', () => {
    expect(calcCost(queries.queryCost6, 1.5, 10).withinLimit).toBe(true)
    expect(calcCost(queries.queryCost15, 1.5, 16).withinLimit).toBe(true)
  });
  it('returns false if query is not within cost limit', () => {
    expect(calcCost(queries.queryCost6, 1.5, 1).withinLimit).toBe(false)
    expect(calcCost(queries.queryCost15, 1.5, 5).withinLimit).toBe(false)
  });
  it('successfully identifies query cost with fragment within bounds', () => {
    expect(calcCost(queries.queryCostFrag27, 1.5, 30).withinLimit).toBe(true)
    expect(calcCost(queries.queryCostFrag6, 1.5, 8).withinLimit).toBe(true)
  });
  it('successfully identifies query cost with fragement not within bounds', () => {
    expect(calcCost(queries.queryCostFrag27, 1.5, 20).withinLimit).toBe(false)
    expect(calcCost(queries.queryCostFrag6, 1.5, 5).withinLimit).toBe(false)
  });
  xit('successfully identifies query cost with mutation within bounds', () => {

  });
  xit('successfully identifies query cost with mutation not within bounds', () => {

  });


})

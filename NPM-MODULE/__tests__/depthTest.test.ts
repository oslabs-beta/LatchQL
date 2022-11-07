import { describe, it, expect, beforeAll } from '@jest/globals';
import { depthLimit } from '../lib/limiters/depth-limiter.js';
import fs from "fs";
import path from 'path';

describe('Testing depth limiter', () => {
  
  interface Queries {
    [key: string]: string;
  }

  //Reading from testQueries file to get fake queries
  let queries: Queries;
  beforeAll((done) => {
    const data = fs.readFileSync(path.resolve(__dirname, "./testQueries.json"), "utf8")
    queries = JSON.parse(data);
    done();
  }) 
  
  it('returns true if query is within depth limit', () => {
    expect(depthLimit(queries.queryDepth1, 5).withinLimit).toBeTruthy();
    expect(depthLimit(queries.queryDepth6, 10).withinLimit).toBe(true);
  });
  it('returns false if query is not within depth limit', () => {
    expect(depthLimit(queries.queryDepth1, 0).withinLimit).toBe(false)
    expect(depthLimit(queries.queryDepth6, 3).withinLimit).toBe(false)
  });
  it('successfully identifies query depth with fragment within bounds', () => {
    expect(depthLimit(queries.queryFragDepth7, 10).withinLimit).toBe(true)
    expect(depthLimit(queries.queryFragDepth5, 10).withinLimit).toBe(true)
  });
  it('successfully identifies query depth with fragement not within bounds', () => {
    expect(depthLimit(queries.queryFragDepth7, 2).withinLimit).toBe(false)
    expect(depthLimit(queries.queryFragDepth5, 1).withinLimit).toBe(false)
  });
  it('successfully identifies query depth with mutation within bounds', () => {
    expect(depthLimit(queries.queryMutation1, 10).withinLimit).toBe(true)
    expect(depthLimit(queries.queryMutation4, 8).withinLimit).toBe(true)
  });
  it('successfully identifies query depth with mutation not within bounds', () => {
    expect(depthLimit(queries.queryMutation1, 0).withinLimit).toBe(false)
    expect(depthLimit(queries.queryMutation4, 3).withinLimit).toBe(false)
  });
})
// import { describe, it } from "node:test";
import { describe, it, expect, beforeAll } from '@jest/globals';
import { depthLimit } from '../src/limiters/depth-limiter.js';
//const depthLimit = require('../lib/limiters/depth-limiter.js');
import fs from "fs";
import path from 'path';


describe('Testing depth limiter', () => {
  
  // let queries: {queryDepth1:string, queryDepth6:string, queryFragDepth5:string, queryFragDepth3:string, queryMutation1:string, queryMutation4:string};
  interface Queries {
    [key: string]: string;
  }

  let queries: any;
  beforeAll((done) => {
    const data = fs.readFileSync(path.resolve(__dirname, "../../__tests__/testQueries.json"), "utf8")
    
    queries = JSON.parse(data);
        //console.log(queries);
    console.log(depthLimit);
    console.log(depthLimit("{ jobs { title description }",5));
    done();
  }) 
  it('returns true if query is within depth limit', () => {
    console.log(queries.queryDepth1);
    const {queryDepth1, queryDepth6 } = queries;
    console.log(queryDepth1, queryDepth6);
    expect(depthLimit(queryDepth1, 5)).toEqual(true)
    expect(depthLimit(queryDepth6, 10)).toEqual(true)
  });
  it('returns false if query is not within depth limit', () => {
    expect(depthLimit(queries.queryDepth1, 0)).toBe(false)
    expect(depthLimit(queries.queryDepth6, 3)).toBe(false)
  });
  it('successfully identifies query depth with fragment within bounds', () => {
    expect(depthLimit(queries.queryFragDepth5, 6)).toBe(true)
    expect(depthLimit(queries.queryFragDepth5, 4)).toBe(true)
  });
  it('successfully identifies query depth with fragement not within bounds', () => {
    expect(depthLimit(queries.queryFragDepth5, 2)).toBe(false)
    expect(depthLimit(queries.queryFragDepth3, 1)).toBe(false)
  });
  it('successfully identifies query depth with mutation within bounds', () => {
    expect(depthLimit(queries.queryMutation1, 10)).toBe(true)
    expect(depthLimit(queries.queryMutation4, 8)).toBe(true)
  });
  it('successfully identifies query depth with mutation not within bounds', () => {
    expect(depthLimit(queries.queryMutation1, 0)).toBe(false)
    expect(depthLimit(queries.queryMutation4, 3)).toBe(false)
  });
})
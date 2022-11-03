// import { describe, it } from "node:test";
import { describe, it, expect, beforeAll } from '@jest/globals';
import { depthLimit } from '../src/limiters/depth-limiter.js';
//const depthLimit = require('../lib/limiters/depth-limiter.js');
import fs from "fs";



describe('Testing depth limiter', () => {
  
  let queries: {queryDepth1:string, queryDepth6:string, queryFragDepth5:string, queryFragDepth3:string, queryMutation1:string, queryMutation4:string};
  beforeAll((done) => {
    fs.readFile("./testQueries.json", "utf8", (err, data) => {
        if(err){ 
            console.log(err);
            return;
        }
        queries = JSON.parse(data);
        console.log(queries);
    });
    done();
  });
  it('returns true if query is within depth limit', () => {
    expect(depthLimit(queries.queryDepth1, 5)).toBe(true)
    expect(depthLimit(queries.queryDepth6, 10)).toBe(true)
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
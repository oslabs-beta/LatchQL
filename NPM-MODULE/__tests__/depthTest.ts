// import { describe, it } from "node:test";
import { expect, describe, it, beforeAll } from '@jest/globals';
import { depthLimit } from '../lib/limiters/depth-limiter.js';

import fs from "fs";



describe('Testing depth limiter', () => {
  
  
  beforeAll((done) => {
    let queries;
    fs.readFile("./testQueries.json", "utf8", (err, data) => {
        if(err){ 
            console.log(err);
            return;
        }
        queries = JSON.parse(data);
    });
    done();
  });

  it('returns true if query is within depth limit', () => {
    expect(depthLimit(queries.queryDepth1, 5)).toBe(true)
    expect(depthLimit(queryDepth6, 10)).toBe(true)
  });
  it('returns false if query is not within depth limit', () => {
    expect(depthLimit(queryDepth1, 0)).toBe(false)
    expect(depthLimit(queryDepth6, 3)).toBe(false)
  });
  it('successfully identifies query depth with fragment within bounds', () => {
    expect(depthLimit(queryFragDepth5, 6)).toBe(true)
    expect(depthLimit(queryFragDepth3, 4)).toBe(true)
  });
  it('successfully identifies query depth with fragement not within bounds', () => {
    expect(depthLimit(queryFragDepth5, 2)).toBe(false)
    expect(depthLimit(queryFragDepth3, 1)).toBe(false)
  });
  it('successfully identifies query depth with mutation within bounds', () => {
    expect(depthLimit(queryMutation1, 10)).toBe(true)
    expect(depthLimit(queryMutation4, 8)).toBe(true)
  });
  it('successfully identifies query depth with mutation not within bounds', () => {
    expect(depthLimit(queryMutation1, 0)).toBe(false)
    expect(depthLimit(queryMutation4, 3)).toBe(false)
  });
})
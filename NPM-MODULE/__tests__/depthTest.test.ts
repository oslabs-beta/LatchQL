// import { describe, it } from "node:test";
import { describe, it, expect, beforeAll, test, jest } from '@jest/globals';
// import * as latchFile from '../src/latch-ql-npm/latch.js'
// import * as depthFile from '../src/limiters/depth-limiter.js';
import { depthLimit } from '../src/limiters/depth-limiter.js';

//const depthLimit = require('../lib/limiters/depth-limiter.js');
import fs from "fs";
import path from 'path';

describe('Testing depth limiter', () => {
  
  interface Queries {
    [key: string]: string;
  }
  let queries: Queries;
  beforeAll((done) => {
    const data = fs.readFileSync(path.resolve(__dirname, "../../__tests__/testQueries.json"), "utf8")
    
    queries = JSON.parse(data);
    done();
  }) 

  
  
  it('returns true if query is within depth limit', () => {
    //  const spy = jest.spyOn(depthFile, "depthLimit");
    //  const isTrue = depthFile.depthLimit("{ jobs { title description } }", 5);
    //  expect(spy).toHaveBeenCalled();
    //  expect(depthMock(queries.queryDepth1, 5)).toBeTruthy();
    // const depthMock = jest.fn();
    // depthMock.mockReturnValueOnce(true).mockReturnValueOnce(false);
    // const result = [[queries.queryDepth1, 5], [queries.queryDepth6, 2]].filter(calls => depthMock(calls));
    // console.log(result);
    // console.log(depthMock.mock.calls[0][0]);
    // console.log(depthMock.mock.calls[1][0]);

    // expect(latchFile.depthLimit(queries.queryDepth1, 5)).toEqual(true);
    // expect(depthMock).toHaveBeenCalledWith(queries.queryDepth1, 5);
    
    expect(depthLimit(queries.queryDepth1, 5)).toBeTruthy();
    expect(depthLimit(queries.queryDepth6, 10)).toBe(true);
  });
  it('returns false if query is not within depth limit', () => {
    expect(depthLimit(queries.queryDepth1, 0)).toBe(false)
    expect(depthLimit(queries.queryDepth6, 3)).toBe(false)
  });
  it('successfully identifies query depth with fragment within bounds', () => {
    expect(depthLimit(queries.queryFragDepth7, 10)).toBe(true)
    expect(depthLimit(queries.queryFragDepth5, 10)).toBe(true)
  });
  it('successfully identifies query depth with fragement not within bounds', () => {
    expect(depthLimit(queries.queryFragDepth7, 2)).toBe(false)
    expect(depthLimit(queries.queryFragDepth5, 1)).toBe(false)
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
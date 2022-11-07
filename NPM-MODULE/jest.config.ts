/** @type {import('ts-jest').JestConfigWithTsJest} */
import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  automock: false,
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["node_modules"],
  // setupFilesAfterEnv: ['./jest.setup.redis-mock.js']
}
export default config;
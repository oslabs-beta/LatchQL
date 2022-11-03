/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
  transform: {
    "^.+\\.(js|ts)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest"
},  
  transformIgnorePatterns: [
    "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)",
    "/node_modules/(?![]).+\\.js$",
    "/node_modules/(?![]).+\\.ts$",
    "/node_modules/(?![]).+\\.tsx$",
  ]
};
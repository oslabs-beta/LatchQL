module.exports = {
	preset: 'jest-puppeteer',
	testMatch: ["**/?(*.)+(spec|test).[j]s"],
	testPathIgnorePatterns: ['/node_modules/', 'build'], // 
	moduleDirectories: ["node_modules", "src", "__tests__"],
	transform: {
		"^.+\\.(ts|js)x?$": "ts-jest"
		// "^.+\\.(js|jsx)$": "babel-jest",
	},
	moduleNameMapper:{
		"\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
		"\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
};
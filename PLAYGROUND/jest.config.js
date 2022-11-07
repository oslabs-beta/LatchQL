module.exports = {
	preset: 'jest-puppeteer',
	testMatch: ["**/?(*.)+(spec|test).[j]s"],
	testPathIgnorePatterns: ['/node_modules/', 'build'], // 
	// moduleDirectories: ["node_modules", "src", "__tests__"],
	transform: {
		"^.+\\.(ts|js)x?$": "ts-jest"
		// "^.+\\.(js|jsx)$": "babel-jest",
	}
};
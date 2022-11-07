module.exports = {
	preset: 'jest-puppeteer',
	testMatch: ["**/?(*.)+(spec|test).[j]s"],
	testPathIgnorePatterns: ['/node_modules/', 'build'], 
	transform: {
		"^.+\\.(ts|js)x?$": "ts-jest"
	}
};
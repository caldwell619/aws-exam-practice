module.exports = {
	moduleFileExtensions: ["js"],
	transform: {
		"^.+\\.js?$": "babel-jest"
	},
	transformIgnorePatterns: ["/node_modules/"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/lambdas/$1"
	},
	testMatch: [
		"**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
	],
	testURL: "http://localhost/"
};

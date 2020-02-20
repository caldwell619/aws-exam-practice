const isRunningLocally = process.env.NODE_ENV !== 'production'

module.exports = {
	env: {
    node: true,
    es6: true
	},
	extends: ['eslint:recommended'],
	rules: {
    'no-console': 'off'
  },
	parserOptions: {
    ecmaVersion: 10
	}
}

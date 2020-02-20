const { generateTokenWithSecretsManager } = require('simple-lambda-actions/dist/auth')

const SecretId = process.env.SECRET_NAME
const nameOfSecret = process.env.SIGNING_KEY_NAME
const expiryDurationOfToken = process.env.TOKEN_DURATION

const secretManagerParams = { SecretId, nameOfSecret }

const generateToken = payload => {
	// returning the promise, must be awaited
	return generateTokenWithSecretsManager(secretManagerParams, payload, expiryDurationOfToken)
}

module.exports = generateToken

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Responder = require('simple-lambda-actions/dist/util/responseHandler')
const { getItem } = require('simple-lambda-actions/dist/dynamo/')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')
const generateToken = require('./lib/secretsManagerSetup')

const tableName = process.env.TABLE_NAME
const corsUrl = process.env.CORS_URL
const partitionKey = process.env.TABLE_PARTITION_KEY

exports.handler = async event => {
	const ResponseHandler = new Responder(corsUrl, event.httpMethod)
	try {
		// username could be email or password
		const { username, password } = bodyParser(event.body)
		const userProfile = await getItem(tableName, { [partitionKey]: username })
		


		const tokenParams = { id: userProfile.id, role: userProfile.role }
		
		await	generateToken(tokenParams)
		
		return ResponseHandler.respond({ userInformation, token }, 200)
	} catch(error){
		console.log('error', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
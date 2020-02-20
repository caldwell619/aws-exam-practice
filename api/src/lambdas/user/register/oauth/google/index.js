const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const { putItem } = require('simple-lambda-actions/dist/dynamo/')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')
const verifyToken = require('./lib/verifyToken')
const generateToken = require('./lib/secretsManagerSetup')

const tableName = process.env.TABLE_NAME

const corsUrl = process.env.CORS_URL
const config = { corsUrl }

exports.handler = async event => {
	const responseConfig = extractResponseParams(event.httpMethod, config)
	const ResponseHandler = new Responder(responseConfig)
	try {
		const { idToken } = bodyParser(event.body)
		const userInformation = await verifyToken(idToken)
		// promise.all the write, and token gen
		const tokenParams = {
			id: userInformation.id,
			role: userInformation.role
		}
		const [ , token] = await Promise.all([
			await putItem(tableName, userInformation, true),
			await generateToken(tokenParams)
		])
		
		return ResponseHandler.respond({ userInformation, token }, 200)
	} catch(error){
		console.log('error', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
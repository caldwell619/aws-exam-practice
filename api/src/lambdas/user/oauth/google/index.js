const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const { putItem } = require('simple-lambda-actions/dist/dynamo/')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')
const verifyToken = require('./lib/verifyToken')

const tableName = process.env.TABLE_NAME

const corsUrl = process.env.CORS_URL
const config = { corsUrl }

exports.handler = async event => {
	const responseConfig = extractResponseParams(event.httpMethod, config)
	const ResponseHandler = new Responder(responseConfig)
	try {
		const reqBody = bodyParser(event.body)
		const { idToken } = reqBody
		const payload = await verifyToken(idToken)
		await putItem(tableName, payload, true)
		return ResponseHandler.respond(payload, 200)
	} catch(error){
		console.log('error', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
const Responder = require('simple-lambda-actions/dist/util/responseHandler')
const { putItem } = require('simple-lambda-actions/dist/dynamo/')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')
const verifyToken = require('./lib/verifyToken')
const generateToken = require('./lib/secretsManagerSetup')

const tableName = process.env.TABLE_NAME
const corsUrl = process.env.CORS_URL

exports.handler = async event => {
	const ResponseHandler = new Responder(corsUrl, event.httpMethod)
	try {
		const { idToken } = bodyParser(event.body)
		const userInformation = await verifyToken(idToken)
		const tokenParams = {
			id: userInformation.id,
			role: userInformation.role
		}
		const [ token ] = await Promise.all([
			generateToken(tokenParams),
			putItem(tableName, userInformation, true)
		])
		
		return ResponseHandler.respond({ userInformation, token }, 200)
	} catch(error){
		console.log('error', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
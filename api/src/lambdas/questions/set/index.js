const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const queryTable = require('./lib/query')
const randomizeAndChop = require('./lib/shuffle')

const corsUrl = process.env.CORS_URL
const config = { corsUrl }
		
exports.handler = async event => {
	const responseConfig = extractResponseParams(event.httpMethod, config)
	const ResponseHandler = new Responder(responseConfig)
	try {		
		const { domain, scope, numberOfQuestions  } = event.queryStringParameters
		const { Items } = await queryTable(domain, scope)
		const randomizedQuestions = randomizeAndChop(Items, numberOfQuestions)
		const responseBody = { questions: randomizedQuestions, numberOfQuestions: randomizedQuestions.length }
		return ResponseHandler.respond(responseBody, 200)
	} catch(error){
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}

}
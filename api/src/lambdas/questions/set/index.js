const Responder = require('simple-lambda-actions/dist/util/responseHandler')
const queryTable = require('./lib/query')
const randomizeAndChop = require('./lib/shuffle')

const corsUrl = process.env.CORS_URL
		
exports.handler = async event => {
	const ResponseHandler = new Responder(corsUrl, event.httpMethod)
	try {
		const { domain, scope, numberOfQuestions  } = event.queryStringParameters
		const { Items } = await queryTable(scope, domain)
		const randomizedQuestions = randomizeAndChop(Items, numberOfQuestions)
		const responseBody = { questions: randomizedQuestions, numberOfQuestions: randomizedQuestions.length }
		return ResponseHandler.respond(responseBody, 200)
	} catch(error){
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
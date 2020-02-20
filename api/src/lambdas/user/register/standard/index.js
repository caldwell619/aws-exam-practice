const DynamoDB = require('aws-sdk/clients/dynamodb')
const bcyrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
let options = {
	region: 'us-east-1'
}
if (process.env.AWS_SAM_LOCAL) {
	options.endpoint = 'http://host.docker.internal:8000'
}
const docClient = new DynamoDB.DocumentClient(options)
const headers = {
	'Access-Control-Allow-Headers': '*',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': '*',
	'Content-Type': 'application/json'
}
const TableName = process.env.TABLE_NAME
const signingKey = process.env.SIGNING_KEY

exports.handler = async event => {
	const { Identifier, Password, FirstName, LastName } = JSON.parse(event.body)
	// add validation
	const hashedPassword = await bcyrpt.hash(Password, 10)
	const params = {
		TableName,
		Item: {
			Identifier,
			Description: 'user_profile',
			Password: hashedPassword,
			FirstName,
			LastName
		}
	}

	try {
		await docClient.put(params).promise()
		const token = await jwt.sign(
			{
				Identifier
			},
			signingKey,
			{ expiresIn: '24h' }
		)
		return {
			headers,
			body: JSON.stringify({
				Identifier,
				FirstName,
				LastName,
				token,
				role: 'user'
			}),
			statusCode: 200
		}
	} catch (error) {
		console.log('error: ', error)
		return {
			headers,
			body: 'error',
			statusCode: 400
		}
	}
}

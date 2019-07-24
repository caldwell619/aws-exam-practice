const DynamoDB = require("aws-sdk/clients/dynamodb");
const bcrypt = require("bcrypt");
let options = {
	region: "us-east-1"
};
if (process.env.AWS_SAM_LOCAL) {
	options.endpoint = "http://host.docker.internal:8000";
}
const docClient = new DynamoDB.DocumentClient(options);

const headers = {
	"Access-Control-Allow-Headers": "*",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "*",
	"Content-Type": "application/json"
};

exports.handler = async event => {
	const { Username, PlainTextPassword, BusinessId } = JSON.parse(event.body);
	const params = {
		TableName: "Dev-Furry-Friends",
		KeyConditionExpression: "User = :usr and BusinessDescription = :bsd",
		ExpressionAttributeValues: {
			":usr": Username,
			":bsd": `${BusinessId}_employee`
		}
	};
	try {
		const dynamoReturnedUser = await docClient.query(params).promise();
		const validation = await bcrypt.compare(
			PlainTextPassword,
			dynamoReturnedUser.Password
		);
		console.log("Validation: ", validation);
		return {
			headers,
			statusCode: 200,
			body: "Yay!"
		};
	} catch (error) {
		console.log("error: ", error);
		return {
			headers,
			statusCode: 402,
			body: "nooooo"
		};
	}
};

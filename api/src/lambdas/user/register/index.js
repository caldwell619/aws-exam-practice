const DynamoDB = require("aws-sdk/clients/dynamodb");
const jwt = require("jsonwebtoken");
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
	console.log("body is: ", event.body);
	return {
		headers,
		statusCode: 200,
		body: "done"
	};
	// const params = {
	// 	TableName: "Users",
	// 	Key: {
	// 		Username,
	// 		BusinessId
	// 	}
	// };

	// try {
	// 	const user = await docClient.put(params).promise();
	// 	return {
	// 		headers,
	// 		body: JSON.stringify(user),
	// 		statusCode: 200
	// 	};
	// } catch (error) {
	// 	return {
	// 		headers,
	// 		body: "error",
	// 		statusCode: 400
	// 	};
	// }
};

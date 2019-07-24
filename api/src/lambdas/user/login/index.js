const DynamoDB = require("aws-sdk/clients/dynamodb");
const secretsmanagerSDK = require("aws-sdk/clients/secretsmanager");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let options = {
	region: "us-east-1"
};
if (process.env.AWS_SAM_LOCAL) {
	options.endpoint = "http://host.docker.internal:8000";
}
const docClient = new DynamoDB.DocumentClient(options);
const secretsManager = new secretsmanagerSDK();
const headers = {
	"Access-Control-Allow-Headers": "*",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "*",
	"Content-Type": "application/json"
};
const TableName = process.env.TABLE_NAME;
const SigningKeyID = process.env.SIGNING_KEY_NAME;
const errorResponse = {
	headers,
	statusCode: 402,
	body: "That combination does not match our records"
};
const secretsParams = {
	SecretId: SigningKeyID
};

exports.handler = async event => {
	const { Identifier, PlainTextPassword } = JSON.parse(event.body);
	const params = defineParams(Identifier);
	try {
		const dynamoReturnedUser = await docClient.query(params).promise();
		const isValidLogin = await determineValidLogin(
			PlainTextPassword,
			dynamoReturnedUser.Items[0].Password
		);
		if (isValidLogin) {
			delete dynamoReturnedUser.Items[0].Password;
			const token = await generateToken(secretsParams, Identifier);
			return formatPositiveResponse(dynamoReturnedUser, token);
		} else {
			return errorResponse;
		}
	} catch (error) {
		console.log("inside of the error: ", error);
		return errorResponse;
	}
};

const getSigningKey = async secretsParams => {
	const secretsManagerResponse = await secretsManager
		.getSecretValue(secretsParams)
		.promise();
	return JSON.parse(secretsManagerResponse.SecretString).signingKey;
};

const defineParams = Identifier => ({
	TableName,
	KeyConditionExpression: "Identifier = :usr and Description = :bsd",
	ExpressionAttributeValues: {
		":usr": Identifier,
		":bsd": "user_profile"
	}
});

const determineValidLogin = async (PlainTextPassword, dbUserPassword) => {
	const validation = await bcrypt.compare(PlainTextPassword, dbUserPassword);
	return validation;
};

const generateToken = async (secretsParams, Identifier) => {
	const signingKey = await getSigningKey(secretsParams);
	return await jwt.sign({ Identifier }, signingKey, {
		expiresIn: "24h"
	});
};

const formatPositiveResponse = (dynamoReturnedUser, token) => ({
	headers,
	statusCode: 200,
	body: JSON.stringify({
		...dynamoReturnedUser.Items[0],
		token,
		role: "user"
	})
});

exports.getSigningKey = getSigningKey;
exports.defineParams = defineParams;
exports.determineValidLogin = determineValidLogin;
exports.generateToken = generateToken;
exports.formatPositiveResponse = formatPositiveResponse;

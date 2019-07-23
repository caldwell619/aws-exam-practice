exports.handler = async () => ({
	statusCode: 200,
	headers: {
		"Access-Control-Allow-Headers":
			"Content-Type,X-Amz-Date,Authorization,X-Api-Key",
		"Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
		"Access-Control-Allow-Origin": "*"
	},
	body: ""
});

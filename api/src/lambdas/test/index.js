const headers = {
	"Access-Control-Allow-Headers": "*",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "*",
	"Content-Type": "application/json"
};

exports.handler = async () => {
	console.log("hey");
	return {
		headers,
		statusCode: 200,
		body: "done"
	};
};

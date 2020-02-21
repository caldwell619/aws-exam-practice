export default [
	{
		"title": "A company is migrating a legacy application to Amazon EC2. The application uses a user name and \
		password stored in the source code to connect to a MySQL database. The database will be migrated to an \
		Amazon RDS for MySQL DB instance. As part of the migration, the company wants to implement a secure \
		way to store and automatically rotate the database credentials. \n Which approach meets these requirements?",
		"category": {
			text: "EC2",
			value: "ec2"
		},
		"incorrectAnswers": [
			"Store the database credentials in environment variables in an Amazon Machine Image (AMI). Rotate the \
			credentials by replacing the AMI.",
			"Store the database credentials in AWS Systems Manager Parameter Store. Configure Parameter Store to \
			automatically rotate the credentials",
			"Store the database credentials in environment variables on the EC2 instances. Rotate the credentials by \
			relaunching the EC2 instances"
		],
		"correctAnswer": "Store the database credentials in AWS Secrets Manager. Configure Secrets Manager to automatically \
		rotate the credentials.",
		scope: {
			text: 'Developer Associate',
			value: 'devAssociate'
		},
	},
	{
		"title": "What is an example of a good choice for a partition key?",
		"category": {
			text: "DynamoDB",
			value: "dynamoDB"
		},
		"incorrectAnswers": [
			"Auto incrementing ID",
			"A randomly generate ID that ensures uniqueness",
			"Gender"
		],
		"correctAnswer": "Email Address",
		scope: {
			text: 'Cloud Practitioner',
			value: 'cloudPractitioner'
		},
	},
	{
		"title": "What is the maximum number of concurrent requests for Lambda?",
		"category": {
			text: "Lambda",
			value: "lambda"
		},
		"incorrectAnswers": [
			"500",
			"No Limit",
			"2000"
		],
		"correctAnswer": "1000",
		scope: {
			text: 'Cloud Practitioner',
			value: 'cloudPractitioner'
		},
	}
]
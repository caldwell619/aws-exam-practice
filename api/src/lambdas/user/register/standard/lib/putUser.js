const { putItem } = require('simple-lambda-actions/dist/dynamo/')

const TableName = process.env.TABLE_NAME
const partitionKey = process.env.TABLE_PARTITION_KEY
const rangeKey = process.env.TABLE_RANGE_KEY

const role = 'full-user'

const constructWriteParams = (emailAddress, hashedPassword, userInformation) => {
	const params = {
		[partitionKey]: emailAddress,
		[rangeKey]: 'user',
		password: hashedPassword,
		role,
		pictureUrl: null,
		...userInformation
	}
	return params
}

const writeUser = async (emailAddress, hashedPassword, userInformation) => {
	const writeParams = constructWriteParams(emailAddress, hashedPassword, userInformation)
	await putItem(TableName, writeParams)
	return writeParams
}

module.exports = writeUser
const { queryItem } = require('simple-lambda-actions/dist/dynamo')
const TableName = process.env.TABLE_NAME
const partitionKeyName = process.env.TABLE_PARTITION_KEY
const rangeKeyName = process.env.TABLE_RANGE_KEY

const queryTable = (scope, category) => {
	const partitionKeySearchTerm = '#QUESTION'
	const rangeKeySearchTerm = `${scope}_${category}`
	const params = {
		TableName,
		partitionKeyName,
		rangeKeyName,
		partitionKeySearchTerm,
		rangeKeySearchTerm,
		rangeKeyComparisonOperator: 'begins_with'
	}
	return queryItem(params, true)
}

module.exports = queryTable
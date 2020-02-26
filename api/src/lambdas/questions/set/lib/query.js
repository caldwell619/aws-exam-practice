const { queryItem } = require('simple-lambda-actions/dist/dynamo')
const TableName = process.env.TABLE_NAME
const partitionKeyName = process.env.TABLE_PARTITION_KEY
const rangeKeyName = process.env.TABLE_RANGE_KEY

const queryTable = (domain, scope) => {
	const partitionKeySearchTerm = '#QUESTION'
	let rangeKeySearchTerm = domain
	if(scope !== 'any'){
		rangeKeySearchTerm = rangeKeySearchTerm + `_${scope}`
	}
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
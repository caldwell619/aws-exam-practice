const fs = require('fs')
const uuid = require('uuid/v4')
const baseQuestions = require('./sampleQuestions')
const tableName = process.env.TABLE_NAME
const { DynamoDB } = require('aws-sdk')

const aggregateQuestionsIntoBatchWriteParams = baseQuestions => {
  return baseQuestions.map(question => {
		const domain = question.domain.value
		const scope = question.scope.value
		const resourceDescription = `${domain}_${scope}_${uuid()}`
    return {
      'PutRequest': {
				'Item': DynamoDB.Converter.marshall({
					'id': '#QUESTION',
					resourceDescription,
					...question
				})
			}
    }
  })
}

const formattedQuestions = aggregateQuestionsIntoBatchWriteParams(baseQuestions)

const output = JSON.stringify({
	[tableName]: formattedQuestions
})

fs.writeFileSync(__dirname + '/testQuestions.json', output)

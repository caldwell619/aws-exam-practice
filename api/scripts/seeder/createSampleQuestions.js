const fs = require('fs')
const baseQuestions = require('./sampleQuestions')
const tableName = process.env.TABLE_NAME
const { DynamoDB } = require('aws-sdk')

const aggregateQuestionsIntoBatchWriteParams = baseQuestions => {
  return baseQuestions.map(question => {
    return {
      'PutRequest': {
				'Item': DynamoDB.Converter.marshall({
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

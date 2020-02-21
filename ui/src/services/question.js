import client from '@/client'

export default {
	async createQuestion(questionToSave){
		const { data } = await client.post('/question/create', questionToSave)
		return data
	},
	async fetchQuestions(params){
		const { data } = await client.get('/question/set', {
			params
		})
		return data
	}
}

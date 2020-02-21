import service from '@/services/question'

export default {
	namespaced: true,
	state: {
		questionsForQuiz: {}
	},
	getters: {},
	actions: {
		async createQuestion(context, questionToSave){
			await service.createQuestion(questionToSave)
		},
		async fetchQuestions({ commit }, questionToSave){
			const { questions } = await service.fetchQuestions(questionToSave)
			commit('UPDATE_QUESTIONS_FOR_QUIZ', questions)
		},
	},
	mutations: {
		UPDATE_QUESTIONS_FOR_QUIZ(state, questionsForQuiz){
			state.questionsForQuiz = questionsForQuiz
		}
	}
}
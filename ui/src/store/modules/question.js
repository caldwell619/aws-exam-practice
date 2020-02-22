import service from '@/services/question'

export default {
	namespaced: true,
	state: {
		questionsForQuiz: {},
		numberOfQuestions: 0
	},
	getters: {},
	actions: {
		async createQuestion(context, questionToSave){
			await service.createQuestion(questionToSave)
		},
		async fetchQuestions({ commit }, questionParams){
			const { questions, numberOfQuestions } = await service.fetchQuestions(questionParams)
			commit('UPDATE_QUESTIONS_FOR_QUIZ', questions)
			commit('UPDATE_NUMBER_OF_QUESTIONS', numberOfQuestions)
		},
	},
	mutations: {
		UPDATE_QUESTIONS_FOR_QUIZ(state, questionsForQuiz){
			state.questionsForQuiz = questionsForQuiz
		},
		UPDATE_NUMBER_OF_QUESTIONS(state, numberOfQuestions){
			state.numberOfQuestions = numberOfQuestions
		}
	}
}
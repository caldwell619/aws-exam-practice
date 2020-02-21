// import service from '@/services/user'

export default {
	namespaced: true,
	state: {
		settings: {}
	},
	getters: {},
	actions: {
		updateSettings({ commit }, quizSettings){
			commit('UPDATE_QUIZ_SETTINGS', quizSettings)
		},
	},
	mutations: {
		UPDATE_QUIZ_SETTINGS(state, quizSettings){
			state.settings = quizSettings
		}
	}
}
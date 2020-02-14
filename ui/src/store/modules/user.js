import client from '@/services/'

export default {
	state: {
		role: '',
		firstName: '',
		lastName: '',
		emailAddress: '',
	},
	getters: {
		allowedRoutes(state){
			return state.allowedRoutes
		}
	},
	actions: {
		async registerUser({ commit }, userInformation){
			commit('REGISTER_USER', userInformation)
		},
		async googleOauth({ commit }, codeToSend){

		}
	},
	mutations: {
		REGISTER_USER(state, userInformation){

		}
	}
}
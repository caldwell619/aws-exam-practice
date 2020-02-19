import service from '@/services/user'

export default {
	namespaced: true,
	state: {
		role: '',
		givenName: '',
		familyName: '',
		pictureUrl: '',
		locale: '',
		email: '', 
		id: '',
	},
	getters: {
		allowedRoutes(state){
			return state.allowedRoutes
		},
		usersName(state){
			if(state.givenName && state.familyName){
				return state.givenName + ' ' + state.familyName
			} else {
				return ''
			}
		}
	},
	actions: {
		async registerUser({ commit }, userInformation){
			commit('REGISTER_USER', userInformation)
		},
		async googleOauth({ commit }, codeToSend){
			const userPayload = await service.sendGoogleCodeToApi(codeToSend)
			commit('UPDATE_GOOGLE_USER', userPayload)
		}
	},
	mutations: {
		UPDATE_GOOGLE_USER(state, userInformation){
			Object.keys(userInformation).forEach(key => {
				state[key] = userInformation[key]
			})
		}
	}
}
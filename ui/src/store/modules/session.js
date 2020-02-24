import { timeSessionIsValid } from '@/store/constants'
import { authenticatedRoutes, visitorRoutes, regularAdminRoutes } from '@/router/routes'
import { getItemFromLocalStorage, writeToLocalStorage } from '@/utils/localStorage'
import router from '@/router'

export default {
	namespaced: true,
  state: {
    token: null,
    expiredDate: null,
		isAuthenticated: false,
		isReadyToShow: false
  },
  getters: {
    authToken(state) {
      return state.token
		},
		isAuthenticated(state){
			return state.isAuthenticated
		},
		isReadyToShow(state){
			return state.isReadyToShow
		},
    allowableRoutes(state, getters, rootState) {
      const isSessionValid = state.expiredDate > Date.now()
			if (state.isAuthenticated && isSessionValid && rootState.user.role === 'admin') return regularAdminRoutes
			if (state.isAuthenticated && isSessionValid && rootState.user.role === 'full-user') return authenticatedRoutes
			return visitorRoutes
    },
  },
  actions: {
    beginNewSession({ commit }, token) {
      commit('UPDATE_SESSION', token)
    },
    restoreSessionFromLocalStorage({ commit, dispatch }) {
			const previousSession = getItemFromLocalStorage('session')
			if (previousSession && previousSession.expiredDate > Date.now()) {
				// fetch new token - update with new
				commit('UPDATE_SESSION', previousSession.token)
				dispatch('user/restoreUserToStore', null, { root: true })
				router.push('/user/home')
			}
			commit('MAKE_APP_READY')
		},
    endSession({ commit }) {
      commit('END_SESSION')
    }
	},
  mutations: {
    UPDATE_SESSION(state, token) {
      writeToLocalStorage('session', { token, expiredDate: Date.now() + timeSessionIsValid, isAuthenticated: true })
      state.token = token
      state.expiredDate = Date.now() + timeSessionIsValid
      state.isAuthenticated = true
    },
    END_SESSION(state) {
      writeToLocalStorage('session', { token: '', expiredDate: 0, isAuthenticated: false })
      state.token = ''
      state.isAuthenticated = false
      state.expiredDate = 0
		},
		MAKE_APP_READY(state){
			state.isReadyToShow = true
		}
  }
}
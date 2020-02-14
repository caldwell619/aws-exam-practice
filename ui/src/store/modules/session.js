import { timeSessionIsValid } from '@/store/constants'
import { authenticatedRoutes, visitorRoutes, regularAdminRoutes } from '@/router/routes'

export default {
  state: {
    token: null,
    expiredDate: null,
    isAuthenticated: false
  },
  getters: {
    authToken(state) {
      return state.token
    },
    allowableRoutes(state) {
      const isSessionValid = state.expiredDate > Date.now()
      if(state.user){
        if (state.user.isAuthenticated && isSessionValid && state.user.role === 'admin') return authenticatedRoutes
        if (state.user.isAuthenticated && isSessionValid && state.user.role === 'user') return regularAdminRoutes
        else return visitorRoutes
      } else {
        return visitorRoutes
      }
    },
  },
  actions: {
    beginNewSession({ commit }, token) {
      commit('UPDATE_SESSION', token)
    },
    restoreSessionFromLocalStorage({ commit }) {
      const previousSession = JSON.parse(localStorage.getItem('session'))
      if (previousSession && previousSession > Date.now()) {
        commit('UPDATE_SESSION', previousSession.token)
      }
    },
    endSession({ commit }) {
      commit('END_SESSION')
    }
  },
  mutations: {
    UPDATE_SESSION(state, token) {
      localStorage.setItem('session', JSON.stringify({
        token,
        expiredDate: Date.now() + timeSessionIsValid,
        isAuthenticated: true
      }))
      state.token = token
      state.expiredDate = Date.now() + timeSessionIsValid
      state.isAuthenticated = true
    },
    END_SESSION(state) {
      localStorage.setItem('session', JSON.stringify({ token: '', expiredDate: 0, isAuthenticated: false }))
      state.token = ''
      state.isAuthenticated = false
      state.expiredDate = 0
    }
  }
}
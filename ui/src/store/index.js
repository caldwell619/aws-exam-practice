import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import session from './modules/session'
import question from './modules/question'
import quiz from './modules/quiz'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
		user,
		session,
		question,
		quiz
  }
})

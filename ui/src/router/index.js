import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const isRunningLocally = process.env.NODE_ENV !== 'production'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/visitor/Login.vue'),
  },
  {
    path: '/user',
    name: 'UserRoot',
    component: () => import('@/views/authenticated/Root.vue'),
    beforeEnter(to, from, next) {
			const isAuthenticated = store.getters['session/isAuthenticated']
			if(isAuthenticated || isRunningLocally){
				next()
			} else {
				next('/login')
			}
    },
    children: [
			{
				path: 'home',
				name: 'UserHome',
				component: () => import('@/views/authenticated/Home.vue'),
			},
    ]
  },
]

export default new VueRouter({
  mode: 'history',
  routes
})

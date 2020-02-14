import Vue from 'vue'
import VueRouter from 'vue-router'
const App = () => import('@/App.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    component: App,
  },
  // {
  //   path: '/user',
  //   name: 'User',
  //   component: User,
  //   beforeRouteEnter(to, from, next) {
  //     console.log('to', to)
  //     next()
  //   },
  //   children: [
      
  //   ]
  // },
]

export default new VueRouter({
  mode: 'history',
  routes
})

import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
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

import Vue from 'vue'
import Router from 'vue-router'
import Default from './views/Default.vue'
import Enhanced from './views/Enhanced.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'default',
      component: Default
    },
    {
      path: '/user',
      name: 'enhanced',
      component: Enhanced
    }
  ]
})

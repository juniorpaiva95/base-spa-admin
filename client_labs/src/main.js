import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store'
import Multiselect from 'vue-multiselect'
// import VueSocketio from 'vue-socket.io'
import App from './App'

import LoginPage from './pages/LoginPage'

import Logger from './plugins/Logger'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Logger, {loggin: true})
// Vue.use(VueSocketio, 'http://localhost:8890')

Vue.component('multiselect', Multiselect)
Vue.component('app', App)

const routes = [
  {path: '/', component: LoginPage, name: 'home'},

  {path: '/admin', component: require('./pages/admin/dashboard'), name: 'dashboard', meta: { requiresAuth: true }}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.name === 'home' && JSON.parse(window.localStorage.getItem('authUser'))) {
  //   return false
  // }
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser && authUser.access_token) {
      next()
    } else {
      next({name: 'home'})
    }
  }
  next()
})

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status === 401) {
      console.log('Need to login again')
    }
  })
})

new Vue({
  router, store
}).$mount('#app')

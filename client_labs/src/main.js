require('./bootstrap.js')
require('bootstrap-sass')
// require('./teste.js')
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Meta from 'vue-meta'
import store from './store'
import Multiselect from 'vue-multiselect'
// import VueSocketio from 'vue-socket.io'
import App from './App'

import LoginPage from './pages/LoginPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

import Logger from './plugins/Logger'

import Clients from './components/Passport/Clients'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Logger, {loggin: true})
Vue.use(Meta)
// Vue.use(VueSocketio, 'http://localhost:8890')

Vue.component('multiselect', Multiselect)
Vue.component('app', App)
Vue.component('clients', Clients)
Vue.component('sidebar-nav', require('./components/Sidebar-nav'))
Vue.component('vs-footer', require('./components/Footer'))
const routes = [
  {path: '/', component: LoginPage, name: 'home'},
  {path: '/admin/boletos', component: require('./pages/admin/boletos'), name: 'admin.boletos', meta: { requiresAuth: true }},
  {path: '/admin', component: require('./pages/admin/dashboard'), name: 'dashboard', meta: { requiresAuth: true }},
  {path: '/forgot-password', component: ForgotPassword, name: 'forgot-password'},
  {path: '/reset-password/:token', component: ResetPassword, name: 'reset-password'},
  {path: '*', component: require('./pages/errors/notfound')}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'home' && JSON.parse(window.localStorage.getItem('authUser')) !== null) {
    router.push('admin')
    return false
  }
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

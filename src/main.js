// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.prototype.$http = axios.create({
  baseURL: 'https://openexchangerates.org/api/',
  params: {
    app_id: 'ce976864465c4ee09f50f3e347c57f44'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/service-worker.js')
           .then((reg) => {
             console.log('Service Worker Registered, Scoped is: ' + reg.scope)
           })
}

import Vue from 'vue'
import App from './App.vue'

window.timeago = require('timeago.js')

new Vue({
  el: '#app',
  render: h => h(App)
})

import Vue from 'vue'
import App from './App'
import store from './store/vuex.js'

Vue.config.productionTip = false

App.mpType = 'app'
// app里使用vuex
Vue.prototype.$store = store

const app = new Vue({
	store,
    ...App
})
app.$mount()

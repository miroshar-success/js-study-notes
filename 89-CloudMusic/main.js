import Vue from 'vue'
import App from './App'
import store from "./store/store.js"
Vue.config.productionTip = false

App.mpType = 'app'
// 在app使用vuex需要配置此段代码
Vue.prototype.$store = store
const app = new Vue({
    ...App,
	store
})
app.$mount()

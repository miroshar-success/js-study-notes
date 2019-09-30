import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from "./router/index"
import store from "./store/index"
Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: function (h) { return h(App) }
}).$mount('#app')

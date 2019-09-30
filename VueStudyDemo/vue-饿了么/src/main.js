import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from "axios"
import './registerServiceWorker'
import "@/assets/css/reset.css"
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import Axios from 'axios'
import '@/common/scss/index.scss'
Vue.config.productionTip = false
Vue.prototype.$axios = Axios;
new Vue({
  render: h => h(App)
}).$mount('#app')

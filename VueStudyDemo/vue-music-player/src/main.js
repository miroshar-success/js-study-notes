import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/index.js'
import store from './store/index.js'
Vue.config.productionTip = false
import fastclick from 'fastclick'
import '@/common/scss/reset.scss';
// click delay 300ms
fastclick.attach(document.body);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import Axios from "axios"
import PullRefresh from "@/common/PullRefresh"
import Loading from "@/common/Loading"
import store from "@/store"
Vue.prototype.$axios = Axios
Vue.config.productionTip = false
Vue.filter("setSize",(url,arg)=>{
	return url.replace(/w\.h/,arg);
});
Vue.component("PullRefresh",PullRefresh);
Vue.component("Loading",Loading);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./registerServiceWorker";
import "./assets/reset.scss"
import Axios from "axios"
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
import Loading from "@/components/Loading"
import ScrollList from "@/components/ScrollList"
Vue.component("Scroll",ScrollList)
Vue.component("Loading",Loading)
Vue.filter("setSize",function(value,arg){
	return value.replace(/w\.h/,arg);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

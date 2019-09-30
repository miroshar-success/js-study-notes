import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
		city:window.localStorage.getItem("city") || "北京",	// 当前城市
		id:window.localStorage.getItem("id") || 1	// 当前城市的id
	},
  mutations: {
		changeCity(state,playload){
			state.city = playload.city;
			state.id = playload.id
		}
	},
  actions: {}
});

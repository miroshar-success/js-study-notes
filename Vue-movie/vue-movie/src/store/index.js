import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		nm:window.localStorage.getItem("current_city") || "北京",
		cityId:window.localStorage.getItem("city_id") || 1
	},
	mutations:{
		CURRENT_CITY(state,playload){
			state.nm = playload.nm;
			state.cityId = playload.id
		}
	},
	actions:{
		
	}
})
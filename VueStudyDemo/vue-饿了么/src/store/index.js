import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		showDetail:false,
		selectedFood:[],	// 购物车选择的商品 每个商品是一个对象,给每个对象增加一个属性,表示对应商品选择的数量
	},
	getters:{
		
	},
	mutations:{
		handleOpenDetail(state){
			state.showDetail = true;
		},
		handleCloseDetail(state){
			state.showDetail = false;
		},
		//  添加商品
		handleAddtoCart(state,playload){
			state.selectedFood.push(playload);
		},
		// 减少商品
		handleDecreaseFood(state,playload){
			playload.count--;
			state.selectedFood.forEach((item,index,array)=>{
				if(item.count === 0){
					array.splice(index,1);
				}
			})
		},
		// 清除购物车
		handleClearCart(state){
			state.selectedFood.forEach((item,index,array)=>{
				item.count = 0;
			})
			state.selectedFood.splice(0,state.selectedFood.length);
		}
	},
	actions:{
		
	}
})
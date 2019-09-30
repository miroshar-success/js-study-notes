import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex);
import product_data from "../../product.js"
import {getFilterArray,cartTools} from "../utils/index.js"

export default new Vuex.Store({
	state:{
		productList:[],	// 商品列表
		// 如果本地有数据 则获取本地已经存储锅的数据,否则为空数组
		cartList: cartTools.getAll()
	},
	// 筛选颜色和品牌可能在其他组件中复用,所以放在vuex中
	getters:{
		brands:state => {
			let brands = state.productList.map(item => item.brand);
			return getFilterArray(brands);
		},
		getProductCount:state => {
			let count = 0;
			state.cartList.forEach((item)=>{
				count += item.count;
			})
			return count;
		}
	},
	mutations:{
		/*
		遵循数据解耦,购物车数据为数据列表,每项商品为对象格式,{id:number}格式分别表示商品的id和数量
		1. 先判断是否存在当前的数据,如果有则数量加1,否则则添加数据
		*/ 
		addCart(state,id){
			cartTools.updateGood(id);
		},
		// 添加商品列表数据
		setProductList(state,list){
			state.productList = list;
		},
		// 编辑购物车商品数据
		editCart(state,playload){
			// const product = state.cartList.find((item)=>item.id == playload.id);
			// product.count += playload.count;
			cartTools.updateGood(playload.id,playload.count);
		},
		deleteCart(state,index){
			cartTools.deleteGood(index);
		},
		// 下单购买
		emptyCart(state){
			state.cartList = [];
		}
	},
	actions:{
		// 获取商品列表数据
		getProductList(context){
			setTimeout(()=>{
				context.commit("setProductList",product_data);
			},300);
		},
		buy({commit},callback){
			setTimeout(()=>{
				commit("emptyCart");
				callback();
			},800);
		}
	}
})
import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter);

export default new VueRouter({
	mode:"history",
	linkActiveClass:"active",
	routes:[
		{
			path:"/goods",
			name:"goods",
			component: () => import("@/views/Goods")
		},
		{
			path:"/ratings",
			name:"ratings",
			component: () => import("@/views/Ratings")
		},
		{
			path:"/seller",
			name:"seller",
			component: () => import("@/views/Seller")
		},
		{
			path:"/*",
			redirect:"/goods"
		}
	]
})
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
export default new VueRouter({
	linkActiveClass:"active",
	mode:"history",
	routes:[
		{
			path:"/movie",
			component: () => import("@/views/Movie"),
			children:[
				{
					path:"city",
					component: () => import("@/common/City")
				},
				{
					path:"onnow",
					component: () => import("@/common/OnNow")
				},
				{
					path:"upcoming",
					component: () => import("@/common/UpComing")
				},
				{
					path:"search",
					component: () => import("@/common/Search")
				},
				{
					path:"detail/onnow/:movieId",
					components:{
						default:() => import("@/common/OnNow"),
						detail:() => import("@/views/Movie/detail")
					}
				},
				{
					path:"detail/upcoming/:movieId",
					components:{
						default:() => import("@/common/UpComing"),
						detail:() => import("@/views/Movie/detail")
					}
				},
				{
					path:"/movie",
					redirect:"/movie/onnow"
				},
			]
		},
		{
			path:"/cinema",
			component: () => import("@/views/Cinema")
		},
		{
			path:"/mine",
			component: () => import("@/views/Mine")
		},
		{
			path:"*",
			redirect:"/movie"
		}
	]
})
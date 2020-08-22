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
					component: () => import("@/components/City")
				},
				{
					path:"onnow",
					component: () => import("@/components/OnNow")
				},
				{
					path:"upcoming",
					component: () => import("@/components/UpComing")
				},
				{
					path:"search",
					component: () => import("@/components/Search")
				},
				{
					path:"detail/onnow/:movieId",
					components:{
						default:() => import("@/components/OnNow"),
						detail:() => import("@/views/Movie/detail")
					}
				},
				{
					path:"detail/upcoming/:movieId",
					components:{
						default:() => import("@/components/UpComing"),
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
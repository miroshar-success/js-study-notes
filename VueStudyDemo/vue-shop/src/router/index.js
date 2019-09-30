import VueRouter from "vue-router"
import Vue from "vue"
Vue.use(VueRouter)

const router =  new VueRouter({
	mode:'history',	// history 路由模式
	routes:[
		{
			name:"list",
			path:"/list",
			component:()=>import("@/views/list"),
			meta:{
				title:"商品列表页",
			}
		},
		{ 
			name:"detail",
			path:"/product/:id",
			component:()=>import("@/views/detail"),
			meta:{
				title:"商品详情页"
			}
		},
		{
			name:"cart",
			path:"/cart",
			component:()=>import("@/views/cart"),
			meta:{
				title:"我的购物车"
			}
		},
		{
			path:"*",
			redirect:"/list"
		}
	]
})

// 全局前置守卫 router.beforeEach()
router.beforeEach((to,from,next)=>{
	window.document.title = to.meta.title;
	next();
})
// 全局后置钩子, 不接受next 函数也不会改变导航本身
router.afterEach((to,from)=>{
	window.scrollTo(0,0);
})

export default router
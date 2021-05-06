# HTML5

  调用视频设备 navigator.mediaDevices.getUserMedia()

[mediaDevices.getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)

	前端路由: hash路由和history路由:

  重要的方法： history.go()/history.back()/history.forward()

  history.pushState(state, title, url); 
  history.replaceState(state, title, url); 
			
	 onpopstate  会监听 go()/back()/forward()操作

	 window.onhashchange = function(){}     // 监听hash值改变,可以通过location.hash 获取或设置

[window.location](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)
[window.history](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)

	Canvas画布
	绘制基本图形：
		ctx.fill()/ctx.stroke()/ctx.rect()
		ctx.arc(x, y, r, 0, 2*Math. PI, false); 
	绘制文本:
		ctx.font = '30px Arial'; 	
		ctx.fillText('hello world', x, y); /ctx.strokeText('hello world', x, y); 
		ctx.textAlign/ctx.textBaseline
		ctx.direction
	绘制线段:
		ctx.moveTo(startX, startY)/ctx.lineTo(x, y); 
		ctx.lineCap='butt/round/square'; ctx.lineJoin='round/miter'
		ctx.setLineDash([lineWidth, lineCap])	传递一个数组, 分别表示线宽和间隔
	样式:
		ctx.fillStyle()/ctx.strokeStyle()
	阴影:
		ctx.shadowColor/ctx.shadowOffsetX/ctx.shadowOffsetY/ctx.shadowBlur
	清除:
		ctx.clearRect(x, y, width, height); 
	路径:
		ctx.beginPath()	清空子路径列表开始一个新的路径。
		ctx.closePath()	使笔点返回到当前子路径的起点。
	变换:
		ctx.scale()/ctx.transform()/ctx.translate()/ctx/rotate()默认以(0, 0)点开始旋转
	绘图
		ctx.drawImage(image, dx, dy); 
		ctx.drawImage(image, dx, dy, dWidth, dHeight); 
		ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); 
		ctx.createPattern(image, type)	// type为 repeat/no-repeat/repeat-x/repeay-y
	像素控制：
		ctx.createImageData(); 	
		ctx.getImageData(); 
		ctx.putImageData(); 
	状态:
		ctz.save()			// 使用栈保存当前的绘画样式状态
		ctx.restore()		// 恢复到最近的绘制样式状态
	合成:
		ctx.globalAlpha	// 设置透明度
	渐变:
		ctx.createLinearGradient(x1, x2, y1, y2); 
		ctx.createRadialGradient(x1, y1, r1, x2, y2, r2); 

[学习canvas, 一篇文章就够了](https://www.runoob.com/w3cnote/html5-canvas-intro.html)
[CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)
[canvas教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)
[canvas动画](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations)

# 移动端

	viewport	
	resolution:2dppx;	媒体查询

# Javascript

	Ajax
[XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

# ES6

	1. let和const
	2. 数组和对象的解构赋值

# PWA

  离线存储    Service Worker
[service worker基本使用](https://googlechrome.github.io/samples/service-worker/basic/index.html)     
[w3c-service-worker](https://w3c.github.io/ServiceWorker/#motivations)

``` js
// sw.js
// 一个service worker demo
const CACHE_NAME = 'cache-v1';

self.addEventListener('install', function(event) {
	event.waitUntil(caches.open(CACHE_NAME).then(cache => {
		cache.addAll([
			'./',
			'./index.css',
			'./1.png'
		]) // 添加需要缓存的咨询路径
	}).then(self.skipWaiting()))
})

self.addEventListener('activate', function(event) {
	event.waitUntil(caches.keys().then(cacheNames => {
		return Promise.all(cacheNames.map(cache => {
			if (cacheName !== CACHE_NAME) {
				return caches.delete(cacheName)
			}
		}))
	}).then(() => self.clients.claim()))
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.open(CACHE_NAME).then(cache => {
			return cache.match(event.request).then(response => {
				if (response) {
					return response
				}
				return fetch(event.request).then(response => {
					cache.put(event.request, response.clone());
					return response;
				})
			})
		})
	)
})
```

	Notification		通知
		Notification.permission		获取当前是否开启通知权限	default/denied/granted
	发送一个通知

	1. 在页面上下文中: new Notification('hello notification',{body:"通知的内容"})
	2. 在serviceWorker中: self.registration.showNotification('hello notification',{body:'通知的内容'})

# Vue
	
	全局API: Vue.extend / Vue.nextTick / Vue.directive / Vue.filter / Vue.mixin / Vue.use / Vue.component
	内置组件: keep-alive	transition slot component transition-group
	选项: data / props / computed / methods /watch / mixins components/ filters / directives 
	生命周期函数: beforeCreate / created / beforeMount / mounted / beforeUpdate / updated / activated / deactivated
	beforeDestory / destoryed 
	特殊attribute: key ref is v-slot 
	指令:v-text/v-html/v-show/v-if/v-else-if/v-else/v-for/v-on/v-bind/v-model/v-slot
	
# Vue-Router
	
	导航守卫:
		1. 全局前置守卫 router.beforeEach 
```js
const router = new VueRouter({})
router.beforeEach((to,from,next) => {
	// ...
})
```
	2. 全局后置钩子	
```js
// 不会接受next函数也不会改变导航本身
router.afterEach((to,from) => {
	// ...
})
```
	路由独享的守卫
```js
const router = new VueRouter({
	routes:[
		{
			path:"/foo",
			component:Foo,
			beforeEnter:(to,from,next) => {
			}
		}
	]
})
```
	组件内的守卫
		beforeRouterEnter	/ beforeRouteUpdate	/ beforeRouteLeave	
```js
const Foo = {
	template:`...`,
	beforeRouteEnter(to,from,next){
		// 无法获取当前实例,可以在next回调函数里获取组件实例
		next(vm => {
		})
	},
	beforeRouteUpdate(to,from,next){
		// 在动态路由的情况下 可以在此函数 获取到路径更新
	},
	beforeRouteLeave(to,from,next){
		// 导航离开该组件时调用	
		const answer = window.confirm("Do you want to leave?");
		if(answer){
			next()
		}else{
			next(false);
		}
	}
}
```
	数据获取两种方式:
		1. 导航完成之后获取: 在组件生命周期钩子中获取数据。
		2. 导航完成之前获取: 在路由进入的守卫中获取数据,在数据获取成功后执行导航。

	路由懒加载： 将异步组件返回一个Promise的工厂函数(该函数返回的Promise应该resolve组件本身)。
	
```js
const Foo = () => import('./Foo.vue');
const Bar = () => import('./Bar.vue');
```
	嵌套路由:
```js
const router = new VueRouter({
	routes:[
		{
			path:"/user/:id",
			component:User,
			children:[
				{
					path:'profile',
					component:UserProfile
				},
				{
					path:"posts",
					component:UserPosts
				}
			]
		}
	]
})
```
	命名视图和命名路由
```html
<router-view name="a"></router-view>
<router-view name="b"></router-view>
<router-link :to="{ name: 'user', params: { id: 123 }}">User</router-link>
// 如果提供了path, params会被忽略
```
```js
const router = new VueRouter({
	routes:[
		{
			path:"/user/:id",
			name:'user',
			component:() => import("./user.vue")
		},
		{
			path:"/layout",
			name:'Layout',
			components:{
				a:Bar,
				b:Foo
			}
		}
	]
})
```
	滚动行为: 当且仅当popstate导航时才可用。返回值为 {x:number,y:number}
```js
const router = new VueRouter({
	routes:[],
	scrollBehavior(to,from,savedPosition){
		if(savedPosition){
			return savedPosition
		}else{
			return {x:0,y:0}
		}
	}
})
```
[vue-router](https://router.vuejs.org/zh/installation.html)
[vue-router-api](https://router.vuejs.org/zh/api/)

# Vue 3.x

	钩子函数	beforeUnmount unmounted
	composition API:
		setup(props,context){
			1. 创建响应式变量 Vue.ref()	Vue.reactive()
				基本数据类型 使用ref创建响应式数据,复杂数据类型使用reactive创建响应式数据
			2. Vue.watch()	监听变量
			3. Vue.computed()	计算属性
			4. const {title} = Vue.toRefs(props);	//解构props
			5. const {title} = Vue.toRef(props,'title'),
		}
	在setup里的生命周期函数,函数名前多了on,比如 onMounted onBeforeUpdate

	teleport	允许我们控制在DOM中哪个父节点下渲染了HTML。 <teleport to="body"></teleport>

	$slots
		用来以编程的方式通过插槽分发的内容。每个具名插槽都有其相应的property.(如：v-slot:foo中的内容将会在this.$slots.foo()中找到)


# Vuex

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		
	},
	mutations:{
		// 处理同步任务
	},
	getters:{
		// vuex的计算属性
	},
	actions:{
		// 可以处理异步任务
	}
})
```
	辅助函数	mapState	mapGetters	mapMutations	mapActions

# Vue服务端渲染

```js
// Koa搭建的一个完整的实例
const Koa = require("koa");
const router = require("koa-router");
const Vue = require("vue");
const app = new Koa();
const renderer = require("vue-server-renderer").createRender({
	template:require("fs").readFileSync('./index.template.html')	// 使用一个页面模版
})

const context = {
	title:"Hello World",
	metas: `
		<meta name="keyword" content="vue,ssr">
		<meta name="description" content="vue srr demo">
	`
}

router.get("/home",async ctx => {
	const app = new Vue({
		data:{
			message:"hello world"
		},
		template:`<div>{{message}}</div>`
	})
	renderer.renderToString(app,context).then(html => {
		ctx.body = html;
	})
})
app.use(router.routes()).use(router.allowedMethods());
```
	所有的生命周期函数中,只有beforeCreate和created会在服务器端渲染过程中被调用。其他任何生命周期钩子函数只会在客户端执行。

# Webpack
	
	常用loader:
		css-loader style-loader file-loader url-loader 
		vue-loader	postcss-loader sass-loader(less-loader)
		babel-loader	
		
	常用plugin和工具
		html-webpack-plugin
		clean-webpack-plugin	每次构建前清理/dist文件夹
		webpack-merge
		webpack.HotModuleReplacementPlugin()
		webpack.DefinePlugin
		
	bundle分析工具
		webpack-chart/webpack-visualizer/webpack-bundle-analyzer/webpack bundle optimize helper
		
# 工具

	1. serve: 

	Assuming you would like to serve a static site, single page application or just a static file, 
  this package is just the right choice for you.

	Usage:
			yarn global add serve  &&  serve or serve folder_name
     
	2. nodemon
		nodemon is a tool that helps develop node.js based applications by automatically restarting the node application
		when file changes in the directory are detected!
    

    

    

    

    

    

    

    

    

    

    

    

    

    

    

    

    

    

    

    

    

    

    

    

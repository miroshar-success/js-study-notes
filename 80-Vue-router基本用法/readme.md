# Vue-router基本用法

	npm install vue-router --save
	
	引入vue-router
		import Vue from "vue";
		import VueRouter from "vue-router";
		Vue.use(VueRouter);
		
	VueRouterConfig:
		new VueRouter({
			router:[
				{
					path:"/index",
					component:IndexComponent
				}
			]
		})
		
## 动态路由

	路径参数使用冒号 ： 标记, 当匹配到一个路由时, 参数值会被设置到 this.$route.params,
	可以在每个组件内使用。
		/user/:id    /user/foo 和 /user/bar都将映射到相同的路由。
	
	除了$route.params外,还有$route.query(查询参数),$route.hash等。
	
	tips:
	1. 当使用路由参数时,原来的组件实例会被复用。因为两个路由都渲染同个组件,比起销毁再重建,复用则
	显得更加高效,这也以为着组件的生命周期钩子不会被再调用。
	2. 匹配任意路由可以使用通配符(*),会匹配所有路径。含有通配符的路由应该放在最后。

## 嵌套路由

	以/开头的嵌套路径会被当做根路径.这让你充分的使用嵌套组件而无需设置嵌套的路径。
```js
const router = new VueRouter({
	routes:[
		{
			path:'/user/:id',
			component:User,
			children:[
				{
					<!-- 当 user/:id/profile匹配成功,UserProfile会被渲染在User的<router-views>中 -->
					path:"profile",
					component:UserProfile
				}
			]
		}
	]
})
```
## 编程式导航

	除了使用<router-link>创建a标签来定义导航链接,还可以借助router的实例方法。
	
	router.push()
	在Vue实例内部,可以通过$router访问路由实例。可以调用 this.$router.push
	
	声明式							编程式
	<router-link to="...">			router.push(...)
	
	router.push("home")
	router.push({path:"home"})

	tips:
	1. 如果提供了path, params会被忽略,query并不属于这种情况。

	router.replace()
	跟router.push()的区别不同的是不会向history添加新纪录。
	
	router.go()
	在history记录中向前或者向后退多少步。

	
## router-link

	支持用户在具有路由功能的应用中(点击)导航。通过to属性指定目标地址,默认渲染成带有正确链接的<a>标签。
	
	1. 将激活的class应用在外层元素
		<router-link tag="li" to="/foo">
			<a>/foo</a>
		</router-link>
	
	上面这种情况下,a将作为真实的链接,而激活时的CSS类名则设置到外层的<li>
	
### <router-link> Props

	to: 表示目标路由的链接。当被点击后,内部会立即把to的值传到router.push()。
	
	replace: 设置replace属性后,当点击时会调用router.replace() 而不是router.push()。不会留下history记录。
	
	append:  设置append属性后,在当前(相对)路径前添加基路径。从/a导航到一个相对路径b,没有设置append,则为/b,
	设置了append属性后为/a/b
	
	tag:  如果想要把<router-link>渲染成某种标签,可以使用tag prop。同样它还是会监听点击,触发导航。
	
	active-class : router-link-active 设置链接激活时使用的CSS类名。
	
	exact: 如果当前的路径是/a开头,那么 <router-link to="a"> 也会被设置CSS类名。
	
	event: 生命可以用来触发导航的事件。
	
	exact-active-class: 配置当链接被精准匹配时应该激活的class。
	
## <router-view>

	<router-view> 组件是一个functional组件，渲染路径匹配到的视图组件。 可以配合<transition>和<keep-alive>使用。
	
### <router-view> Props

	name 默认值: "default"
	如果 <router-view> 设置了名称,则会渲染到对应的路由配置中 components 下相应的组件。
	

## 命名路由

	通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由,或者是执行一些跳转的时候。
```js
const router = new VueRouter({
	routes:[
		{
			path:'/user/:id',
			name:"user",
			component:User
		}
	]
})
```

## 命名视图

	router-view 没有设置名字,默认为default
	
## 重定向与别名

	从/a重定向到/b
```js
const router = new VueRouter({
	routes:[
		{path:"/a",redirect:"/b"}
	]
})
```
	重定向的目标也可以是一个命名的路由:
```js
const router = new VueRouter({
	routes:[
		{path:"/a",redirect:{name:"foo"}}
	]
})
```
	/a 的别名是/b,意味着当用户访问/b时,URL会保持为/b,但是路由匹配规则为/a,
	就像用户访问/a一样。

# Vue-Router

	安装:
		npm install vue-router
	引入:
		import VueRouter from "vue-router"
		Vue.use(VueRouter)
	
	
	Vue Router是Vue.js官方的路由管理器。包含的功能有:
	1. 嵌套的路由/视图表
	2. 模块化的,基于组件的路由配置
	3. 路由参数，查询，通配符
	4. 基于Vue.js过渡系统的视图过渡效果
	5. 细粒度的导航控制
	6. 带有自动激活的CSS class的链接
	7. HTML5历史模式或hash模式
	8. 自定义的滚动条行为

## Router构建选项

	routes: 定义路由
	mode: 配置路由模式,默认 hash(浏览器环境)
	hash: 使用url hash值来做路由.支持所有浏览器，包括不支持HTML5 History Api的浏览器。
	abstract: 支持所有JavaScript运行环境。
	history:依赖HTML5 History API和服务器配置
	base:应用的基路径。如果整个单页应用服务在/app/下，然后base应该设为 '/app/'。
	linkActiveClass: 默认"router-link-active", 默认激活的类名
	linkExactActiveClass: 精确激活的默认的class

## Router实例方法

	router.app 
	配置了router的Vue根实例
	
	router.mode
	路由使用的模式
	
	router-currentRoute
	当前路由对应的路由信息对象。

## <router-link>

	<router-link>组件支持用户在具有路由功能的应用中导航。通过to属性指定目标地址，默认渲染成带有正确链接的<a>
	标签，可以通过配置tag属性生成别的标签
	
	tips:将激活class应用在外层元素
	有时我们要让激活class应用在外层元素，而不是<a>标签本身，那么可以用<router-link>渲染外层元素，包裹着内层的原生
	<a>标签
```js
<router-link tag="li" to="/foo">
	<a>/foo</a>
</router-link>
```

## <router-link> Props

	to：
	 required
	表示目标路由的链接。当被点击后，内部会立即把to的值传到router.push(),
	
	replace
	 默认值:false
	设置replace属性的话，当点击时，会调用router.replace(),而不是router.push(),导航后不会留下history记录
	
	append
	 默认值:false
	 设置append属性后，则在当前(相对路径前添加基路径)。如果我们从/a导航到一个相对路径b,如果没有配置append，
	 则路径为/b,如果配了，则为/a/b
	 
	 tag
	 默认值:"a"
	 有时想要<router-link>渲染成某种标签，可以使用tag prop，通用它还是会监听点击触发导航
	 
	 active-class
	 默认值:router-link-active
	 链接激活时使用的CSS类名。默认值可以通过路由的构造选项linkActiveClass来全局配置。
	 
	 exact
	 "是否激活"默认类名的依据时Inclusive match(全包含匹配)，如果当前的路径是/a开头的，那么<router-link to="/a">
	 也会被设置CSS类名
	 
	 按照这个规则，每个路由都会激活<router-link to="/"></router-link>,使用exact属性时, 
	 <!-- 这个链接只会在地址为/的时候被激活-->
	 <router-link to="/"></router-link>
	 
	 exact-active-class
	 默认值:'router-link-exact-active'
	 配置当链接被精确匹配的时候应该激活的class。默认值可以通过路由构造函数选项linkExactActiveClass进行全局配置
	 
## <router-view>

	<router-view>组件是一个functional组件，渲染路径匹配到的视图组件。<router-view>渲染的组件还可以内嵌自己的<router-view>
	
	<router-view> Props:
		name:default
	如果<router-view>设置了名称，则会渲染对应的路由配置中components下的响应组件
	
### 命名视图

	如果想同级展示多个视图，而不是嵌套展示，可以用命名视图，而不是只有一个单独的出口。如果router-view没有设置名字，那么默认为default。
```js
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>

const router = new VueRouter({
	routes:[
		path:'/',
		components:{
			default:Foo,
			a:Bar,
			b:Baz
		}
	]
})
```
		
### 命名路由

	通过一个名称来标识一个路由显得更方便一些，可以在创建Router实例的时候，在routes配置中给某个路由设置名称
```js
const router = new VueRouter({
	routes:[
		{
			path:'/user/:userId',
			name:'user',
			component:User
		}
	]
})

要链接到一个命名路由，可以给router-link的to属性传一个对象:
<router-link :to="{name:'user',params:{userId:123}}">User</router-link>

会把路由导航到 user/123路径
```

## 动态路由匹配

	有时需要把某种模式匹配到的所有路由，全都映射到同个组件。可以在vue-router的路由中使用动态路径参数
```js
const User = {
	template:"<div>User</div>"
}
const router = new VueRouter({
	routes:[
		{
			path:"/user/:id",component:User
		}
	]
})
```
	参数会被设置到this.$route.params，可以在每个组件内使用。
	
	tips:
	1. 当使用路由参数时，例如从/user/foo导航到/user/bar,原来的组件实例会被复用。因为两个路由都渲染同个组件，
	比起销毁再创建，复用显得更加高效。这也意味着组件的生命周期钩子不会被再调用。
	2. 复用组件时，想对路由参数的变化做出响应的话，可以简单地watch(监测变化) $route对象。

## 重定向和别名

```js
const router = new VueRouter({
	routes:[{path:"/a",redirect:"/b"}]
})
```
	当用户访问/a时，URL将会被替换成/b,然后匹配路由为/b。
	
```js
const router = new VueRouter({
	routes:[
		{
			path:"/a",
			component:A,
			alias:"/b"
		}
	]
})
```
	/a的别名是/b，当用户访问/b时，URL会保持为/b,但是路由匹配则为/a。
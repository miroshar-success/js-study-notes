# 导航守卫

	导航守卫主要用来通过跳转或者取消的方式守卫导航。
	tips:
	1. 参数或查询的改变并不会触发 进入/离开的 导航守卫。可以通过 $route 对象来应对这些变化，或使用beforeRouteUpdate的
	组件内守卫。
	
## 全局前置守卫

	router.beforeEach 注册全局前置守卫:
	router.beforeEach((to,form,next) => {});
		to: Route 即将要进入的目标 路由对象
		from: Route 当前导航正要离开的路由
		next: Function 
	
	调用next方法才能进入下一个钩子。
		
	提升用户体验
	tips:
	1. 在一个页面过长滚动到某一个位置,然后跳入另一个页面的时候,滚动条默认是在上一个页面停留的位置,更好的体验是能返回顶端。
	2. 从一个页面过渡到另一个页面,可以出现一个全局的Loading动画,等到新页面加载完后再结束动画。
	3. 某些页面需要验证是否登陆,如果登陆了就可以访问,否则跳转到登陆页面。可以在next()传入参数实现。
	
	
	next()			进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是confirmed
	next(false)		中断当前的导航。如果浏览器的url改变了那么url地址会重置到from路由对应的位置。
	next("/")		跳转到一个不同的地址。当前的导航被中断,然后进行一个新的导航。
	
## 全局后置钩子

	这些钩子不会接受 next 函数也不会改变导航本身:
	
	router.afterEach((to,from) => {
		
	})
	
	也可以在路由配置上直接定义beforeEnter守卫:
```js
const router = new VueRouter({
	routes:[
		{
			path:"/foo",
			component:Foo,
			beforeEnter((to,from,next) => {
				
			})
		}
	]
})
```

## 组件内的守卫

	beforeRouteEnter
	beforeRouteUpdate
	beforeRouteLeave
```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

## 获取数据
	
	1. 导航完成之后获取: 先完成导航,然后在接下来的组件生命周期钩子中获取数据。在数据获取期间展示"加载中"之类的指示。
	2. 导航完成之前获取: 导航完成前,在路由进入的守卫中获取数据,在数据获取成功后执行导航。

	复用组件时,想对路由参数的变化做出响应的话,可以简单地watch(监测变化) $route对象。
```js
const User = {
	template:'....',
	wtach:{
		"$route"(to,from){
			
		}
	}
}
```
	或者使用引入的 beforeRouteUpdate 导航守卫:
```js
const User = {
	template:"...",
	beforeRouteUUpdate(to,from,next){
		
	}
}
```
	
	组件注入:
		注入的属性: 通过在Vue根实例的router配置传入router实例,下面这些属性成员会被注册到每个子组件。
		
		this.$router
			router实例
		this.$route
			当前激活的路由信息对象。这个属性是只读的。
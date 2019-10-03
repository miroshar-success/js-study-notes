# Vue.extend

	使用基础Vue构造器,创建一个"子类",参数是一个包含组件选项的对象。
	
	官方文档的例子.
```js
var Profile = Vue.extend({
	template:"<p>{{firstName}} {{lastName}}</p>",
	data(){
		return{
			firstName:"Walter",
			lastName:"White"
		}
	}
});

new Profile().$mount("#mount-point")
```
	tips:
		1. p元素会替换挂载的元素,渲染结果为 <p>Walter White </p>

	el：
	提供的元素只能作为挂载点。不同于 Vue 1.x，所有的挂载元素会被 Vue 生成的 DOM 替换。
	因此不推荐挂载 root 实例到 <html> 或者 <body> 上
	
	
	使用Vue.component()创建一个组件时:
	
		1. Vue.component("my-component",{})  传入一个选项对象,自动调用Vue.extend
		2. Vue.component("my-component",Vue.extend({}))	扩展过的构造器
	
	
# Vue.nextTick

	在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法,获取更新后的DOM。
```js
// 官网的例子
<div id="example">{{message}}</div>

var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```
	tips:
	1. textContent 设置或返回指定节点的文本内容,以及它的所有后代。

# Vue.directive

	自定义指令
	1. 全局指令
```js
Vue.directive("focus",{
	inserted:function(el){
		el.focus();
	}
})
```
	2. 局部指令
```js
directives:{
	focus:{
		inserted:function(el){
			el.focus()
		}
	}
}
```
	钩子函数
		bind: 只调用一次,指定第一次绑定到元素时调用。
		inserted: 被绑定元素插入到父节点时调用。
		update: 所在组件的VNode更新时调用，
		componentUpdated: 指令所在组件的VNode及其VNode全部更新后调用
		unbind: 只调用一次,指令与元素解绑时调用。
		
	钩子函数参数:
		el: 指令所绑定的元素,可以用来直接操作DOM
		binding: 一个对象
			name: 指令名
			value: 指令值
			oldValue 指令绑定的前一个值
			expression 字符串形式的指令表达式
	
	动态指令参数:
		v-mydirective:[argument]="value" argument参数可以根据组件实际数据进行更新！
		
	对象字面量:
		指令函数能够接受所有合法的JavaScript表达式
		<div v-demo="{color:'white',text:'hello!'}"></div>
		
# Vue.filter

	Vue.js允许自定义过滤器,可被用于一些常见的文本格式化。过滤器可以用在两个地方:双花括号插值和v-bind表达式
	
```js
// 本地过滤器
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}


// 全局过滤器
Vue.filter("capitalize",function(value){
	if (!value) return ''
	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
})
```
	tips:
	1. 当全局过滤器和局部过滤器重名时,会采用局部过滤器
	2. 过滤器是JavaScript函数,可以接受参数

# Vue.component

	注册组件: 传入一个扩展过的构造器
		Vue.component("my-component",Vue.extend({}))
	
	// 传入一个选项对象(自动调用Vue.extend)
		Vue.component("my-component",{/*...*/})
	
	
	动态组件:
	可以通过Vue.component 元素加一个特色的 is 特性来实现
	
	<!-- 组件会在 `currentTabComponent` 改变时改变 -->
	<component v-bind:is="currentTabComponent"></component>
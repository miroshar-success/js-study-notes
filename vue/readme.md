
# 内置组件/动态组件

    keep-alive
        props:
            include: 字符串或正则表达式.只有名称匹配的组件会被缓存
            exclude: 字符串或正则表达式.任何名称匹配的组件都不会被缓存。
            max： 数字,最多可以缓存多少组件实例
            
    <keep-alive>  包裹动态组件时,会缓存不活动的组件实例,而不是销毁它们。<keep-alive>自身不会渲染一个DOM。
    也不会出现在组件的父组件链中。
    
    当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
		
		和 transition 一起使用
```js
<transition>
	<keep-alive>
		<component :is='view'></component>
	</keep-alive>
</transition>
```
	tips:
		1. keep-alive 在for循环中不会工作。

# mixins
	
	mixin提供了一种非常灵活的方式来分发Vue组件中可复用功能。
	使用的是和Vue.extend()一样的选项合并逻辑。mixin钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。
	
	1. 选项合并:
		当组件和混入对象包含同名选项时,这些选项将以恰当方式合并。如果数据对象发生冲突时,以组件数据优先。
```js
// 一个demo
var mixin = {
	data:function(){
		return {
			message:'hello',
			foo:'abc'
		}
	}
}

new Vue({
	mixins:[mixin],
	data:function(){
		return {
			message:'goodbye',
			bar:'def'
		}
	},
	created(){
		console.log(this.$data);	// {message:"goodbye",foo:'abc',bar:'def'}
	}
})
```
	2. 同名钩子函数会合并为一个数组,都会被调用
	3. 值为对象的选项,例如methods, components和directives 将合并为同一个对象。两个对象键名冲突时,
	取组件对象的键值对。

# 自定义指令

	除了核心功能默认内置的指令(v-model和v-show),Vue也允许注册自定义指令。有的情况下，仍然需要对
	普通DOM元素进行底层操作，这个时候就会用到自定义指令。
	
	获取焦点的自定义指令
```js
// 注册一个全局自定义指令 v-focus
// focus: 指令的名字 
Vue.directive("focus",{
	inserted:function(el){
		el.focus();
	}
})


// 注册局部指令,组件也接受一个directives选项

new Vue({
	el:"#app",
	directives:{
		focus:{
			inserted:function(el){
				el.focus();
			}
		}
	}
})
```

## 钩子函数

	一个指令定义对象可以提供如下几个钩子函数
		bind: 只调用一次，指令第一次绑定到元素时调用，这里可以进行一次性的初始化设置。
		inserted: 被绑定元素插入父节点时调用
		update:所在组件的VNode更新时调用，但是可能发生在其子VNode更新之前。
		componentUpdated:指令所在组件的VNode及其子VNode全部更新后调用
		unbind:只调用一次，指令与元素解绑时调用。

## 钩子函数参数

	el:指令所绑定的元素，可以用来直接操作DOM.
	binding:一个对象，包含以下属性:
		name:指令名
		value:指令的绑定值
		oldValue:指令绑定的前一个值，仅在undate和componentUpdated钩子中可用
		expressiong:字符串形式的指令表达式。
		arg:传给指令的参数。
		modifiers:一个包含修饰符的对象。
		vnode:Vue编译生成的虚拟节点。
		oldVnode:上一个虚拟节点,仅在update和componentUpdated钩子中可用。
		
		
# 过滤器

	Vue允许自定义过滤器，可用于一些常见的文本格式化。过滤器可以用在两个地方:双花括号插值和v-bind表达式
	
	demo:将首字母大写
```js
<p>{{message | capitalize}}</p>

filters:{
	capitalize(value){
		let temp = [];
		value.split(" ").filter(function(item){
			temp.push( item.charAt(0).toUpperCase() + item.substring(1) );
		});
		return temp.join(",");
	}
}
```


# component

	组件可以注册全局组件和局部组件两种。全局组件注册后，任何Vue实例都可以使用。全局组件注册方式为:
	Vue.component('my-component',{
		
	});
```html
<div id="server">
	<my-component></my-component>
</div>

<script>
	Vue.component('my-component',{
		template:'<p>这里是自组件</p>'
	})
</script>
```
	1. data必须是一个函数
	2. 父级模板里的所有内容都是在父级组件作用域中编译的；子模板里的所有内容都是在子级作用域
	中编译的。

## props

所有的prop都使得其父子prop之间形成了一个**单向下行绑定**：父级prop的更新会向下流动到子组件中，
但是反过来则不行。这样会防止从子组件意外改变父组件的状态，从而导致你的应用的数据流向难以理解。
	
	1. 每次父级组件发生更新时，子组件中所有的prop都将会刷新为最新的值。
	2. 不要再一个子组件内部改变prop
	
	tips:
	1. 驼峰命名的prop名需要使用其等价的短横线分割命名.
	2. 如果直接传递数字,布尔值,数组,对象,而不使用v-bind,传递的仅仅是字符串。


## Prop类型
	
	props的值可以是两种, 字符串数组 或 对象。
	
	如果你希望每个prop都有指定的值类型。这时,你可以以对象形式列出prop,这些属性的名称和值分别是prop各自的名称
	和类型。
	props:{
		title:String,
		likes:Number,
		isPublished:Boolean,
		commentIds:Array,
		author:Object
	}
	
## 常见的试图改变一个prop的情形：

	1. 这个prop用来传递一个初始值;这个子组件接下来希望将其作为一个本地的prop数据来使用。这种情况下,最好定义一个本地的
	data属性并将这个prop用作起初始值。
	tips:
		在子组件引用 counter的时候, 只会渲染父组件传递过来的初始值,而如果父组件的值在修改时,子组件的值是不会同步修改的。
```js
props:["initialCounter"],
data:function(){
	return {
		counter:this.initialCounter
	}
}
```
	2. 这个prop以一种原始的值传入并且需要进行转换。这种情况下，最好使用这个prop的值来定义一个计算属性。
	
	tips:
	在JavaScript中对象和数组是通过引用传入的，所以对于一个数组或对象类型的prop来说，在子组件中改变这个
	对象或者数组本身将会影响到父组件的状态。
```js
props:["size"],
computed:{
	normalizedSize:function(){
		return this.size.trim().toLowerCase()
	}
}
```
	

# 数组更新检测

	Vue包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：
		push()		在数组末尾添加元素并返回长度
		pop()		删除数组的最后一个元素并返回最后一个元素
		shift()		删除数组第一个元素并返回第一个元素
		unshift()	在数组头部添加元素并返回数组长度
		splice()	
		sort()		将数组排序
		reverse()	颠倒数组元素
	因为上述方法会改变源数组，所以会触发视图更新，除了有变异方法，也有非变异方法，如 filter() concat()
	和slice()。这些不会改变原始数组，但总是返回一个新数组。
	
	tips:
	1. 当使用非变异方法时，可以用新数组替换旧数组
	2. 当利用索引直接设置一个项时，例如vm.items[indexOfItem] = newValue 不能检测数组的变动
	3. 当修改数组长度时，例如vm.items.length = newLength也不能检测数组的变动
	
	为了解决 vm.items[indexOfItem] = newValue，可以使用如下的两种方法:
	1. Vue.set(vm.items,indexOfItem,newValue);
	2. vm.items.splice(indexOfItem,1,newValue);
	
	也可以使用vm.$set实例方法，该方法是全局方法 Vue.set的一个别名：
	vm.$set(vm.items,indexOfItem,newValue);
	
## 对象更改检测注意事项

	Vue不能检测对象属性的添加或删除：
```js
let vm = new Vue({
	data:{
		a:1
	}
});
`vm.a` 是响应式的 
vm.b = 2 不是响应式
```
	对于已经创建的实例，Vue不能动态创建根级别的响应属性。但是，可以使用Vue.set(object,key,value)方法
	嵌套对象添加响应式属性。
```js
var vm = new Vue({
	data:{
		userInfo:{
			name:"JayK"
		}
	}
});

Vue.set(vm.userInfo,'age',27);

如果你需要为已有对象赋予多个新属性，可以使用Object.assign()或 _.extend()。
vm.userInfo = Object.assign({},vm.userInfo,{
	age:28,
	team:'cavs'
})
```

	<input v-model="searchText"></input> 
	等价于：
	<input 
		v-bind:value="searchText"
		v-on:input="searchText = $event.target.value"
	></input>

# 插槽

	Vue实现了一套内容分发的API,将<slot>元素作为承载分发内容的出口。
	
	
	具名插槽：
	有时需要多个插槽。对于这样的情况，<slot>元素有一个特殊的特性：name,可以用来定义额外的插槽
```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
	然后再<template>元素上使用v-slot指令，并以v-slot的参数的形式提供其名称：
```html
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
```
	tips:
	1. v-slot 只能用在<template>元素或者组件上
	2. 一个不带name的<slot>出口会带有隐含的名字"default",任何没有被包裹在带有v-slot的<template>
	中的内容都会被视为默认插槽的内容。
	
## 动态组件 keep-alive

	当在不同组件之间切换的时候，有时会想保持这些组件的状态，以免反复重复渲染导致的性能问题。
	<keep-alive>包裹动态组件时，会缓存不同活动的组件实例,而不是销毁它们。<keep-alive>是一个抽象组件:
	它自身不会渲染一个DOM元素，也不会出现在父组件链中。
	
```js
<keep-alive>
<!-- 失活的组件将会被缓存 -->
	<component v-bind:is="currentView"></component>
</keep-alive>
```

## 过渡&&动画

	v-enter:定义进入过渡开始的状态
	v-enter-active:定义进入过渡生效时的状态
	v-enter-to:进入过渡的结束状态
	v-leave:定义离开过渡的开始状态
	v-leave-active:定义离开过渡生效时的状态
	v-leave-to:定义离开过渡的结束状态
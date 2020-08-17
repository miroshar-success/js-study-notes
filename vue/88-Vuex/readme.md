# Vuex

	state:驱动应用的数据源
	view:以声明方式将state映射到视图
	actions:响应在view上的用户输入导致的状态变化。
	
	遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏:
	1. 多个视图依赖同一状态。
	2. 来自不同视图的行为需要变更同一状态。
	
	Vuex应用的核心就是store,它包含着应用中大部分的状态(state)，Vuex和单纯的全局对象有以下两点不同:
	1. Vuex的状态存储是响应式的,当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，
	那么相应的组件也会相应地得到高效更新
	2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation

## state

	单一状态树
	Vuex使用单一状态树，用一个对象就包含了全局的应用层级状态。至此它作为一个"唯一数据源"而存在。
	
	mapState
	
## Getter

	有时需要从store中的state中派生出一些状态，可以在store中定义getter,就像计算属性一样，getter的返回值会根据
	它的依赖被缓存起来。且只有当它的依赖值发生了改变才会重新计算。
```js
const store = new Vuex.Store({
	state:{
		todos:[
			{id:1,text:"1",done:true},
			{id:2,text:"2",done:false}
		]
	},
	getters:{
		doneTodos: state => {
			return state.todos.filter( todo => todo.done );
		}
	}
})
```
	Getter会暴露为store.getters对象，可以以属性的形式访问这些值:
	store.getters.doneTodos
	
	tips:
	1. getter在通过方法访问时，每次都会去进行调用，而不会缓存结果。

## Mutation

	更改Vuex的store中的状态的唯一方法是提交mutation。每个mutation都有一个字符串的事件类型(Type)和一个
	回调函数(handler)。回调函数就是我们进行状态更改的地方
```js
const store = new Vuex.Store({
	state:{
		count:0
	},
	mutations:{
		increment(state){
			state.count++;
		}
	}
});
store.commit("increment")
```

### 提交负荷(Playload)

	可以向store.commit传入额外的参数。
```js
mutations:{
	increment(state,playload){
		state.count += playload.amount;
	}
}
store.commit("increment",{
	amount:10
})
```

### 对象风格的提交方式

	提交mutation的另一种方式是直接使用包含type属性的对象:
```js
store.commit({
	type:"increment",
	amount:10
})
```
	tips:
	1. Mutation必须是同步函数
	2. 最好提前在store中初始化好所需属性。
	3. 当需要在对象上添加新属性时,应该使用 Vue.set(obj,"newProp",123) 或者使用对象开展运算符 
	state.obj = {...state.obj,newProp:123}

## Action

	Action类似于Mutation,不同在于:
	1. Action提交的是Mutation,而不是直接变更状态。
	2. Action可以包含任意异步操作

	Action函数接受一个与store实例具有相同方法和属性的context对象，可以调用context.commit提交一个mutation
	或者通过 context.state 和 context.getters来获取 state和getters。
```js
// 利用解构赋值
actions:{
	increment({commit}){
		commit("increment")
	}
}
```
### 分发Action

	Action通过store.dispatch方法触发:
	store.dispatch("increment")
	
## Moudule

	由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用对象变得非常复杂时，store对象有可能变得比较臃肿。
	为了解决以上问题,Vuex允许我们将store分割成模块(moudule)。
```js
const mouduleA = {
	state:{},
	getters:{},
	actions:{},
	mutations:{}
}

const mouduleB = {
	state:{},
	mutations:{},
	actions:{}
}

const store = new Vuex.Store({
	moudules:{
		a:muduleA,
		b:moduleB
	}
})

store.state.a
```
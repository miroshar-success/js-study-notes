
# watch

	可以通过watch来响应数据的变化。watch监听时函数名字必须和变量名一致。
	
```js
new Vue({
	el:"#demo",
	data:{
		firstName:"",
		lastName:"",
		fullName:""
	},
	watch:{
		firstName(val){
			this.fullName = val + this.lastName;
		},
		lastName(val){
			this.fullName = this.firstName + val;
		}
	}
})
```
# computed
	
	对于任何复杂逻辑，都应当使用计算属性。
	
	上面的例子通过 computed 的写法
	
```js
new Vue({
	el:"#demo",
	data:{
		firstName:"",
		lastName:"",
	},
	computed:{
		fullName(){
			return this.firstName + this.lastName;
		}
	}
})
```

## Computed vs Methods

```js
new Vue({
	el:"#server",
	data:{
		message:"Hello"
	},
	computed:{
		reversedMessage(){
			return this.message.split("").reverse().join("");
		}
	}
	// 
	methods:{
		reversedMessage(){
			return this.message.split("").reverse().join("");
		}
	}
})
```
	上面两种方法的结果是完全相同的，然而不同的是计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时
	它们才会重新求值。只要message还没有发生改变，多次访问reversedMessage计算属性会立即返回之前的计算结果，而不必再次
	执行函数。
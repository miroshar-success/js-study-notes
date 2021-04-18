Vue.createApp({
	data(){
		return {
			items:[
				{text:'vue.js',id:1},
				{text:'react.js',id:2},
				{text:'angular.js',id:3}
			],
			parentMessage:'Parent'
		}
	}
}).mount("#array-rendering");


Vue.createApp({
	data(){
		return {
			parentMessage:'Parent',
			items:[
				{text:"react",id:1},
				{text:'react-redux',id:2},
				{text:'redux',id:3}
			]
		}
	}
}).mount("#array-with-box");


Vue.createApp({
	data(){
		return {
			object:{
				title:"How to do lists in Vue",
				author:"Jane Doe",
				publishedAt:'2016-04-10'
			},
			array:['How to do lists in Vue','Jane Doe','2016-04-10'],
			numbers:[0,1,2,3,4,5,6,7,8,9,10]
		}
	},
	computed:{
		evenNumbers(){
			return this.numbers.filter(number => number%2==0)
		}
	}
}).mount("#v-for-object");


const todo_app = Vue.createApp({
	data(){
		return {
			todo_list:[
				{text:'Hello World'},
				{text:'你好,世界'}
			],
			todo:""
		}
	},
	methods:{
		addNewTodo(){
			this.todo_list.push({
				text:this.todo
			})
			this.todo = "";
		},
		remove(index){
			this.todo_list.splice(index,1);
		}
	}
})

todo_app.component("todo-item",{
	template:`<li>{{todo['text']}} <button @click.stop="remove">remove</button></li>`,
	props:{
		todo:{
			type:Object,
			default:function(){
				return {}
			}
		}
	},
	methods:{
		remove(){
			this.$emit("remove")
		}
	}
})

todo_app.mount("#todo-list-example");

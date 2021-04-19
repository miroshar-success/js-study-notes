Vue.createApp({
	data(){
		return {
			count:0
		}
	},
	methods:{
		add(){
			this.count += 1;
		}
	}
}).mount("#basic-event");


Vue.createApp({
	data() {
		return {
			name:"Vue.js"
		}
	},
	methods:{
		greet(event){
			if(event){
				console.log(event.target.tagName);
			}
		}
	}
}).mount("#event-with-method");


Vue.createApp({
	methods:{
		say(message){
			console.log('message:',message);
		},
		one(event){
			console.log('我是事件1',event);
		},
		two(event){
			console.log("我是事件2",event);
		}
	}
}).mount("#inline-handle");


// 事件修饰符
Vue.createApp({
	methods:{
		parent(){
			console.log("parent");
		},
		child(){
			console.log('child');
		},
		onSubmit(event){
			event.preventDefault();
		},
		enter(){
			console.log('1111');
		}
	}
}).mount("#modify-event");
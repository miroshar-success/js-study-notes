			const Counter = {
				data(){
					return {
						counter:0,
						timer:null,
						message:'You loaded this page on ' + new Date().toLocaleString()
					}
				},
				methods:{
					add(){
						this.counter += 1;
					},
					clear_timer(){
						if(this.timer){
							clearInterval(this.timer);
						}
					}
				},
				mounted(){
					this.timer = setInterval(() => {
						this.counter += 1;
					},1000)
				}
			}
			Vue.createApp(Counter).mount("#root");
			
				// 事件绑定
			const EventHandling = {
				data(){
					return {
						message:'hello world'
					}
				},
				methods:{
					reverseMessage(){
						this.message = this.message.split("").reverse().join("");
					}
				}
			}
			Vue.createApp(EventHandling).mount("#event-handling");
			
			// 表单绑定
			const TwoWayBinding = {
				data(){
					return {
						message:'Hello Vue!'
					}
				}
			}
			Vue.createApp(TwoWayBinding).mount("#two-way-binding");
			
			// 条件渲染
			const ConditionalRendering = {
				data() {
					return {
						seen:false
					}
				},
				methods:{
					toggle_show(){
						this.seen = !this.seen;
					}
				}
			}
			Vue.createApp(ConditionalRendering).mount("#conditional-rendering");
			
			// 条件渲染
			const ListRendering = {
				data(){
					return {
						todos:[
							{text:"Learn JavaScript"},
							{text:"Learn Vue"},
							{text:"Build something awesome"}
						]
					}
				}
			}
			Vue.createApp(ListRendering).mount("#list-rendering");
			
			
			// 组件
			const TodoList = {
				data() {
					return {
						todoList:[
							{id:0, text:"Vegetables"},
							{id:1, text:"Cheese"},
							{id:2, text:"Whatever else humans are supposed to eat"}
						]
					}
				}
			}
			const app = Vue.createApp(TodoList);
			app.component("todo-item",{
				template:`<li>{{todo}}</li>`,
				props:['todo'],
			})
			app.mount("#app");
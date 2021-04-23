const button_app = Vue.createApp({
})

button_app.component('my-component',{
	template:`<button :style="styleObj"><slot>Submit button</slot></button>`,
	data(){
		return {
			styleObj:{
				backgroundColor:'#1890ff',
				color:"#ffffff",
				width:'100px',
				height:'30px',
				outLine:"none",
				border:'none',
				margin:'5px'
			}
		}
	}
}).mount("#slot-component");


// 具名插槽
const layout_app = Vue.createApp({});

layout_app.component("base-layout",{
	template:`<div class="layout-container">
		<div class="header">
			<slot name="header"></slot>
		</div>
		<div class="body">
			<slot name="body"></slot>
		</div>
		<div class="footer">
			<slot name="footer"></slot>
		</div>
	</div>`
}).mount("#layout");



const todo_app = Vue.createApp({});

todo_app.component("todo-list",{
	data(){
		return {
			items:['Feed a cat','Buy milk']
		}
	},
	template:`<li v-for="(item,index) in items" :key="'item-'+index">
		<slot :item="item"></slot>
	</li>`
}).mount("#todo-list")
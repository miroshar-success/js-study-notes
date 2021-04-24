const provide_app = Vue.createApp({
	data(){
		return {
			message:'hello world',
			todos:['Vuex','Redux','React']
		}
	},
	provide:{
		username:"jayk",
	}
});

const c = {
	template:`<div>我是C组件:{{username}}</div>`,
	inject:['username']
}
provide_app.component("todo-list",{
	template:`<div>
		<ul>
			<li v-for="(item,index) in items" :key="index">{{item}}</li>
		</ul>	
		<c></c>
	</div>`,
	data(){
		return {
			items:['Vuex','Vue']
		}
	},
	components:{
		c
	},
}).mount("#provide");

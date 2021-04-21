const button_add = Vue.createApp({
	data(){
		return {
			posts:[
				{id:1, title:"My journey with Vue"},
				{id:2, title:"Blogging with Vue"},
				{id:3, title:"Why Vue is fo fun"}
			],
			postFontSize:1
		}
	}
});

button_add.component("button-counter",{
	data(){
		return {
			count:0
		}
	},
	template:`<button @click.stop="add">{{count}}</button>`,
	methods:{
		add(){
			this.count += 1;
		}
	}
});

button_add.component('blog-post',{
	props:{
		title:{
			type:String,
		}
	},
	template:`<div>
		<h4>{{title}}</h4>
		<button @click.stop="enlarge_text">Enlarge text</button>
	</div>
	`,
	methods:{
		enlarge_text(){
			this.$emit("large_text",0.1)
		}
	}
});

button_add.mount("#component-demo");
// 单元素/组件的切换
const vm = new Vue({
	el:"#root",
	data(){
		return {
			message:"hello world",
			show:true
		}
	},
	methods:{
		toggle(){
			this.show = !this.show;
		}
	}
})


// CSS动画
new Vue({
	el:"#app",
	data(){
		return {
			show:true
		}
	},
	methods:{
		toggle(){
			this.show = !this.show;
		}
	}
})
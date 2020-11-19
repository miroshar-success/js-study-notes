const vm = new Vue({
	el:"#hook",
	data(){
		return {
			show:true,
			message:"Hello World"
		}
	},
	methods:{
		toggle(){
			this.show = !this.show;
		},
		beforeEnter(el){
			console.log('beforeEnter:',el);
		},
		enter(el,done){
			console.log('enter:',el);
		},
		afterEnter(el){
			console.log('afterEnter:',el);
		},
		beforeLeave(el){
			console.log('beforeLeave:',el);
		},
		leave(el,done){
			console.log('leave:',el);
		},
		afterLeave(el){
			console.log('afterLeave:',el);
		}
	}
})
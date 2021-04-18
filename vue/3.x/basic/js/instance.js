const a = Vue.createApp({
	data() {
		return {
			message:"我是根组件实例",
			count:4
		}
	},
	created(){
		console.log('created');
	},
	mounted(){
		console.log("mounted");
	}
});

const vm = a.mount("#instance");
console.log('vm:',vm);
console.log('vm.message:',vm.message);
console.log('vm.count:',vm.count);
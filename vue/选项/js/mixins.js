var mixin = {
	data(){
		return {
			name:'mixin',
			message:'hello',
			foo:'abc'
		}
	},
	created:function(){
		console.log('我是混入');
	},
	filters:{
		reverseMessage(value){
			return value.split('').reverse().join("")
		}
	},
	methods:{
		hello(){
			console.log('hello from mixin')
		},
		get_name(){
			console.log('get-name:',this.name);
		},
		baz(){
			console.log('foo');
		}
	}
}

const vm = new Vue({
	data(){
		return {
			name:'vm',
			message:'goodbye',
			bar:'def'
		}
	},
	el:'#mixin',
	mixins:[mixin],
	created(){
		console.log('我是根实例');
		console.log(this.$data);
	},
	filters:{
		reverseMessage(value){
			return value;
		}
	},
	methods:{
		get_name(){
			console.log("get-name:",this.name);
		},
		baz(){
			console.log('bar')
		}
	}
})

vm.baz();	// bar
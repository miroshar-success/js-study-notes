const data_property = Vue.createApp({
	data() {
		return {
			count:5
		}
	},
	methods:{
		increment(){
			this.count += 1;
		}
	}
})

const b = data_property.mount("#demo2");

console.log('$data:',b.$data);

setInterval(() => {
	b.increment()
},1000)
const player = Vue.component('player',{
	template:`<div>
		<p>This is a Player page</p>
		<p>{{count}}</p>
		<button @click="add">click</button>
	</div>`,
	data(){
		return {
			count:0
		}
	},
	methods:{
		add(){
			this.count++
		}
	},
	beforeCreate(){
		console.log('player beforeCreate');
	},
	created(){
		console.log("player created")
	},
	beforeMount(){
		console.log('player beforeMount')
	},
	mounted(){
		console.log('player mounted')
	},
	activated(){
		console.log('player activated');
	},
	beforeUpdate(){
		console.log('player beforeUpdate');
	},
	updated(){
		console.log('player updated');
	},
	beforeDestroy(){
		console.log('player beforeDestroy')
	},
	destroyed(){
		console.log('player destroyed');
	}
});

const singer = Vue.component('singer',{
	template:`<div>
		<p>This is a Singer Page</p>
	</div>`,
	created(){
		console.log('singer created');
	},
	activated(){
		console.log('singer activated');
	}
})

const vm = new Vue({
	el:"#root",
	data(){
		return {
			current:"singer"
		}
	},
	methods:{
		toggle(){
			this.current = this.current == 'singer'
				? 'player'
				: 'singer'
		}
	}
});
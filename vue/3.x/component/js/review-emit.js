// 组件上使用 v-model
const event_app = Vue.createApp({
	data(){
		return {
			message:"hello world"
		}
	}
})

event_app.component('my-component',{
	template:`<input type="text" :value="modelValue" @input="change_value">`,
	props:{
		modelValue:{
			type:[String,Number],
			required:true
		}
	},
	emits:['update:modelValue'],
	methods:{
		change_value(event){
			this.$emit("update:modelValue",event.target.value);
		}
	}
}).mount("#emit-bind");

// 组件上使用多个v-model

const multiple_event_bind = Vue.createApp({
	data(){
		return {
			singer:"",
			player:""
		}
	}
});

multiple_event_bind.component("my-component",{
	template:`<div>
		<input type="text" :value="singer" @input="change_singer">
		<input type="text" :value="player" @input="change_player">
	</div>`,
	props:{
		singer:{
			type:String,
			default:""
		},
		player:{
			type:String,
			default:""
		}
	},
	emits:['update:singer','update:player'],
	methods:{
		change_singer(e){
			this.$emit("update:singer",e.target.value);
		},
		change_player(e){
			this.$emit("update:player",e.target.value);
		}
	}
}).mount("#mutiple-event-bind");


const modifier_event = Vue.createApp({
	data(){
		return {
			message:""
		}
	}
});
modifier_event.component("my-component",{
	template:`<input type="text" :value="modelValue" @input="change_value">`,
	emits:['update:modelValue'],
	props:{
		modelValue:{
			type:String,
			default:""
		},
		modelModifiers:{
			default:() => ({})
		}
	},
	methods:{
		change_value(e){
			let v = e.target.value;
			if(this.modelModifiers.capitalize){
				v = v.toUpperCase()
			}
			this.$emit("update:modelValue",v);
		}
	}
}).mount("#modifier-event")
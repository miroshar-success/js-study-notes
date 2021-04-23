const app = Vue.createApp({
	data(){
		return {
			message:"hello world",
			email:"",
		}
	}
});
// v-model 默认在组件上使用modelValue 作为prop 和 update:modelValue作为事件
app.component('basic-input',{
	template:`<input type="text" :value="modelValue" @input="change">`,
	props:{
		modelValue:{
			type:[String,Number],
			required:true
		}
	},
	emits:['update:modelValue'],
	methods:{
		change(event){
			this.$emit('update:modelValue',event.target.value);
		}
	}
}).mount("#event");


const multiple_app = Vue.createApp({
	data(){
		return {
			firstName:"",
			lastName:""
		}
	}
});

multiple_app.component("username",{
	template:`
		<input type="text" :value="firstName" @input="change_firstname">
		<input type="text" :value="lastName" @input="change_lastname">
	`,
	props:{
		firstName:String,
		lastName:String
	},
	emits:['update:firstName','update:lastName'],
	methods:{
		change_firstname(event){
			this.$emit("update:firstName",event.target.value);
		},
		change_lastname(event){
			this.$emit("update:lastName",event.target.value);
		}
	}
}).mount("#multiple-event");



const modifer_app = Vue.createApp({
	data(){
		return {
			msg:"hello world"
		}
	}
});

modifer_app.component('modifer-input',{
	template:`<input type="text" :value="modelValue" @input="change_value">`,
	props:{
		modelValue:String,
		modelModifiers:{
			default:() => ({})
		}
	},
	emits:['update:modelValue'],
	methods:{
		change_value(event){
			let value = event.target.value;
			if(this.modelModifiers.capitalize){
				value = value.charAt(0).toUpperCase() + value.slice(1);
			}
			this.$emit("update:modelValue",value);
		}
	},
	created(){
		console.log('created:',this.modelModifiers);
	}
}).mount("#modifer-event");




const model_component = Vue.createApp({
	data(){
		return {
			searchText:""
		}
	},
	methods:{
		change_value(event){
			this.searchText = event.target.value.trim()
		}
	}
});


model_component.component('custom-input',{
	template:`<input type="text" :value="modelValue" @input="change_value">`,
	props:['modelValue'],
	emits:['update:modelValue'],
	methods:{
		change_value(event){
			this.$emit("update:modelValue",event.target.value.trim())
		}
	}
})

model_component.mount("#model-component")
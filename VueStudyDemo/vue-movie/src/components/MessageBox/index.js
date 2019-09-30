import Vue from "vue"
import MessageBox from "./index.vue"
export const messagebox = (function(){
	var defaults = {
		title:"",
		confirm:"",
		cancel:"",
		handleConfirm:null,
		handleCancel:null
	}
	return function(options){
		for(let attr in options){
			defaults[attr] = options[attr]
		}
		const myComponent = Vue.extend(MessageBox);
		const vm = new myComponent({
			el:document.createElement("div"),
			data:{
				title:defaults.title,
				confirm:defaults.confirm,
				cancel:defaults.cancel,
			},
			methods:{
				handleCancel(){
					defaults.handleCancel && defaults.handleCancel.call(this);
					document.body.removeChild(this.$el);
				},
				handleConfirm(){
					defaults.handleConfirm && defaults.handleConfirm.call(this);
					document.body.removeChild(this.$el);
				}
			}
		})
		document.body.appendChild(vm.$el);
	}
})()
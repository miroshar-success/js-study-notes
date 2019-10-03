import Vue from "vue";
import MessageBox from "./MessageBox";

export const messageBox = (function(){
	const defaults = {
		title:"",
		content:"",
		cancel:"",
		confirm:"",
		handleCancel:null,
		handleConfirm:null
	};
	let MyComponent = Vue.extend(MessageBox);
	return function(options){
		//  tips ： options为对象,需要用for...in遍历
		for(let attr in options){
			defaults[attr] = options[attr];
		}
		const vm = new MyComponent({
			el:document.createElement("div"),
			data(){
				return{
					title:defaults.title,
					content:defaults.content,
					cancel:defaults.cancel,
					confirm:defaults.confirm
				}
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
		});
		document.body.appendChild(vm.$el);
	}
})();
const templateSyntax = {
	data() {
		return {
			msg:"hello world",
			rawHtml:"<span style='color:red;'>Hello World</span>",
			dynamicId:2,
			isButtonDisabled:true,
			number:3,
			ok:true,
			message:"reverse-message",
			eventname:'dblclick'
		}
	},
	methods:{
		hello(){
			console.log("绑定的是点击事件");
		}
	}
}

Vue.createApp(templateSyntax).mount("#demo1")
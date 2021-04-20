Vue.createApp({
	data(){
		return {
			message:'hello world',
			msg:'11',
		}
	}
}).mount("#form-bind");

// select单选
Vue.createApp({
	data(){
		return {
			selected:"A"
		}
	}
}).mount("#v-model-select")

// select多选
Vue.createApp({
	data(){
		return {
			selected:[]
		}
	}
}).mount("#multiple-select");

// 异步筛选
Vue.createApp({
	data(){
		return {
			options:[
				{text:'One',value:"A"},
				{text:"Two",value:"B"},
				{text:"Three",value:"C"}
			],
			selected:""
		}
	}
}).mount("#v-model-select-dynamic");


Vue.createApp({
	data(){
		return {
			picked_sex:"男"
		}
	}
}).mount("#single-picked");

// 复选框
Vue.createApp({
	data(){
		return {
			selected_player:[]
		}
	}
}).mount("#multiple-picked")
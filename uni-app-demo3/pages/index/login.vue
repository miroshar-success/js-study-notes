<template>
	<view>
		<div ref="kyrie"></div>
		<text>{{title}}</text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				title:"这里是登陆页面"
			}
		},
		onLoad(res){
			console.log(res);
		},
		onReady(){
			console.log(this.$refs);
		},
		onShow(){
			console.log("页面显示了");
		},
		onHide(){
			console.log("页面隐藏了");
		},
		onBackPress(){
			console.log("页面返回了");
		}
	}
</script>

<style>
</style>

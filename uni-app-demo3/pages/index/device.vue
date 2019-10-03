<template>
	<div>
		<button @click="sub">提交订单</button>
		<button type="primary" @click="bindConfirm">确认</button>
		<button type="warn" @click="bindDownload">下载</button>
		<button type="warn" @click="changeTitle">修改标题</button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		mounted(){
			// 监听罗盘数据
			uni.onCompassChange(function(res){
				console.log(res.direction);
			})
		},
		methods:{
			sub(){
				uni.showModal({
					title:"提交订单",
					content:"确认提交订单吗?",
					cancelText:"取消",
					cancelColor:"red",
					confirmText:"确定",
					confirmColor:"blue",
					showCancel:false,
					success(res){
						console.log(res);
					}
				})
			},
			bindConfirm(){
				uni.showToast({
					title:"加载中",
					mask:true,	
					icon:"loading",	// success 显示加载图标, success:显示成功图标
					success(res){
						console.log(res);
						setTimeout(function(){
							console.log("加载成功");
							uni.hideToast();
						},500);
					}
				})
			},
			bindDownload(){
				uni.showLoading({
					title:"下载中",
					success(res){
						console.log(res);
					}
				});
				setTimeout(function(){
					uni.hideLoading();
					console.log("下载完成");
				},4000);
			},
			changeTitle(){
				uni.setNavigationBarTitle({
					title:"新的标题"
				}),
				uni.setNavigationBarColor({
					backgroundColor:"#000",
					frontColor:"#ffffff",
					animation:{
						duration:300,
						timingFunc:"linear"
					}
				})
			}
		}
	}
</script>

<style>
</style>

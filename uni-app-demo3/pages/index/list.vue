<template>
	<div>
		<text>我是text页面</text>
		<view>
			<img v-for="(item,index) in imgList" :key="index" :src="item.path" alt="" width="200">
		</view>
		<view>平台:{{systemInfo.platform}}</view>
		<view>设备宽度:{{systemInfo.screenWidth}}</view>
		<view>设备高度:{{systemInfo.screenHeight}}</view>
		<view>操作系统:{{systemInfo.system}}</view>
		<button type="primary" @click="photo">拍照</button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				imgList:[],
				systemInfo:{},
			}
		},
		mounted(){
			const _this = this;
			uni.getSystemInfo({
				success:function(data){
					console.log(data);
					_this.systemInfo = data;
				}
			}),
			uni.getNetworkType({
				success:function(res){
					console.log(res.networkType);
				}
			}),
			uni.onNetworkStatusChange(function(res){
				console.log(res.isConnected,res.networkType);
			})
		},
		methods:{
			photo(){
				let _this = this;
				uni.chooseImage({
					success:function(res){
						_this.imgList = res.tempFiles;
						console.log(res.tempFilePaths);
						let tempFilePaths = res.tempFilePaths;
						// 预览图片
// 						uni.previewImage({
// 							urls:res.tempFilePaths,
// 							indicator:"number",
// 							"loop":true,
// 							success(data){
// 								console.log(data);
// 							}
// 						})
// 						保存图片到本地
						uni.getImageInfo({
							src:res.tempFilePaths[0],
							success:function(data){
								console.log(data.width,data.height);
							}
						})
// 						uni.saveFile({
// 							tempFilePath:tempFilePaths[0],
// 							success(data){
// 								console.log(data);
// 							}
// 						})
					}
				});
			}
		}
	}
</script>

<style>
</style>

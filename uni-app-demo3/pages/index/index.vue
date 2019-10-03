<template>
	<view class="content">
		<view>
            <text class="title">{{title}}</text>
        </view>
		<navigator 
		url="/pages/index/login?a=1&b=2"
		>登陆</navigator>
		<button @click="check">点击</button>
		<button @click="bindRedirect" type="primary">重定向</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad(option) {
			console.log(option);
		},
		onTabItemTap(){
			console.log("tab触发");
		},
		onNavigationBarButtonTap(){
			console.log("点击了");
		},
		onShareAppMessage(){
			console.log("分享");
		},
		onNavigationBarSearchInputChanged(){
			console.log("对方正在输入...");
		},
		onNavigationBarSearchInputConfirmed(){
			console.log("开始搜索");
		},
		methods: {
			check(){
				uni.navigateTo({
					url:"/pages/index/login",
					animationDuration:"500"
				})
			},
			bindRedirect(){
				uni.redirectTo({
					url:"/pages/index/login"
				})
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>

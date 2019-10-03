<template>
	<view>
		<view class="bottom-player" @click="gotoDetail">
			<!-- 没有歌曲时默认显示的状态 -->
			<view class="detail" v-if="detail.songs">
				<view class="poster">
					<img :src="detail.songs[0].al.picUrl + '?param=80y80'">
				</view>
				<view class="info">
					<view class="name">{{detail.songs[0].name}}</view>
					<view class="singer">{{detail.songs[0].ar[0].name}}</view>
				</view>
				<!-- paused 为true时 暂时状态,显示播放按钮,为false时是播放状态,显示暂停按钮 -->
				<!-- 播放状态,显示的是暂停按钮，点击时暂停音乐 -->
				<text class="control-btn" @click.stop="pauseMusic" v-if="!paused">
					<i class="iconfont">&#xe613;</i>
				</text>
				<!-- 暂停状态,显示的是播放按钮，点击播放音乐 -->
				<text class="control-btn" @click.stop="playMusic" v-else>
					<i class="iconfont">&#xe61d;</i>
				</text>
			</view>
			<view class="state" v-else>
				<text class="text">网易云音乐，让生活充满音乐</text>
				<text class="play-btn">
					<i class="iconfont">&#xe61d;</i>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Vuex from "vuex"
	export default{
		data(){
			return{
				
			}
		},
		computed:{
			...Vuex.mapState(["detail","paused"])
		},
		methods:{
			...Vuex.mapMutations(["play","pause"]),
			playMusic(){
				this.play();
			},
			pauseMusic(){
				this.pause();
			},
			gotoDetail(){
				// 如果没有歌曲在播放，则不进行页面跳转
				if(this.detail.songs){
					uni.navigateTo({
						url:"/pages/detail/detail"
					})
				}
			}
		}
	}
</script>

<style scoped>
	.bottom-player,.bottom-player .state,.bottom-player .detail{
		height:109upx;
	}
	.bottom-player{
		position:fixed;
		bottom:0;
		z-index:10;
		width:100%;
		background-color:#ffffff;
		border-top:1px solid #e5e5e5; 
	}
	.bottom-player .text{
		color:#666;
		font-size:26upx;
	}
	.bottom-player .state{
		line-height:110upx;
		padding:0 40upx;
	}
	.bottom-player .play-btn{
		float:right;
	}
	.bottom-player .play-btn .iconfont{
		color:#e5e5e5;
		font-size:64upx;
	}
	.detail{
		padding:0 40upx 0 24upx;
	}
	.poster{
		padding:15upx 24upx 14upx 0;
	}
	.poster>img{
		width:80upx;
		height:80upx;
		border-radius:50%;
	}
	.detail>.info,.detail>.poster{
		float:left;
	}
	.detail>.info{
		width:500upx;
		padding:20upx 0;
	}
	.detail .info>.name{
		color:#000000;
		font-size:28upx;
	}
	.detail .info>.singer{
		color:#333;
		font-size:24upx;
	}
	.info>.singer,.info .name{
		width:100%;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.detail .control-btn{
		line-height:110upx;
	}
	.detail .control-btn .iconfont{
		float:right;
		color:rgb(194,12,12);
		font-size:64upx;
	}
</style>

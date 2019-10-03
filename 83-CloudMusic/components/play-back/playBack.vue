<template>
	<view>
		<!-- 在什么时候获取歌曲详情页? 播放的时候 
		 如果没有详情，则不显示下面的播放详情
		 -->
		<view class="page-body" v-if="detail.songs" @click="gotoDetail">
			<view class="img">
				<image :src="detail.songs[0].al.picUrl + '?param=100y100'" class="poster"></image>
			</view>
			<view class="song-info">
				<p class="song-name">{{detail.songs[0].name}}</p>
				<span class="singer-name" v-for="(item,index) in detail.songs[0].ar" :key="index">
					<span>{{item.name + " "}}</span>
				</span>
			</view>
			<!-- 如果是暂停状态，则显示播放按钮,点击时播放音乐,如果是播放状态,则显示暂停按钮，点击时暂停音乐 -->
			<view class="playState">
				<view v-show="paused">
					<!-- 阻止事件冒泡，防止点击播放或暂停按钮时 也触发跳转到详情页面 -->
					<text class="iconfont" @click.stop="playMusic">&#xe61d;</text>
				</view>
				<view v-show="!paused">
					<text class="iconfont" @click.stop="pauseMusic">&#xe769;</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vuex from "vuex"
	export default{
		computed:{
			...Vuex.mapState(["detail","paused","audio"])
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
				uni.navigateTo({
					url:"/pages/detail/detail"
				})
			}
		}
	}
</script>

<style class="scoped">
	.page-body{
		position:fixed;
		z-index:100;
		bottom:0;
		height:109upx;
		width:100%;
		background-color:rgb(250,250,250);
		border-top:1upx solid #e5e5e5;
	}
	.page-body .img{
		padding:16upx 24upx;
		width: 80upx;
		height: 80upx;
	}
	.page-body .img>image{
		display:block;
		width:100%;
		height:100%;
		border-radius:50%;
		animation:rotate 12s linear infinite;
	}
	.page-body .img,.page-body .song-info,.playState{
		float:left;
	}
	.page-body .song-name{
		color:#050505;
		font-size:28upx;
		line-height:26upx;
	}
	.page-body .singer-name{
		padding-top:8upx;
		color:#666666;
		font-size:24upx;
		line-height:22upx;
	}
	.song-info{
		padding-top:26upx;
		width:430upx;
		height:110upx;
	}
	.playState{
		transform:translateY(20upx);
		width: 65upx;
		height:65upx;
		z-index:100;
	}
	.playState .iconfont{
		font-size:65upx;
		line-height:65upx;
		color:rgb(194,12,12);
	}
</style>

<template>
	<view class="content">
		<view class="banner">
			<swiper indicator-dots
				indicator-color="#f1f1f1"
				indicator-active-color="#ff3a3a" class="swiper-wrapper"
				autoplay
				interval="3000"
				circular
				>
				<swiper-item v-for="(item,index) in banners" :key="index" class="swiper-item">
					<image :src="item.imageUrl" class="banner-img"></image>
				</swiper-item>
			</swiper>
		</view>
		<div class="nav">
			<view class="nav-item">
				<view class="title recommend">
					<i class="iconfont">&#xe656;</i>
				</view>
				<text class="text">每日推荐</text>
			</view>
			<view class="nav-item">
				<view class="title sheet">
					<i class="iconfont">&#xe78a;</i>
				</view>
				<text class="text">歌单</text>
			</view>
			<view class="nav-item">
				<view class="title rank">
					<i class="iconfont">&#xe6c5;</i>
				</view>
				<text class="text">排行榜</text>
			</view>
			<view class="nav-item">
				<view class="title radio">
					<i class="iconfont">&#xe65e;</i>
				</view>
				<text class="text">电台</text>
			</view>
			<view class="nav-item">
				<view class="title live">
					<i class="iconfont">&#xe911;</i>
				</view>
				<text class="text">直播</text>
			</view>
		</div>
		<view class="recommend-sheets-box">
			<view class="recommend-sheets">
				<text class="recommend-title uni-title">推荐歌单</text>
				<view class="square-button">
					<text class="square">歌单广场</text>
				</view>
			</view>
		</view>
		<view class="recommend-songs">
			<view class="recommend-songs-card" v-for="(item,index) in recommendSongs" :key="index">
				<image :src="item.picUrl" alt=""></image>
				<view class="info">
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<BottomPlayback/>
	</view>
</template>

<script>
	import BottomPlayback from "@/components/BottomPlayback/BottomPlayback"
	export default {
		data() {
			return {
				// 首页banner
				banners:[],
				recommendSongs:[]
			}
		},
		created(){
			// 获取首页banner图片
			uni.request({
				url:"https://api.wulv5.com/music/banner",
				data:{
					type:2
				},
				success:(res) => {
					this.banners = res.data.banners;
				}
			}),
			// 获取歌单推荐
			uni.request({
				url:"https://api.wulv5.com/music/personalized",
				success:(res) => {
					this.recommendSongs = res.data.result;
				}
			})
		},
		// 点击搜索按钮，跳转到搜索页
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:"/pages/search/search"
			})
		},
		components:{
			BottomPlayback
		}
	}
</script>

<style scoped>
	.banner,.recommend-sheets{
		padding:0 32upx;
	}
	.swiper-wrapper,.swiper-wrapper>.swiper-item,.banner .banner-img{
		width:686upx;
	}
	.banner,.swiper-wrapper,.swiper-item,.banner-img{
		height:266upx;
		border-radius:10upx;
	}
	.swiper-wrapper{
		overflow:hidden;
	}
	.nav-item>.title{
		width: 92upx;
		height:92upx;
		border-radius:50%;
		background-color:#ff372a;
		text-align:center;
		line-height:92upx;
		color:#ffffff;
	}
	.nav{
		display:flex;
		padding:44upx 32upx;
		justify-content:space-between;
		border-bottom:1px solid #e6e6e6;
	}
	.nav>.nav-item{
		text-align:center;
	}
	.nav .text{
		font-size:24upx;
	}
	.nav .title>.iconfont{
		font-size:42upx;
	}
	.recommend-sheets-box{
		padding:40upx 0 0 0;
		height:50upx;
	}
	.recommend-sheets .square-button{
		float:right;
		height:48upx;
		width:148upx;
		border-radius:24upx;
		border:1upx solid #e6e6e6;
		font-size:24upx;
		text-align:center;
		line-height:48upx;
	}
	.recommend-songs{
		padding:0 32upx;
		display:flex;
		flex-flow:row wrap;
		justify-content:space-between;
	}
	.recommend-songs .recommend-songs-card{
		margin-top:40upx;
		width:216upx;
		font-size:24upx;
	}
	.recommend-songs image{
		width:216upx;
		height:216upx;
		border-radius:8upx;
	}
	.recommend-songs-card .info{
		padding-top:16upx;
		height:60upx;
		overflow:hidden;
	}
</style>

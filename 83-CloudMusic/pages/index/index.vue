<template>
	<view>
		<!-- banner -->
		<view class="banner">
			<swiper
			indicator-dots
			indicator-color="#959595"
			indicator-active-color="#ff3a3a"
			autoplay
			interval="2500"
			circular
			>
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<view class="img-item">
						<img :src="item.imageUrl" alt="">
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 推荐歌单 -->
		<view class="recommend-title">
			<text class="uni-title">推荐歌单</text>
			<text class="square">歌单广场</text>
		</view>
		<view class="uni-product-list">
			<view class="uni-product" v-for="(item,index) in recommendSheet" :key="index">
				<view class="image-view">
					<image :src="item.picUrl"></image>
					<view class="uni-product-title">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 底部播放栏 -->
		<playBack></playBack>
	</view>
</template>

<script>
	//  首页  搜索 详情页 暂停/播放  播放模式 / 快进 下载  收藏
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import playBack from "@/components/play-back/playBack"
	export default {
		data() {
			return {
				bannerList:[],
				recommendSheet:[]
			}
		},
		onLoad() {
			const _this = this;
			uni.request({
				"url":"https://api.wulv5.com/music/banner",
				"dataType":"json",
				"success":function(res){
					_this.bannerList = res.data.banners;
				}
			});
			uni.request({
				url:"https://api.wulv5.com/music/personalized",
				dataType:"json",
				success(res){
					_this.recommendSheet = res.data.result;
				}
			})
		},
		onNavigationBarSearchInputClicked(){
			this.search();
		},
		methods: {
			search(){
				uni.navigateTo({
					url:"/pages/search/search"
				})
			}
		},
		components:{
			uniList,
			uniListItem,
			playBack
		}
	}
</script>

<style>
	.uni-page-head-search{
		width: 100upx;
		height:72upx;
	}
	swiper{
		margin-top:40upx;
		width: 686upx;
		height:265upx;
		overflow:hidden;
	}
	swiper-item,swiper .img-item>img{
		width:100%;
		height:100%;
		border-radius:10px;
	}
	.banner{
		padding:0 32upx;
	}
	.uni-product-list image{
		width: 216upx;
		height:216upx;
		border-radius:10upx;
	}
	.uni-product,.uni-product .image-view,.uni-product-title{
		width:216upx;
	}
	.uni-product .uni-product-title{
		font-size:22upx;
	}
	.recommend-title{
		height:52upx;
		padding:40upx 32upx 30upx 0;
	}
	.recommend-title .square{
		float:right;
		padding:6upx 20upx;
		font-size:24upx;
		border-radius:30upx;
		border:2upx solid #e6e6e6;
	}
</style>

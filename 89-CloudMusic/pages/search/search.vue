<template>
	<view>
		<view class="search-history">
			<text class="uni-title">搜索历史</text>
			<text class="delete" @click.stop="deleteHistory">
				<i class="iconfont">&#xe614;</i>
			</text>
		</view>
		<view class="search-history-list">
			<uni-tag class="search-history-item" v-for="(item,index) in searchHistory" :key="index"
			:text="item" type="error" circle="true" @click="searchSongs(item)"
			></uni-tag>
		</view>
		<view class="hot-search">
			<text class="uni-title">热门搜索</text>
		</view>
		<view class="hot-search-list">
			<uni-tag class="hot-search-item"
			v-for="(item,index) in hots" :key="index"
			:text="item.first" circle="true" type="success"
			@click="searchSongs(item.first)"
			></uni-tag>
		</view>
		<view class="search-box">
			<uni-list>
				<uni-list-item 
				v-for="(item,index) in songs" :key="index"
				:title="item.name"
				show-arrow="false"
				@click="playMusic(item)"
				></uni-list-item>
			</uni-list>
		</view>
		<BottomPlayback></BottomPlayback>
	</view>
</template>
<script>
	import uniTag from "@/components/uni-tag/uni-tag"
	import uniList from "@/components/uni-list/uni-list"
	import uniListItem from "@/components/uni-list-item/uni-list-item"
	import BottomPlayback from "@/components/BottomPlayback/BottomPlayback"
	import Vuex from "vuex"
	export default{
		data(){
			return{
				// 热门搜索
				hots:[],
				// 搜索历史记录
				searchHistory:[],
				// 搜索歌曲的数据
				songs:[]
			}
		},
		created(){
			uni.request({
				url:"https://api.wulv5.com/music/search/hot",
				success:(res) => {
					this.hots = res.data.result.hots;
				}
			})
		},
		onNavigationBarSearchInputConfirmed(e){
			const keywords = e.text;
			// 点击搜索按钮时，传入参数，调用封装的搜索歌曲函数
			if(keywords.length){
				this.searchSongs(keywords);
			}
			/*
			将搜索的关键词传入数组显示在搜索历史下方 
			1. 后输入的要显示在前面
			2. 前后输入的不能相同
			3. 如果遇到之前搜过的歌曲，先利用indexOf得出该歌曲的下标，然后用splice删除该项，再重新添加到首位
			*/
			if(this.searchHistory.indexOf(keywords) === -1){
				this.searchHistory.unshift(keywords);
			}else{
				const index = this.searchHistory.indexOf(keywords);
				this.searchHistory.splice(index,1);
				this.searchHistory.unshift(keywords);
			}
		},
		computed:{
			...Vuex.mapState(["detail"]),
		},
		// 将搜索歌曲封装成一个函数
		methods:{
			...Vuex.mapActions(["getUrl","checkUrl"]),
			searchSongs(keywords){
				uni.showLoading({
					title:"搜索中"
				}),
				uni.request({
					url:"https://api.wulv5.com/music/search?keywords=" + keywords,
					success:(res) => {
						this.songs = res.data.result.songs;
						uni.hideLoading();
					}
				})
			},
			// 点击删除历史记录
			deleteHistory(){
				uni.showModal({
					title:"确认清空全部历史记录?",
					cancelColor:"#007aff",
					confirmText:"确认",
					success:(res) => {
						if(res.confirm){
							this.searchHistory.splice(0,this.searchHistory.length);
						}
					}
				})
			},
			playMusic(item){
				this.$store.dispatch("checkUrl",item).then( res => {
					const state = res.success;
					switch(state){
						case true:
						this.$store.dispatch("getUrl",item);
						break;
						case false:
						uni.showToast({
							title:"糟糕,歌曲不可用",
							image:"../../static/error.png"
						});
						break;
					}
				})
			}
		},
		components:{
			uniTag,
			uniList,
			uniListItem,
			BottomPlayback
		}
	}
</script>

<style scoped>
	.search-history{
		padding:30upx 32upx;
		height:36upx;
		line-height:36upx;
	}
	.search-history .delete{
		float:right;
	}
	.search-history .delete .iconfont{
		font-size:40upx;
		color:#c1c1c1;
	}
	.hot-search-list,.hot-search,.search-history-list{
		padding:0 32upx;
	}
	.hot-search-list>.hot-search-item,
	.search-history-list>.search-history-item
	{
		margin:0 20upx 20upx 0;
	}
	.hot-search{
		margin:50upx 0 30upx;
	}
</style>

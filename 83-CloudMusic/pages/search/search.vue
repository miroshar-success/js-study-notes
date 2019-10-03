<template>
	<view>
		<view class="uni-title">热门搜索</view>
		<view class="uni-tag-view">
			<uni-tag 
				v-for="(item,index) in hotSong" 
				:key="index" 
				class="hot-label"
				@click="searchHots(item)"
				:text="item.first" circle="true" type="success">
			</uni-tag>
		</view>
		<view class="history-manager" v-show="flag">
			<text class="uni-title">搜索历史</text>
			<text class="iconfont remove-icon" @click="removeHistory">&#xe614;</text>
		</view>
		<!-- 遍历搜索的历史记录  注意：如果模板有两个v-for遍历，key值都为index会导致属性冲突报错，修改一个key值即可解决，-->
		<view class="uni-tag-view">
			<uni-tag 
			v-for="(item,index) in searchHistory" 
			:key="'info' + index" 
			class="uni-tag-view"
			@click="historySearch(item)"
			:text="item" circle="true" type="error"></uni-tag>
		</view>
		<!-- 将搜索的数据展示在页面上 -->
		<view class="search-content">
			<uni-list>
				<uni-list-item 
				v-for="(item,index) in searchList" :key="'song'+index"
				:title="item.name"
				show-arrow="false"
				@click="getSource(item)"
				>
				</uni-list-item>
			</uni-list>
		</view>
		<playBack></playBack>
	</view>
</template>

<script>
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import Vuex from "vuex"
	import playBack from "@/components/play-back/playBack"
	export default{
		data(){
			return{
				// 热门歌曲
				hotSong:[],
				// 搜索历史,如果搜索的历史一样，则不需要再次添加
				searchHistory:[],
				// 搜索的歌曲列表
				searchList:[],
				flag:false
			}
		},
		onLoad(){
			const _this = this;
			uni.request({
				url:"https://api.wulv5.com/music/search/hot",
				success(res){
					_this.hotSong = res.data.result.hots;
				}
			});
		},
		// 如果有历史纪录，显示搜索的历史记录，否则就不显示，此时需要在updated钩子函数处监听
		updated(){
			if(this.searchHistory.length){
				this.flag = true;
			}else{
				this.flag = false;
			}
		},
		methods:{
			// 定义一个通用的搜索方法,在热门搜索和自然搜索都可以使用，传入一个参数
			...Vuex.mapActions(["getSource"]),
			searchSong(data){
				const _this = this;
				uni.request({
					url:"https://api.wulv5.com/music/search?keywords=" + data,
					dataType:"json",
					success:function(res){
						_this.searchList = res.data.result.songs;
					}
				})
			},
			// 清空历史记录
			removeHistory(){
				const _this = this;
				uni.showModal({
					title:"确认清空全部历史记录吗?",
					success(res){
						console.log(res);
						if(res.confirm && _this.searchHistory.length){
							_this.searchHistory.splice(0,_this.searchHistory.length);
						}
					}
				})
			},
			// 点击热门歌曲的时候，也可以搜索,直接调用方法就可以,tips: 注意传递的参数
			searchHots(text){
				this.searchSong(text.first);
				this.searchHistory.unshift(text.first);
			},
			// 点击搜索记录的时候，也可以搜索，直接调用方法
			historySearch(text){
				this.searchSong(text);
			}
		},
		components:{
			uniTag,
			uniList,
			uniListItem,
			playBack
		},
		// 搜索获取歌曲
		onNavigationBarSearchInputConfirmed(event){
			// 获取搜索框里的内容，发送请求 
			let self = this;
			let keyword = event.text;
			// 1. 搜索过的所有内容添加进搜索历史中, 并将刚刚搜索的放在最前面，之前搜索的放在最后面
			// 2. 如果搜索重复的内容,则不添加 
			if(!this.searchHistory.includes(keyword)){
				this.searchHistory.unshift(keyword);
			}
			this.searchSong(keyword);
		},
		onNavigationBarSearchInputChanged(event){
			if(event.text === "" || (event.text.length !== 0)){
				this.flag = false;
			}
		}
	}
</script>

<style scoped>
	.uni-tag-view{
		padding:0 32upx;
	}
	.uni-tag-view .uni-tag{
		display:inline-block;
		margin:0 10upx 10upx 0;
	}
	.uni-title{
		margin:10upx 0;
	}
	.history-manager{
		margin-bottom:20upx;
		padding:70upx 32upx 0 0;
	}
	.remove-icon{
		color:rgb(178,178,178);
		font-size:40upx;
		float:right;
	}
	.uni-list-cell{
		font-size:14upx;
	}
</style>

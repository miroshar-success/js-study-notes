<template>
	<view>
		<view class="list">
			<uni-list>
				<uni-list-item 
					title="本地音乐"
					show-extra-icon="true"
				>
				</uni-list-item>
				<uni-list-item 
					title="最近播放"
					show-extra-icon="true"
					@click="gotoHistory"
				></uni-list-item>
				<uni-list-item 
					title="我的电台"
					show-extra-icon="true"
				></uni-list-item>
				<uni-list-item 
					title="我的收藏"
					show-extra-icon="true"
				></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import Vuex from "vuex"
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default{
		data(){
			return{
				
			}
		},
		components:{
			uniList,
			uniListItem,
			uniIcon
		},
		methods:{
			gotoHistory(){
				uni.navigateTo({
					url:"/pages/history/history"
				})
			}
		}
	}
</script>

<style scoped>
	
</style>

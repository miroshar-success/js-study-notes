<template>
	<view>
		<view>
			<uni-list>
				<uni-list-item
				v-for="(item,index) in history"
				:key="index"
				:title="item.detail.songs[0].name"
				show-arrow="false"
				@click="getSource(item.detail.songs[0])"
				></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import Vuex from "vuex"
	import uniList from "@/components/uni-list/uni-list"
	import uniListItem from "@/components/uni-list-item/uni-list-item"
	export default{
		data(){
			return{
				
			}
		},
		computed:{
			...Vuex.mapState(["history"])
		},
		components:{
			uniList,
			uniListItem
		},
		methods:{
			...Vuex.mapActions(["getSource"])
		}
	}
</script>

<style scoped>

</style>

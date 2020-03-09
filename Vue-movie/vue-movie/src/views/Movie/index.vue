<template>
	<div id="main">
		<Head title="电影演出赛事"/>
		<TopNav/>
		<div class="content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<TabBar/>
		<router-view name="detail"></router-view>
	</div>
</template>
<script>
	import TabBar from "@/common/TabBar"
	import Head from "@/common/Head"
	import TopNav from "@/common/TopNav"
	export default{
		name:"movie",
		components:{
			TabBar,
			Head,
			TopNav
		}
	}
</script>

<style scoped>
	.content{
		display:flex;
		flex-direction:column;
		overflow:auto;
		flex:1;
	}
</style>

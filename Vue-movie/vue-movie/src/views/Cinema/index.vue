<template>
	<div id="main">
		<Head title="影院"/>
		<div class="content">
			<CinemaList/>
		</div>
		<TabBar/>
	</div>
</template>

<script>
	import TabBar from "@/components/TabBar"
	import Head from "@/components/Head"
	import CinemaList from "@/components/CinemaList"
	export default{
		name:"cinema",
		data(){
			return{
				movieList:[]
			}
		},
		components:{
			TabBar,
			Head,
			CinemaList
		}
	}
</script>

<style scoped>
	.content{
		position:relative;
		flex:1;
		overflow:hidden;
	}
</style>

<template>
	<div id="main">
		<Header></Header>
		<div class="content">
			<CinemaList/>
		</div>
		<TabBar></TabBar>
	</div>
</template>

<script>
	import Header from "@/components/Header"
	import TabBar from "@/components/TabBar"
	import CinemaList from "@/components/CinemaList"
	export default{
		name:"cinema",
		components:{TabBar,Header,CinemaList}
	}
</script>

<style scoped lang="scss">
	#main{
		display:flex;
		flex-direction:column;
		height:100%;
		.content{
			position:relative;
			flex:1;
			background-color:#f6f6f6;
		}
	}
</style>

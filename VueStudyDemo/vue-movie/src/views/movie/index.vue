<template>
	<div id="main">
		<Header/>
		<TopNav/>
		<div class="content">
			<keep-alive>
				<router-view/>
			</keep-alive>
		</div>
		<TabBar/>
		<router-view name="detail"></router-view>
	</div>
</template>

<script>
	import Header from "@/components/Header"
	import TabBar from "@/components/TabBar"
	import TopNav from "@/components/TopNav"
	export default{
		name:"movie",
		components:{TabBar,Header,TopNav}
	}
</script>

<style lang="scss" scoped>
#main{
	position:relative;
	display:flex;
	flex-direction:column;
	width:100%;
	height:100%;
	.content{
		position:relative;
		flex:1;
		background-color:rgb(255,255,255);
	}
}
</style>

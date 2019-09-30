<template>
	<div>
		<Header></Header>
		<p>我的</p>
		<TabBar></TabBar>
	</div>
</template>

<script>
	import Header from "@/components/Header"
	import TabBar from "@/components/TabBar"
	export default{
		name:"mine",
		components:{TabBar,Header}
	}
</script>

<style scoped lang="scss">
	
</style>

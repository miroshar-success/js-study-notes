<template>
	<div class="mine_body">
		<Head title="我的"/>
		<TabBar/>
	</div>
</template>

<script>
	import TabBar from "@/common/TabBar"
	import Head from "@/common/Head"
	export default{
		name:"mine",
		data(){
			return{
				
			}
		},
		components:{
			TabBar,
			Head
		}
	}
</script>

<style scoped>
	.mine_body{
		width:100%;
	}
</style>

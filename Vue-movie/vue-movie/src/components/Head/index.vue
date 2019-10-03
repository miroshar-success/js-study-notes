<template>
	<div class="header">
		<slot></slot>
		<h3 class="title">{{title}}</h3>
	</div>
</template>

<script>
	export default {
		name:"head-title",
		data(){
			return{
				
			}
		},
		props:{
			title:{
				type:String,
				default:"电影"
			}
		}
	}
</script>

<style scoped>
	.header{
		position:relative;
		width:100%;
		height:0.96rem;
		background-color:#1f2129;
	}
	.header .title{
		text-align:center;
		line-height:0.96rem;
		font-size:0.28rem;
		color:#fff;
		font-weight:bold;
	}
</style>

<template>
	<header>
		<slot></slot>
		<span>{{$route.meta.title}}</span>
	</header>
</template>

<script>
	export default{
		name:"Header",
	}
</script>

<style lang="scss" scoped>
	header{
		position:relative;
		width:100%;
		height:0.96rem;
		background-color:#1f2129;
		color:#fff;
		font-size:0.3rem;
		font-weight:bold;
		text-align:center;
		line-height:0.96rem;
	}
</style>

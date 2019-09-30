<template>
  <div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
  </div>
</template>

<script>
	export default{
		name:"App",
	}
</script>

<style lang="scss">
	#app{
		overflow-x:hidden;
	}
	.city-body,.movie-body,.coming-list-body,.search-body{
		overflow:auto;
		position:absolute;
		top:0;
		left:0;
		bottom:0.96rem;
		width:100%;
		box-sizing:border-box;
		background-color:rgb(246,246,246);
	}
</style>

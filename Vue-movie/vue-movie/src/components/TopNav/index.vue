<template>
	<div class="top_nav">
		<router-link class="switch_city" to="/movie/city" tag="div">
			<p to="/movie/city" class="city">{{this.$store.state.nm}}</p>
			<i class="iconfont icon-arrowdown-copy icon-arrowndown"></i>
		</router-link>
		<div class="hot_switch">
			<router-link class="hot_item" tag="div" to="/movie/onnow">正在上映</router-link>
			<router-link class="hot_item" tag="div" to="/movie/upcoming">即将上映</router-link>
		</div>
		<router-link class="search_btn" tag="div" to="/movie/search">
			<i class="iconfont icon-search"></i>
		</router-link>
	</div>
</template>

<script>
	export default{
		name:"top_nav",
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped>
	.top_nav{
		width:100%;
		height:0.88rem;
		background-color:#fff;
		justify-content:space-between;
		align-items:center;
	}
	.top_nav .switch_city{
		transform:translateX(0.3rem);
	}
	.top_nav .city{
		height:0.84rem;
		line-height:0.84rem;
		font-size:.24rem;
		color:#626262;
		width:100%;
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
	}
	.top_nav,.top_nav .switch_city,.top_nav .search_btn{
		display:flex;
		align-items:center;
	}
	.top_nav .hot_switch{
		width:2.96rem;
		display:flex;
		justify-content:space-between;
	}
	.top_nav .hot_item{
		width:1.12rem;
		height:0.84rem;
		line-height:0.84rem;
		color:#5b5b5b;
		font-size:.26rem;
		font-weight:bold;
	}
	.top_nav .hot_item,.top_nav .search_btn,.top_nav .switch_city{
		border-bottom:0.04rem solid transparent;
	}
	.top_nav .hot_item.active,.top_nav .search_btn.active,.top_nav .switch_city.active{
		border-bottom:0.04rem solid #f14228;
		color:#f14528;
	}
	.search_btn{
		width:0.84rem;
		height:0.84rem;
		justify-content:center;
		align-items:center;
		border-left:0.01rem solid #e9e9e9;
	}
	.search_btn .iconfont{
		font-size:0.36rem;
		color:#e55b6b;
	}
	.top_nav .icon-arrowndown{
		font-size:0.36rem;
	}
</style>

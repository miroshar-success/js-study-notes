<template>
	<div class="top-nav">
		<router-link to="/movie/citylist" tag="div">
			<p class="switch-city">
				<span class="current-city">{{this.$store.state.city}}</span>
				<i class="iconfont icon-arrowdown-copy"></i>
			</p>
		</router-link>
		<router-link to="/movie/playing" tag="div">
			<p class="playing">正在热映</p>
		</router-link>
		<router-link to="/movie/upcoming" tag="div">
			<p class="coming">即将上映</p>
		</router-link>
		<router-link to="/movie/search" tag="div" class="search">
			<i class="iconfont icon-search"></i>
		</router-link>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.top-nav{
		padding-left:0.3rem;
		background-color:#fff;
		height:0.88rem;
		border-bottom:1px solid #d1dfe0;
		display:flex;
		justify-content:space-between;
		.switch-city{
			display:flex;
			align-items:center;
		}
		.current-city{
			display:inline-block;
			text-align:center;
			max-width:0.8rem;
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
		}
		.switch-city,.playing,.coming,.search{
			height:0.84rem;
			line-height:0.84rem;
			border-bottom:0.04rem solid transparent;
			color:rgb(106,106,106);
		}
		.playing,.coming{
			font-weight:bold;
			width:1.16rem;
			text-align:center;
		}
		.search{
			width:0.88rem;
			border-left:1px solid #e9e9e9;
			i.iconfont{
				display:block;
				text-align:center;
				line-height:0.88rem;
				color:rgb(224,65,60);
				font-size:0.4rem;
			}
		}
		.active>.playing,.active>.coming,
		.active>.switch-city,.active.search{
			color:rgb(237,71,42);
			border-bottom:0.04rem solid rgb(237,71,42);
		}
	}
</style>

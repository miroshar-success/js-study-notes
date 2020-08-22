<template>
	<div class="footer">
		<ul class="tabbar">
			<router-link tag="li" to="/movie">
				<i class="iconfont icon-dianying"></i>
				<p class="text">电影</p>
			</router-link>
			<router-link tag="li" to="/cinema">
				<i class="iconfont icon-yingyuanxinxizhoubiansheshi"></i>
				<p class="text">影院</p>
			</router-link>
			<router-link tag="li" to="/mine">
				<i class="iconfont icon-xiazai4"></i>
				<p class="text">我的</p>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default{
		name:"tabbar",
	}
</script>

<style scoped>
	.footer{
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		height:0.96rem;
		background-color:#fff;
		border-top:0.01rem solid #b6b6b6;
	}
	.tabbar{
		display:flex;
		height:100%;
		align-items:center;
	}
	.tabbar li{
		flex:1;
		text-align:center;
		font-size:0.22rem;
	}
	.tabbar li .iconfont{
		font-size:0.4rem;
	}
	.tabbar li .text{
		padding-top:0.08rem;
	}
	.tabbar li.active{
		color:#ab5464;
	}
	
</style>

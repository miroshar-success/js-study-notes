<template>
	<div class="footer">
		<ul class="tabbar">
			<router-link to="/movie" tag="li">
				<i class="iconfont icon-dianying"></i>
				<span class="tab-text">电影</span>
			</router-link>
			<router-link to="/cinema" tag="li">
				<i class="iconfont icon-yingyuanxinxizhoubiansheshi"></i>
				<span class="tab-text">影院</span>
			</router-link>
			<router-link to="/mine" tag="li">
				<i class="iconfont icon-xiazai4"></i>
				<span class="tab-text">我的</span>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default{
		name:"TabBar"
	}
</script>

<style lang="scss" scoped>
	.footer{
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		height:0.96rem;
		background-color:#fff;
		border-top:1px solid #b5b5b5;
		.tabbar{
			display:flex;
			width:100%;
			padding-top:0.1rem;
			i.iconfont{
				font-size:0.4rem;
			}
			li{
				flex:1;
				height:100%;
				text-align:center;
				color:#6c6c6c;
				font-size:0.22rem;
				font-weight:bold;
			}
			.tab-text{
				display:block;
				color:#6c6c6c;
				line-height:0.4rem;
			}
			li.active,li.active .tab-text{
				color:#df4962;
			}
		}
	}
</style>

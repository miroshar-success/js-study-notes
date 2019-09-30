<template>
  <div id="app">
		<v-header></v-header>
		<div class="tab">
			<router-link tag="div" class="tab-item" to="/goods">商品</router-link>
			<router-link tag="div" class="tab-item" to="/ratings">评价</router-link>
			<router-link tag="div" class="tab-item" to="seller">商家</router-link>
		</div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<Cart/>
  </div>
</template>

<script>
	import Header from "@/components/Header"
	import Cart from "@/components/Cart"
	export default{
		name:"App",
		components:{
			"v-header":Header,
			Cart
		}
	}
</script>


<style lang="scss">
	@import "@/common/scss/mixin.scss";
	#app{
		.tab{
			display:flex;
			width:100%;
			height:40px;
			line-height:40px;
			@include border-bottom-1px(rgba(7,17,27,0.1));
			.tab-item{
				flex:1;
				font-size:14px;
				color:rgb(77,85,93);
				text-align:center;
			}
			.tab-item.active{
				color:rgb(240,20,20);
			}
		}
	}
</style>

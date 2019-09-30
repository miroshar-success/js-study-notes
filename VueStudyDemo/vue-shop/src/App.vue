<template>
  <div id="app">
		<header>
			<router-link 
				to="/list"
				class="header-title">电商网站实例</router-link>
			<div class="header-menu">
				<router-link
					to="/cart"
					class="header-menu-cart"
				>
					购物车
					<span v-if="cartList.length">{{productNumber}}</span>
				</router-link>
			</div>
		</header>
		<router-view></router-view>
  </div>
</template>

<script>
	export default{
		name:"app",
		data(){
			return{
			}
		},
		computed:{
			cartList(){
				return this.$store.state.cartList
			},
			productNumber(){
				return this.$store.getters.getProductCount;
			}
		}
	}
</script>

<style lang="scss">
	html,body,ul,ol,p,button,input{
		padding: 0;
		margin: 0;
	}
	ul,ol{
		list-style:none;
	}
	a{
		text-decoration:none;
	}
	button{
		border:0;
		outline:none;
	}
	#app{
		margin:10px auto 0;
		width:1200px;
		min-height:800px;
		background-color:#f8f8f9;
	}
	header{
		height:48px;
		line-height:48px;
		background:rgba(0,0,0,.8);
		a{
			color:#ffffff;
			margin-right:32px;
		}
		.header-menu{
			float:right;
		}
		.header-title{
			padding:0 32px;
			float:left;
		}
		.header-menu-cart span{
			display:inline-block;
			width:20px;
			height:20px;
			line-height:20px;
			text-align:center;
			border-radius:50%;
			background-color:#ff5500;
			color:#fff;
			font-size:12px;
		}
	}
</style>

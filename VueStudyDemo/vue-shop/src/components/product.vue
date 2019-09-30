<template>
	<div class="product">
		<router-link
			:to="'/product/'+info.id"
			class="product-main"
		>
			<img :src="info.image" alt="">
			<h4>{{info.name}}</h4>
			<div class="product-cost">{{info.cost}}</div>
			<div class="product-add-cart"
				@click.prevent="handleCart"
			>
				加入购物车
			</div>
		</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		name:"product",
		props:{
			info:Object
		},
		methods:{
			handleCart(){
				this.$store.commit("addCart",this.info.id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product{
		width:300px;
	}
	.product-main{
		position:relative;
		display:block;
		margin:16px;
		padding:16px;
		border:1px solid #dddee1;
		border-radius:6px;
		overflow:hidden;
		background-color:#fff;
		text-align:center;
		img{
			width:100%;
			height:100%;
		}
		h4{
			color:#222;
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
		}
		&:hover h4{
			color:#0070c9;
		}
		&:hover .product-add-cart{
			display:inline-block;
		}
		.product-color{
			height:30px;
			display:flex;
			justify-content:center;
			align-items:center;
		}
		.product-color-item{
			display:inline-block;
			width:16px;
			height:16px;
			border:1px solid #dddee1;
			border-radius:50%;
			vertical-align:-3px;
			margin:0 8px;
		}
		.product-cost{
			color:#de4037;
			margin-top:6px;
		}
		.product-cost:before{
			content:"$"
		}
		.product-add-cart{
			display:none;
			padding:4px 8px;
			background:#2d8cf0;
			color:#fff;
			font-size:12px;
			border-radius:3px;
			cursor:pointer;
			position:absolute;
			top:5px;
			right:5px;
		}
	}
</style>

<template>
	<div v-if="product">
		<div class="product">
			<div class="product-image">
				<img :src="product.image" :alt="product.name">
			</div>
			<div class="product-info">
				<h1 class="product-name">{{product.name}}</h1>
				<div class="product-cost">RMB:{{product.cost}}</div>
				<div class="product-add-cart"
					@click="handleAddToCart"
				>加入购物车</div>
			</div>
		</div>
	</div>
</template>

<script>
	import product_data from "../../product.js"
	export default{
		name:"detail",
		data(){
			return{
				id:this.$route.params.id,
				product:null
			}
		},
		// 数组的find方法用于找到数组中符合条件的第一个成员
		methods:{
			getProduct(){
				setTimeout(() => {
					this.product = product_data.find((item)=>item.id == this.id);
				},300)
			},
			// 加入购物车，传入商品的id
			handleAddToCart(){
				this.$store.commit("addCart",this.id);
			}
		},
		mounted(){
			this.getProduct();
		}
	}
</script>

<style lang="scss" scoped>
	.product{
		display:flex;
		justify-content:center;
		align-items:center;
		margin:32px;
		padding:64px;
		background-color:#ffffff;
		border:1px solid #dddee1;
		border-radius:10px;
		overflow:hidden;
		.product-image{
			width:400px;
			height:400px;
			text-align:center;
			img{
				height:100%;
				width:100%;
			}
		}
		.product-info{
			width:50%;
			padding:150px 0 250px;
			height:150px;
			float:left;
			text-align:center;
		}
		.product-cost{
			color:#f2352e;
			margin:8px 0;
		}
		.product-add-cart{
			display:inline-block;
			padding:8px 64px;
			margin:8px 0;
			background-color:#2d8cf0;
			color:#fff;
			border-radius:4px;
			cursor:pointer;
		}
	}
	
</style>

<template>
	<div class="cart">
		<div class="cart-header">
			<div class="cart-header-title">购物清单</div>
			<ul class="cart-header-main">
				<li class="cart-info">商品信息</li>
				<li class="cart-price">单价</li>
				<li class="cart-count">数量</li>
				<li class="cart-cost">小计</li>
				<li class="cart-delete">删除</li>
			</ul>
		</div>
		<div class="cart-content">
			<div class="cart-content-main"
				v-for="(item,index) in cartList"
				:key="index"
			>
				<div class="cart-info">
					<div class="img">
						<img :src="productDicList[item.id].image" alt="">
						<span class="cart-info-title">{{productDicList[item.id].name}}</span>
					</div>
				</div>
				<div class="cart-price">{{productDicList[item.id].cost}}</div>
				<div class="cart-count">
					<button 
						class="cart-control-minus"
						@click="handleCount(index,-1)"
					>-</button>
					{{item.count}}
					<button 
						class="cart-control-add"
						@click="handleCount(index,1)"
					>+</button>
				</div>
				<div class="cart-cost">
					{{item.count * productDicList[item.id].cost}}
				</div>
				<div class="cart-delete">
					<button 
						class="cart-control-delete"
						@click="handleDelete(index)"
					>删除</button>
				</div>
			</div>
			<div v-if="!cartList.length" class="cart-empty">购物车为空</div>
		</div>
		<div class="cart-promotion" v-if="cartList.length">
			<span>使用优惠码:</span>
			<input type="text" v-model="promotionCode" placeholder="请输入优惠码">
			<span class="cart-control-promotion"
				@click="handleCheckCode"
			>验证</span>
		</div>
		<div class="cart-footer" v-if="cartList.length">
			<div class="cart-footer-desc">
				共计<span>{{countAll}}</span>件商品
			</div>
			<div class="cart-footer-desc">
				应付总额 <span>{{costAll - promotion}}</span>
				<template v-if="promotion">
					(优惠码 <span>-{{promotion}}</span>)
				</template>
			</div>
			<div class="cart-footer-desc">
				<div class="cart-control-order"
					@click="handleOrder"
				>
					现在结算
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import product_data from "../../product.js"
	export default{
		name:"cart",
		data(){
			return{
				productList:product_data,
				promotion:0,
				promotionCode:"",
			}
		},
		computed:{
			cartList(){
				return this.$store.state.cartList
			},
			//  商品数据, 每项是一个对象,key值是商品id,value是productList的商品详细信息
			productDicList(){
				const dict = {};
				this.productList.forEach((item) => {
					dict[item.id] = item;
				})
				return dict;
			},
			// 所有商品的数量
			countAll:function(){
				let sum = 0;
				this.cartList.forEach((item) => {
					sum += item.count;
				})
				return sum;
			},
			//  所有商品的价格,等于 商品数量 乘以 商品对应的 价格
			costAll(){
				let cost = 0;
				this.cartList.forEach(item => {
					cost += item.count * this.productDicList[item.id].cost;
				})
				return cost;
			}
		},
		methods:{
			handleCount(index,count){
				if(count < 0 && this.cartList[index].count === 1) return;
				this.$store.commit("editCart",{
					id:this.cartList[index].id,
					count
				})
			},
			handleDelete(index){
				// 传入删除商品的序号,
				this.$store.commit("deleteCart",index);
			},
			handleCheckCode(){
				if(this.promotionCode === ""){
					window.alert("请输入优惠码");
					return
				}
				if(this.promotionCode !== "Vue.js"){
					window.alert("优惠码输入错误");
				}else{
					window.alert("兑换成功");
					this.promotion = 500;
					this.promotionCode = "";
				}
			},
			handleOrder(){
				this.$store.dispatch("buy",()=>{
					window.alert("购物成功")
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart{
		margin:32px;
		background-color:#fff;
		border:1px solid #dddee1;
		border-radius:10px;
	}
	.cart-header-title{
		padding:16px 32px;
		border-bottom:1px solid #dddee1;
		border-radius:10px 10px 0 0;
		background:#f8f8f9;
	}
	.cart-header-main{
		display:flex;
		justify-content:space-between;
		padding:8px 32px;
		border-bottom:1px solid #dddee1;
		overflow:hidden;
		background-color:#eee;
		li{
			text-align:center;
			font-size:14px;
			flex:1;
		}
		li:nth-child(1){
			flex:6;
			text-align:left;
		}
	}
	.cart-content-main{
		display:flex;
		padding:0 32px;
		height:60px;
		line-height:60px;
		text-align:center;
		border-bottom:1px dashed #e9eaec;
		overflow:hidden;
		.cart-info{
			flex:6;
			.img{
				text-align:left;
			}
		}
		.cart-price,.cart-count,.cart-cost,.cart-delete{
			flex:1;
		}
		img{
			margin-right:15px;
			transform:translateY(10px);
			width:40px;
			height:40px;
		}
		.cart-control-minus,.cart-control-add{
			margin:0 4px;
			width:24px;
			height:24px;
			background-color:#f8f8f9;
			border-radius:50%;
			box-shadow:0 1px 1px rgba(0,0,0,.2);
			cursor:pointer;
			font-size:18px;
		}
		.cart-control-delete{
			cursor:pointer;
			color:#2d8cf0;
			background-color:#fff;
		}
	}
	.cart-promotion{
		padding:16px 32px;
	}
	.cart-control-promotion,
	.cart-control-order{
		display:inline-block;
		padding:8px 32px;
		border-radius:6px;
		background-color:#2d8cf0;
		color:#fff;
		cursor:pointer;
	}
	.cart-control-promotion{
		padding:2px 6px;
		font-size:12px;
		border-radius:3px;
	}
	.cart-footer{
		padding:32px;
		text-align:center;
	}
	.cart-footer-desc{
		display:inline-block;
		padding:0 16px;
		span{
			color:#f2352e;
			font-size:20px;
		}
	}
	.cart-empty{
		text-align:center;
		padding:32px;
	}
</style>

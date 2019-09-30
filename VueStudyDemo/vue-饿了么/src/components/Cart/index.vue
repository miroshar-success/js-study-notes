<template>
	<section class="footer">
		<!-- 整个购物车的父级 -->
		<div class="cart-wrapper">
			<!-- 购物车的内容，包括左侧的购物车图标, 配送费,右侧的结算按钮 -->
			<div class="content">
				<div class="left-content" @touchstart="handleToggleList">
					<div class="icon-wrapper">
						<div class="cart-icon" :class="{'highlight':totalCount>0}">
							<i class="iconfont icon-shopping-cart"></i>
						</div>
						<div class="total-count" v-show="totalCount > 0">{{totalCount}}</div>
					</div>
					<div class="total-price" :class="{'highlight':totalPrice > 0}">￥{{totalPrice}}</div>
					<p class="desc">另需配送费 ￥4元</p>
				</div>
				<div class="right-content">
					<p class="pay" :class="{'highlight':totalPrice >= this.minPrice}">{{payDesc}}</p>
				</div>
			</div>
			<!-- 添加进购物车的商品列表,当有商品的时候可以点击显示,没有商品默认隐藏 -->
			<div class="cart-list" v-show="showList">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="clear" @touchstart="handleClearCart">清空</span>
				</div>
				<div class="list-content" ref="hook_cart_list">
					<ul class="selected-food-list">
						<li 
							class="selected-item"
							v-for="(food,index) in this.$store.state.selectedFood" 
							:key="index">
							<div class="food-name">{{food.name}}</div>
							<div class="cart-right">
								<p class="price">￥{{food.price}}</p>
								<div class="controller-wrapper">
									<ButtonController :food="food"/>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 展开购物车列表时才会显示 遮罩层, 和 购车车列表可以使用同样的计算属性 -->
		<transition name="show-mask">
			<div class="cart-mask" v-show="showList" @touchstart="handleHideMask"></div>
		</transition>
	</section>
</template>

<script>
	import BScroll from "better-scroll"; 
	import ButtonController from "@/components/ButtonController";
	export default{
		name:"cart",
		data(){
			return{
				selectedFood:this.$store.state.selectedFood,
				minPrice:20,	// 最低起送价
				fold:true	,// 是否是折叠状态,默认为true,表示为折叠
				// isShow:false
			}
		},
		components:{ButtonController},
		computed:{
			// 选择的商品总价
			totalPrice(){
				let total = 0;
				this.selectedFood.forEach((item) => {
					total += item.price * item.count;
				});
				return total;
			},
			// 选择的商品总数量
			totalCount(){
				let count = 0;
				this.selectedFood.forEach((item) => {
					count += item.count;
				})
				return count;
			},
			/*
		    下单价格不同,对应的结算按钮显示内容不同,当没有选择商品,也就是没有总价时,显示为 最小起送价格, 
			当选择了商品但是不满起送时,显示还差 多少元起送, 当达到最小起送价时, 显示去结算,同时改变按钮的颜色 以及文字颜色
			*/
		    payDesc(){
			    if(this.totalPrice === 0){
				   return `￥${this.minPrice}元起送`;
			    }
			    else if(this.totalPrice < this.minPrice){
				   return `还差￥${this.minPrice - this.totalPrice}元起送`;
			    }
			    else{
				   return '去结算'
			    }
		    },
		   /*当商品数量为0的时候,不能折叠购物车列表项 */
		    showList(){
				if(!this.totalCount){
					this.fold = true;
					return false;	// 并返回false,是隐藏状态
				}
				// 否则,当购物车数量大于0的时候,如果this.fold为true表示折叠状态,则返回 false,fold为false的时候,表示打开状态,返回true
				let show = !this.fold;
				return show;
		    }
		},
		methods:{
			handleToggleList(){
				if(this.totalCount === 0) return;
				this.fold = !this.fold;
				// 当可以展开购物车列表时,可以滚动
				this.$nextTick( () => {
					let scroll = new BScroll(this.$refs.hook_cart_list,{
						probeType:3,
						tap:true
					})
				})
			},
			// 清空购物车
			handleClearCart(){
				this.$store.commit("handleClearCart");
			},
			// 点击遮罩层隐藏购物车列表,并且隐藏遮罩层
			handleHideMask(){
				this.fold = true;	// 将购物车列表隐藏即可
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/scss/mixin.scss";
	.footer{
		position:fixed;
		width:100%;
		bottom:0;
		left:0;
		height:48px;
		z-index:10;
	}
	.cart-wrapper{
		position:relative;
		width:100%;
		height:100%;
		z-index:50;
		.content{
			display:flex;
			transform:translateZ(1px);
		}
		.left-content{
			display:flex;
			flex:1;
			background-color:#141d27;
		}
		.icon-wrapper{
			box-sizing:border-box;
			position:relative;
			padding:6px;
			top:-10px;
			margin-left:12px;
			width:56px;
			height:56px;
			border-radius:50%;
			background-color:#131d26;
			.cart-icon{
				width:44px;
				height:44px;
				border-radius:50%;
				background-color:#2b343c;
				text-align:center;
				line-height:44px;
				.iconfont{
					color:#80858a;
					font-size:24px;
				}
				&.highlight{
					background-color:#00a0dc;
					.iconfont{
						color:#fff;
					}
				}
			}
			.total-count{
				position:absolute;
				top:0;
				left:32px;
				z-index:60;
				width:24px;
				height:16px;
				color:#fff;
				font-size:10px;
				font-weight:700;
				line-height:16px;
				text-align:center;
				background-color:rgb(240,20,20);
				border-radius:8px;
				box-shadow:0px 2px 4px 0px rgba(0,0,0,0.4);
			}
		}
		.total-price{
			margin-top:12px;
			height:24px;
			width:47px;
			font-size:16px;
			color:rgba(255,255,255,0.4);
			font-weight:700;
			text-align:center;
			line-height:24px;
			border-right:1px solid #2c343d;
			&.highlight{
				color:#fff;
			}
		}
		.desc{
			padding-left:12px;
			font-size:10px;
			line-height:48px;
			height:100%;
			color:#919396;
		}
		.right-content{
			width:105px;
			height:100%;
			background-color:#2b333b;
			touch-action:none;
			.pay{
				text-align:center;
				color:rgba(255,255,255,0.4);
				font-weight:700;
				font-size:12px;
				line-height:48px;
			}
			.pay.highlight{
				background-color:#00b43c;
				color:#fff;
			}
		}
	}
	.cart-list{
		position:absolute;
		bottom:0;
		left:0;
		width:100%;
		height:auto;
		max-height:258px;
		background-color:#fff;
		padding-bottom:70px;
		z-index:-1;
		.list-header{
			display:flex;
			height:40px;
			padding:0 18px;
			background-color:#f3f5f7;
			align-items:center;
			justify-content:space-between;
			@include border-bottom-1px(rgba(7,17,27,0.1));
			.title{
				font-size:14px;
				color:rgb(7,17,27);
			}
			.clear{
				font-size:12px;
				color:rgb(0,160,220);
			}
		}
		.list-content{
			padding:0 18px;
			background-color:#fff;
			max-height:195px;
			overflow:auto;
		}
		.selected-item{
			display:flex;
			justify-content:space-between;
			padding:12px 0;
			height:24px;
			@include border-bottom-1px(rgba(7,17,27,0.1));
			.food-name{
				line-height:24px;
				font-size:14px;
				color:rgb(7,17,27);
			}
			.cart-right{
				display:flex;
				align-items:center;
			}
			.price{
				margin-right:12px;
				color:rgb(240,20,20);
				line-height:24px;
			}
		}
	}
	.cart-mask{
		position:fixed;
		left:0;
		right:0;
		top:0;
		bottom:0;
		background-color:rgba(7,17,27,0.6);
		filter:blur(10px);
		z-index:20;
	}
	.show-mask-enter-active,.show-mask-leave-active{
		transition:all .35s;
	}
	.show-mask-enter,.show-mask-leave-to{
		background-color:rgba(7,17,27,0);
	}
</style>

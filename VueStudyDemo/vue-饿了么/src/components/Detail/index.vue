<template>
	<transition name="slide">
		<div class="detail-wrapper" v-show="showDetail" ref="detail">
			<div class="content">
				<div class="img-header">
					<img :src="food.image" alt="">
					<div class="icon-back" @click.stop="handleBack">
						<i 
							class="iconfont icon-arrow-left"
						></i>
					</div>
				</div>
				<div class="detail">
					<h1 class="name">{{food.name}}</h1>
					<div class="description">
						<span class="count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="area">
						<div class="price">
							<span class="now-price">{{food.price}}</span>
							<span class="old-price" v-show="food.oldPrice">{{food.oldPrice}}</span>
						</div>
						<template v-if="food.count">
							<ButtonController :food="food"/>
						</template>
						<template v-else>
							<div class="add-cart" @click.stop="handleAddCart">加入购物车</div>
						</template>
					</div>
				</div>
				<SplitComponent/>
				<div class="introduce" v-if="food.info">
					<h1 class="title">商品介绍</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<template v-if="food.info">
					<SplitComponent/>
				</template>
				<div class="rating-wrapper">
					<div class="title">商品评价</div>
					<RatingSelect 
						:desc="desc" 
						:selected-type="selectedType" 
						:only-content="onlyContent"
						:ratings="food.ratings"
						@selectedType="handleGetType"
						@onlyContent="handleSeletedContent"
					/>
					<div class="rating-list">
						<ul v-show="food.ratings">
							<li 
								class="rating-item"
								v-for="(item,index) in RateArray" :key="index"
							>
								<div class="head">
									<p class="rate-time">{{item.rateTime | formatDate}}</p>
									<div class="user-info">
										<span class="user-name">{{item.username}}</span>
										<img :src="item.avatar" alt="" class="user-avatar" width="12" height="12">
									</div>
								</div>
								<div class="rating-text">
									<i 
										class="iconfont"
										:class="{'icon-thumb-up':item.rateType === 0,'icon-thumb-down':item.rateType === 1}"
									></i>
									<span class="text">{{item.text}}</span>
								</div>
							</li>
						</ul>
						<p class="no-rate" v-show="!food.ratings">暂无评价</p>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import ButtonController from "@/components/ButtonController"
	import SplitComponent from "@/components/SplitComponent"
	import BScroll from "better-scroll"
	import RatingSelect from "@/components/RatingSelect"
	const ALL = 0;
	const POSITIVE = 1;
	const NEGATIVE = 2;
	import {formDate} from "@/common/js/index.js";
	export default{
		name:"detail",
		data(){
			return{
				showDetail:false,	// 默认隐藏详情页,当点击商品组件的时候将数组传入到详情页组件中
				selectedType:ALL,
				onlyContent:false,
				desc:{
					all:"全部",
					positive:"推荐",
					negative:"吐槽"
				}
			}
		},
		props:{
			food:{
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		filters:{
			formatDate(time){
				let date = new Date(time);
				return formDate(date,"yyyy-MM-dd hh:mm");
			}
		},
		components:{ButtonController,SplitComponent,RatingSelect},
		computed:{
			RateArray(){
				if(this.selectedType === 0 && this.onlyContent === false){
					return this.food.ratings
				}
				else if(this.selectedType === 0 && this.onlyContent === true){
					return this.food.ratings.filter(item => {
						return item.text !== "";
					})
				}
				if(this.selectedType === 1 && this.onlyContent === false){
					return this.food.ratings.filter(item => {
						return item.rateType === 0;
					})
				}
				else if(this.selectedType === 1 && this.onlyContent === true){
					return this.food.ratings.filter(item => {
						return item.rateType === 0 && item.text !== ""
					})
				}
				if(this.selectedType === 2 && this.onlyContent === false){
					return this.food.ratings.filter(item => {
						return item.rateType === 1;
					})
				}
				else if(this.selectedType === 2 && this.onlyContent === true){
					return this.food.ratings.filter(item => {
						return item.rateType === 1 && item.text !== ""
					})
				}
				return this.food.ratings
			}
		},
		methods:{
			show(){
				this.selectedType = ALL;
				this.onlyContent = false;
				this.showDetail = true;
				this.$nextTick( () => {
					let scroll = new BScroll(this.$refs.detail,{
						probeType:3,
						click:true,
					})
				})
			},
			handleBack(){
				this.showDetail = false;
			},
			handleAddCart(){
				// ? 为什么这里要判断 是否有count属性, 如果点击的是购物车按钮,则说明没有添加过这个食品,直接设置count属性为1
				if(!this.food.count){
					this.$set(this.food,"count",1);
					this.$store.commit("handleAddtoCart",this.food);
				}
			},
			// 获取子组件选择的是哪个商品评价，并修改父组件的值
			handleGetType(type){
				this.selectedType = type;
			},
			// 获取子组件是否选择了 只看有内容的评价 ,并修改父组件的值
			handleSeletedContent(data){
				this.onlyContent = data;
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "@/common/scss/mixin.scss";
	.detail-wrapper{
		position:fixed;
		top:0;
		bottom:48px;
		left:0;
		right:0;
		background-color:#fff;
		.img-header{
			position:relative;
			width:100%;
			height:0;
			padding-top:100%;
			img{
				position:absolute;
				left:0;
				top:0;
				width:100%;
				height:100%;
			}
			.icon-back{
				position:absolute;
				left:10px;
				top:5px;
				width:30px;
				height:30px;
				color:#fff;
				font-size:30px;
				text-align:center;
				line-height:30px;
				font-weight:bold;
			}
		}
		.detail{
			padding:18px;
			background-color:#fff;
			.name{
				font-size:14px;
				font-weight:bold;
				color:rgb(7,17,27);
				line-height:14px;
			}
			.description{
				margin-top:8px;
				color:rgb(147,153,159);
				line-height:10px;
				font-size:10px;
				.count{
					margin-right:12px;
				}
			}
			.area{
				margin-top:18px;
				display:flex;
				justify-content:space-between;
				.add-cart{
					width:74px;
					height:24px;
					background-color:rgb(0,160,220);
					text-align:center;
					line-height:24px;
					color:#fff;
					font-size:10px;
					border-radius:12px;
				}
			}
			.price{
				.now-price,.old-price{
					font-weight:700;
				}
				.now-price{
					margin-right:6px;
					line-height:24px;
					color:rgb(240,20,20);
					font-size:14px;
				}
				.old-price{
					text-decoration:line-through;
					font-size:10px;
					color:rgb(147,153,159);
				}
				.now-price:before,.old-price:before{
					content:"￥";
					font-size:10px;
					font-weight:normal;
				}
			}
		}
		.introduce{
			padding:18px;
			.title{
				font-size:13px;
				color:#07111b;
				line-height:26px;
			}
			.text{
				color:rgb(77,86,93);
				line-height:24px;
				font-size:12px;
			}
		}
		.rating-wrapper{
			@include border-bottom-1px(rgb(7,17,27,0.1));
			.title{
				padding:18px 18px 0 18px;
				font-size:14px;
				line-height:14px;
			}
		}
		.rating-list{
			padding:0 18px;
			.rating-item{
				width:100%;
				padding:16px 0;
				@include border-bottom-1px(rgb(7,17,27,0.1));
			}
			.no-rate{
				font-size:14px;
				color:rgb(147,153,159);
				padding:18px;
			}
			.head{
				width:100%;
				display:flex;
				justify-content:space-between;
				align-items:center;
				height:14px;
				line-height:14px;
				.rate-time,.user-name{
					font-size:10px;
					color:rgb(147,153,159);
				}
				.user-info{
					height:12px;
					line-height:12px;
				}
				.user-avatar{
					margin-left:6px;
					border-radius:50%;
				}
			}
			.rating-text{
				margin-top:6px;
				width:100%;
				.icon-thumb-up{
					font-size:12px;
					color:rgb(0,160,220);
					line-height:24px;
				}
				.icon-thumb-down{
					font-size:12px;
					color:rgb(147,153,159);
				}
				.text{
					margin-left:4px;
					line-height:16px;
					color:rgb(7,17,27);
					font-size:12px;
				}
			}
		}
		&.slide-enter-active,&.slide-leave-active{
			transition:all .3s linear;
		}
		&.slide-enter,&.slide-leave-to{
			transform:translate3d(100%,0,0);
		}
		&.slide-enter-to,&.slide-leave{
			transform:translate3d(0,0,0);
		}
	}
</style>

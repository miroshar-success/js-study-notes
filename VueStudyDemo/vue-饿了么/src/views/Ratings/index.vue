<template>
	<div class="seller-ratings" ref="seller">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<p class="title">综合评分</p>
					<p class="rank-rate">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<p class="text">服务态度</p>
						<Star :size="36" :score="seller.serviceScore"/>
						<p class="score">{{seller.serviceScore}}</p>
					</div>
					<div class="score-wrapper">
						<p class="text">商品评分</p>
						<Star :size="36" :score="seller.foodScore"/>
						<p class="score">{{seller.foodScore}}</p>
					</div>
					<p class="delivery-time">
						<span class='text'>送达时间</span>
						<span class="time">{{seller.deliveryTime}}分钟</span>
					</p>
				</div>
			</div>
			<SplitComponent/>
			<RatingSelect 
				:ratings="ratings"
				:selected-type="selectedType"
				:only-content="onlyContent"
				:desc="desc"
				@selectedType="handleGetType"
				@onlyContent="handleGetContent"
			/>
			<div class="rating-wrapper">
				<ul class="rating-list">
					<li 
						class="rating-item"
						v-for="(item,index) in RateArray"
						:key="index"
					>
						<div class="avatar">
							<img :src="item.avatar" alt="" width="28" height="28">
						</div>
						<div class="rate-detail">
							<p class="username">{{item.username}}</p>
							<div class="star-wrapper">
								<Star :size="24" :score="item.score"/>
								<span class="delivery-time" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
							</div>
							<p class="rate-text">
								{{item.text}}
							</p>
							<div v-if="item.recommend" class="recommend">
								<i class="iconfont" :class="{'icon-thumb-up':item.rateType===0,'icon-thumb-down':item.rateType===1}"></i>
								<ul class="recommend-list">
									<li
										class="recommend-item"
										v-for="(item,index) in item.recommend"
										:key="index"
									>
										{{item}}
									</li>
								</ul>
							</div>
							<div class="rate-time">
								{{item.rateTime | formDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Star from "@/components/Star"
	import SplitComponent from "@/components/SplitComponent"
	import RatingSelect from "@/components/RatingSelect"
	import BScroll from "better-scroll"
	import {MyFormDate} from "@/common/js/index.js";
	const ALL = 0;
	const POSITIVE = 1;
	const NEGATIVE = 2;
	export default{
		name:"ratings",
		data(){
			return{
				seller:[],
				ratings:[],
				onlyContent:false,
				selectedType:ALL,
				desc:{
					all:"全部",
					positive:"满意",
					negative:"不满意"
				}
			}
		},
		components:{Star,SplitComponent,RatingSelect},
		created(){
			this.$axios.get("/api/seller").then(res => {
				if(res.data.msg === 200){
					this.seller = res.data.seller;
				}
			})
			this.$axios.get("/api/ratings").then(res => {
				if(res.data.msg === 200){
 					this.ratings = res.data.ratings;
					this.$nextTick(() => {
						let scroll = new BScroll(this.$refs.seller,{
							probeType:1,
							click:true
						})
					})
				}
			})
		},
		computed:{
			RateArray(){
				let ratings = this.ratings;
				if(this.selectedType === ALL && this.onlyContent === false){
					return ratings;
				}else if(this.selectedType === ALL && this.onlyContent === true){
					return ratings.filter(item => {
						return item.text !== "";
					})
				}
				if(this.selectedType === POSITIVE && this.onlyContent === false){
					return ratings.filter(item => {
						return item.rateType === 0 
					})
				}else if(this.selectedType === POSITIVE && this.onlyContent === true){
					return ratings.filter(item => {
						return item.rateType === 0 && item.text !== ""
					})
				}
				if(this.selectedType === NEGATIVE && this.onlyContent === false){
					return ratings.filter(item => {
						return item.rateType === 1;
					})
				}else if(this.selectedType === NEGATIVE && this.onlyContent === true){
					return ratings.filter(item => {
						return item.rateType === 1 && item.text !== ""
					})
				}
				return ratings;
			}
		},
		filters:{
			formDate(time){
				let date = new Date(time);
				return MyFormDate(date,"yyyy-MM-dd hh:mm");
			}
		},
		methods:{
			handleGetType(type){
				this.selectedType = type;
			},
			handleGetContent(data){
				this.onlyContent = data;
			}
		}
	}
</script>

<style lang="scss" scopd>
	@import "@/common/scss/mixin.scss";
	.seller-ratings{
		position:absolute;
		left:0;
		right:0;
		top:174px;
		bottom:48px;
		background-color:#fff;
		overflow:auto;
		.overview{
			display:flex;
			padding:18px 0;
		}
		.overview-left{
			width:138px;
			padding-bottom:6px;
			text-align:center;
			border-right:1px solid #e6e7e8;
			@media only screen and (max-width:320px){
				width:110px;
			}
			.score{
				font-size:24px;
				color:rgb(255,153,0);
				line-height:28px;
			}
			.title{
				margin-top:6px;
				font-size:12px;
				color:rgb(7,17,27);
				line-height:12px;
			}
			.rank-rate{
				margin-top:8px;
				font-size:10px;
				line-height:10px;
				color:#93999f;
			}
		}
		.overview-right{
			flex:1;
			padding-left:24px;
			padding-bottom:6px;
			@media only screen and (max-width:320px){
				padding-left:10px;
			}
			.score-wrapper,.delivery-time{
				.text{
					margin-right:12px;
					font-size:12px;
					color:rgb(7,17,27);
					line-height:18px;
				}
			}
			.score-wrapper{
				display:flex;
				margin-bottom:8px;
				.score{
					margin-left:12px;
					font-size:12px;
					color:rgb(255,153,0);
					line-height:18px;
				}
			}
			.delivery-time{
				.time{
					font-size:12px;
					color:rgb(147,153,159);
					line-height:18px;
				}
			}
		}
	}
	.rating-wrapper{
		padding:0 18px;
	}
	.rating-item{
		display:flex;
		padding:18px 0;
		@include border-bottom-1px(rgba(7,17,27,0.1));
		.avatar{
			margin-right:12px;
			width:28px;
			height:28px;
			img{
				border-radius:50%;
			}
		}
		.rate-detail{
			flex:1;
			position:relative;
			.username{
				font-size:10px;
				color:rgb(7,17,27);
				line-height:12px;
			}
			.star-wrapper{
				font-size:4px;
				.delivery-time,.star{
					display:inline-block;
				}
				.delivery-time{
					margin-left:6px;
					font-size:10px;
					color:rgb(147,153,159);
					line-height:12px;
				}
			}
			.rate-text{
				padding:6px 0 8px 0;
				font-size:12px;
				color:rgb(7,17,27);
			}
			.recommend{
				display:flex;
				.icon-thumb-up,.icon-thumb-down{
					font-size:12px;
					line-height:16px;
				}
				.icon-thumb-up{
					color:rgb(0,160,220);
				}
				.icon-thumb-down{
					color:rgb(183,187,191);
				}
			}
			.recommend-list{
				margin-left:8px;
				display:inline-flex;
				flex-wrap:wrap;
				.recommend-item{
					margin-right:8px;
					margin-bottom:8px;
					width:62px;
					height:16px;
					text-align:center;
					color:rgb(147,153,159);
					line-height:16px;
					font-size:9px;
					background-color:#fff;
					border:1px solid rgba(7,17,27,0.1);
					border-radius:1px;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
				}
			}
			.rate-time{
				position:absolute;
				right:0;
				top:0;
				font-size:10px;
				color:rgb(147,153,159);
				line-height:12px;
			}
		}
	}
	
</style>

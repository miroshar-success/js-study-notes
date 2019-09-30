<template>
	<div class="seller-wrapper" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<div class="overview-top">
					<div class="desc">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<Star :size="36" :score="seller.score"/>
							<div class="count">
								<span class="rate-count">({{seller.ratingCount}})</span>
								<span class="sell-count">月售{{seller.sellCount}}单</span>
							</div>
						</div>
					</div>
					<div class="seller-collect">
						<i 
							class="iconfont icon-favorite" 
							:class="{'collect':isCollect}"
							@touchstart="handleCollectShop"
						></i>
						<p class="text">{{collectText}}</p>
					</div>
				</div>
				<div class="overview-bottom">
					<ul class="seller-tags">
						<li>
							<h2 class='tag-title'>起送价</h2>
							<p class="min-price">{{seller.minPrice}}</p>
						</li>
						<li>
							<h2 class='tag-title'>商家配送</h2>
							<p class="delivery-price">{{seller.deliveryPrice}}</p>
						</li>
						<li>
							<h2 class='tag-title'>平均配送时间</h2>
							<p class="delivery-time">{{seller.deliveryTime}}</p>
						</li>
					</ul>
				</div>
			</div>
			<SplitComponent/>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul class="seller-supports">
					<li 
						class="support-item"
						v-for="(item,index) in seller.supports"
						:key="index"
					>
						<SupportIcon :size='4' :type='item.type'/>
						<p class="description">{{item.description}}</p>
					</li>
				</ul>
			</div>
			<SplitComponent/>
			<div class="seller-pic">
				<h1 class="title">商家实景</h1>
				<div class="carousel-wrapper" ref="carousel">
					<ul class="carousel-list">
						<li class="carousel-item" v-for="(item,index) in seller.pics">
							<img :src="item" alt="" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<SplitComponent/>
			<div class="seller-info">
				<h1 class="title">商家信息</h1>
				<ul class="info-list">
					<li 
						class="info-item"
						v-for="(item,index) in seller.infos"
						:key="index"
					>{{item}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Star from "@/components/Star"
	import SplitComponent from "@/components/SplitComponent"
	import BScroll from "better-scroll"
	import SupportIcon from '@/components/SupportIcon'
	const MARGIN = 6;
	export default{
		name:"seller",
		data(){
			return{
				seller:{},
				isCollect:false,
				types:["decrease","discount","special","invoice","guarantee"],
			}
		},
		components:{Star,SplitComponent,SupportIcon},
		created(){
			this.$axios.get("/api/seller").then(res => {
				if(res.data.msg === 200){
					this.seller = res.data.seller;
					this.$nextTick( () => {
						let scroll = new BScroll(this.$refs.seller,{
							click:true,
							probeType:1
						});
						let carousel = this.$refs.carousel;
						const oCarouselList = carousel.querySelector(".carousel-list");
						const aCarouselItem = carousel.querySelectorAll(".carousel-list>.carousel-item")[0];
						const ItemWidth = aCarouselItem.offsetWidth;
						oCarouselList.style.width = (ItemWidth + MARGIN)*this.seller.pics.length + "px";
						let wrapper = new BScroll(carousel,{
							click:true,
							probeType:1,
							startX:0,
							scrollX:true,
							eventPassthrough:"vertical"
						})
					})
				}
			})
			this.isCollect = JSON.parse(window.localStorage.getItem("collect")) || false ;
		},
		computed:{
			collectText(){
				let text = this.isCollect == true ? "已收藏" : "收藏";
				return text;
			}
		},
		methods:{
			handleCollectShop(){
				this.isCollect = !this.isCollect;
				window.localStorage.setItem("collect",JSON.stringify(this.isCollect) );
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/scss/mixin.scss";
	.seller-wrapper{
		position:absolute;
		top:174px;
		bottom:48px;
		left:0;
		right:0;
		overflow:auto;
	}
	.seller-content{
		.overview{
			padding:0 18px;
		}
		.overview-top{
			padding:18px 0;
			display:flex;
			justify-content:space-between;
			@include border-bottom-1px(rgba(7,17,27,0.1));
			.name{
				font-size:14px;
				color:rgb(7,17,27);
				line-height:14px;
			}
			.star-wrapper{
				display:flex;
				align-items:center;
				height:18px;
				margin-top:8px;
				.sell-count,.rate-count{
					font-size:10px;
					color:rgb(77,85,93);
					line-height:18px;
				}
				.sell-count{
					margin-left:12px;
				}
				.rate-count{
					margin-left:8px;
				}
			}
			.seller-collect{
				text-align:center;
				width:30px;
				.iconfont{
					font-size:24px;
					color:rgba(7,17,27,0.3);
				}
				.text{
					margin-top:4px;
					font-size:10px;
					color:rgb(77,85,93);
					line-height:20px;
				}
				.collect{
					font-size:24px;
					color:rgb(240,20,20);
				}
			}
		}
		.overview-bottom{
			.seller-tags{
				display:flex;
				padding:18px 0;
				height:38px;
				li{
					flex:1;
					text-align:center;
					border-right:1px solid rgba(7,17,27,0.1);
					&:last-child{
						border:none;
					}
				}
				.tag-title{
					font-size:10px;
					color:rgb(147,153,159);
					line-height:10px;
				}
				.min-price,.delivery-time,.delivery-price{
					margin-top:4px;
					color:rgb(7,17,27);
					font-size:20px;
					line-height:24px;
				}
				.min-price:after,.delivery-price:after{
					content:"元";
					font-size:10px;
				}
				.delivery-time:after{
					content:"分钟";
					font-size:10px;
				}
			}
		}
		.bulletin{
			padding:18px 18px 0 18px;
			background-color:#fff;
			.title{
				font-size:14px;
				color:rgb(7,17,27);
			}
			.content-wrapper{
				padding:8px 12px 16px 12px;
				font-size:12px;
				color:rgb(240,20,20);
				line-height:24px;
				@include border-bottom-1px(rgba(7,17,27,0.1));
			}
			.seller-supports{
				.support-item{
					padding:16px 12px 16px 12px;
					height:16px;
					display:flex;
					font-size:12px;
					color:rgb(7,17,27);
					line-height:16px;
					@include border-bottom-1px(rgba(7,17,27,0.1));
				}
				.support-item:last-child{
					@include border-none;
				}
				.description{
					margin-left:6px;
				}
			}
		}
		.seller-pic{
			padding:18px 0 18px 18px;
			.title{
				font-size:14px;
				color:rgb(7,17,27);
			}
			.carousel-wrapper{
				margin-top:12px;
				height:90px;
				font-size:0;
				overflow:auto;
			}
			.carousel-item{
				display:inline-block;
				margin-right:6px;
				width:120px;
				height:90px;
			}
		}
		.seller-info{
			padding:0 18px;
			.title{
				padding:12px 0;
				color:rgb(7,17,27);
				font-size:14px;
				@include border-bottom-1px(rgb(7,17,27,0.1));
			}
			.info-item{
				padding:16px 12px;
				font-size:12px;
				color:rgb(7,17,27);
				line-height:16px;
				height:16px;
				@include border-bottom-1px(rgba(7,17,27,0.1));
				&:last-child{
					@include border-none;
				}
			}
		}
	}
</style>

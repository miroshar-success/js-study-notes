<template>
	<section class="detail-body">
		<!-- sticky-footer 如果页面内容不够长,页脚粘贴在视窗底部;如果内容足够长,页脚会被内容向下推送 -->
		<div class="detail-wrapper clearfix">
			<div class="content">
				<h1 class="title">{{seller.name}}</h1>
				<div class="star-wrapper">
					<Star :size="48" :score="seller.score"></Star>
				</div>
				<div class="supports-wrapper">
					<h1 class="title">优惠信息</h1>
					<ul class="supports-list" v-if="seller.supports">
						<li 
							v-for="(item,index) in seller.supports"
							:key="index"
							class="supports-item"
						>
							<SupportIcon :size='2' :type='item.type'/>
							<p class='supports-text'>{{item.description}}</p>
						</li>
					</ul>
				</div>
				<div class="bulletin-wrapper">
					<h1 class="title">商家公告</h1>
					<p class="bulletin-details">{{seller.bulletin}}</p>
				</div>
			</div>
		</div>
		<div class="detail-close" @touchstart="handleCloseDetail">
			<i class="iconfont icon-baseline-close-px icon-close"></i>
		</div>
	</section>
</template>

<script>
	import Star from "@/components/Star"
	import SupportIcon from '@/components/SupportIcon'
	export default{
		name:"header-detail",
		components:{Star,SupportIcon},
		data(){
			return{
				types:["decrease","discount","guarantee","invoice","special"],
			}
		},
		props:{
			seller:{
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		methods:{
			handleCloseDetail(){
				this.$store.commit("handleCloseDetail")
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/scss/mixin.scss";
	.detail-body{
		position:fixed;
		padding:0 36px;
		height:100%;
		left:0;
		top:0;
		z-index:100;
		background-color:rgba(7,17,27,.8);
		overflow:auto;
		backdrop-filter:blur(10px);
		.detail-wrapper{
			width:100%;
			min-height:100%;
			.content{
				margin-top:64px;
				padding-bottom:64px;
			}
			.title{
				color:#fff;
				font-size:16px;
				line-height:16px;
				font-weight:700;
				text-align:center;
			}
			.star-wrapper{
				margin-top:16px;
				height:24px;
				text-align:center;
			}
		}
		.supports-wrapper,.bulletin-wrapper{
			margin-top:28px;
			.title{
				display:flex;
				height:14px;
				justify-content:space-between;
				align-items:center;
				font-size:14px;
				line-height:14px;
				font-weight:bold;
			}
			.title:before,.title:after{
				content:'';
				display:block;
				flex:1;
				background-color:rgba(255,255,255,0.2);
				height:1px;
			}
			.title:before{
				margin-right:12px;
			}
			.title:after{
				margin-left:12px;
			}
		}
		.supports-list{
			padding:24px 12px 0 12px; 
			.supports-item{
				margin-bottom:12px;
				display:flex;
				justify-content:flex-start;
				align-items:center;
				height:16px;
				font-size:12px;
				color:rgb(255,255,255);
				&:last-child{
					margin-bottom:0;
				}
				.supports-text{
					margin-left:6px;
				}
			}
		}
		.bulletin-details{
			margin-top:24px;
			font-size:12px;
			line-height:24px;
			text-align:center;
		}
		.detail-close{
			position:relative;
			margin:-64px auto 0 auto;
			width:32px;
			height:32px;
			text-align:center;
			line-height:32px;
			clear:both;
			.icon-close{
				font-size:32px;
			}
		}
	}
</style>

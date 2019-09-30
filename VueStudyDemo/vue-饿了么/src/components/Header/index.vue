<template>
	<div class="header">
		<section class="seller-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar" alt="">
			</div>
			<div class="content">
				<div class="title">
					<div class="brand"></div>
					<p class="seller-name text-ellipsis">{{seller.name}}</p>
				</div>
				<p class="description">
					{{seller.description}} / {{seller.deliveryTime}}分钟送达
				</p>
				<template v-if="seller.supports">
					<div class="support">
						<SupportIcon :size='1' :type='seller.supports[0].type'/>
						<p class="text">{{seller.supports[0].description}}</p>
					</div>
					<div 
						class="supports-count"
						@touchstart="handleShowDetail"
					>
						<span class="text">{{seller.supports.length}}个</span>
						<i class="iconfont icon-previewright"></i>
					</div>
				</template>
			</div>
		</section>
		<section class="bulletin-wrapper">
			<div class="bulletin-title"></div>
			<p class="text text-ellipsis">{{seller.bulletin}}</p>
			<i class="iconfont icon-previewright"></i>
		</section>
		<div 
			class="seller-bg"
			:style="{backgroundImage:'url('+ seller.avatar +')'}"
		></div>
		<transition name="fade">
			<HeaderDetail v-show="$store.state.showDetail" :seller="seller"/>
		</transition>
	</div>
</template>

<script>
	import HeaderDetail from "@/components/HeaderDetail"
	import SupportIcon from '@/components/SupportIcon'
	export default{
		name:"v-header",
		data(){
			return{
				seller:{},
				types:["decrease","discount","guarantee","invoice","special"],
			}
		},
		components:{HeaderDetail,SupportIcon},
		created(){
			this.$axios.get("/api/seller").then(res => {
				if(res.data.msg === 200){
					this.seller = res.data.seller;
				}
			})
		},
		methods:{
			// 点击显示 商家遮罩层,显示详细的商家信息
			handleShowDetail(){
				this.$store.commit("handleOpenDetail");
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/scss/mixin.scss";
	.header{
		position:relative;
		color:#fff;
		background-color:rgba(7,17,27,.5);
		overflow:hidden;
		.seller-wrapper{
			position:relative;
			padding:24px 12px 18px 24px;
			display:flex;
			.avatar{
				width:64px;
				height:64px;
				border-radius:4px;
				overflow:hidden;
			}
			.content{
				margin-left:16px;
			}
			.title{
				display:flex;
				align-items:center;
				padding:2px 0 8px 0;
				height:18px;
				line-height:18px;
				.brand{
					margin-right:6px;
					width:30px;
					height:18px;
					@include bg-image("./imgs/brand");
					background-size:30px 18px;
				}
				.seller-name{
					font-size:16px;
					font-weight:bold;
				}
			}
			.description{
				font-size:12px;
				line-height:12px;
			}
			.brand,.support-icon{
				background-position:center;
				background-repeat:no-repeat;
			}
			.support{
				margin-top:10px;
				display:flex;
				height:12px;
				.support-icon{
					margin-right:4px;
				}
				.text{
					font-size:10px;
					line-height:12px;
				}
			}
			.supports-count{
				position:absolute;
				bottom:15px;
				right:12px;
				height:24px;
				width:43px;
				text-align:center;
				line-height:24px;
				font-size:12px;
				background-color:rgba(0,0,0,.2);
				border-radius:12px;
				.text{
					vertical-align:top;
				}
				.icon-previewright{
					padding-left:2px;
					font-size:12px;
				}
			}
		}
		.bulletin-wrapper{
			display:flex;
			justify-content:space-between;
			align-items:center;
			padding:0 12px;
			height:28px;
			background-color:rgba(7,17,27,0.2);
			.bulletin-title{
				margin-right:4px;
				width:22px;
				height:12px;
				@include bg-image("./imgs/bulletin");
				background-size:22px 12px;
				background-repeat:no-repeat;
			}
			.text{
				font-size:10px;
				line-height:28px;
			}
			.icon-previewright{
				font-size:10px;
			}
		}
		.seller-bg{
			position:absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
			background-position:top center;
			z-index:-1;
			filter:blur(10px);
		}
		.fade-enter-active,.fade-leave-active{
			transition:all .5s;
		}
		.fade-enter,.fade-leave-to{
			opacity:0;
		}
		.fade-enter-to,.fade-leave{
			opacity:1;
			background-color:rgb(7,17,27,.8);
		}
	}
</style>

<template>
	<div class="detail-page slide-enter">
		<template v-if="loading===true">
			<Loading/>
		</template>
		<template v-else>
			<Header>
				<i class="iconfont icon-back" @touchstart="handleBack"></i>
				<span>{{details.nm}}</span>
			</Header>
			<section class="detail-body">
				<div class="details">
					<div class="bg"
						:style="{
							backgroundImage:'url('+details.img.replace(/w\.h/,'128.180')+')',
							backgroundColor:details.backgroundColor
						}"
					></div>
					<div class="movie-detail">
						<div class="poster">
							<img :src="details.img|setSize('128.180')">
						</div>
						<div class="info">
							<p class="title">{{details.nm}}</p>
							<p class="eng-title">{{details.enm}}</p>
							<p class="rate">
								{{details.sc}}
								<span>({{details.watched}}人已观影)</span>
							</p>
							<p class="category">{{details.cat}}</p>
							<p class="dur">
								{{details.src}}
								<span>/</span>
								<span>{{details.dur}}分钟</span>
							</p>
							<p class="publish-time">{{details.pubDesc}}</p>
						</div>
					</div>
					<div class="btn">
						<button class="wish-btn">
							<i class="iconfont icon-xin"></i>
							想看
						</button>
						<button class="rate-btn">
							<i class="iconfont icon-iconfontxingxing"></i>
							评分
						</button>
					</div>
				</div>
				<section class="staff">
					<dl class="director">
						<dd>导演</dd>
						<dt>{{details.dir}}</dt>
					</dl>
					<dl class="actor">
						<dd>主演</dd>
						<dt>{{details.star}}</dt>
					</dl>
					<dl class="introduce" ref="introduce">
						<dd>影片介绍</dd>
						<dt>{{details.dra}}</dt>
					</dl>
				</section>
				<div class="swiper-wrapper" ref="swiper">
					<ul class="swiper-list">
						<li 
							v-for="(item,index) in details.photos" 
							:key="index" 
							class="swiper-item">
							<img :src="item | setSize('128.180')" alt="">
						</li>
					</ul>
				</div>
			</section>
		</template>
	</div>
</template>

<script>
	import Header from "@/components/Header"
	import Loading from "@/components/Loading"
	import axios from "axios"
	import BScroll from "better-scroll"
	export default{
		name:"detail-body",
		components:{Header,Loading},
		data(){
			return{
				details:{},
				loading:true
			}
		},
		props:["movieId"],
		methods:{
			handleBack(){
				this.$router.back();
			}
		},
		mounted(){
			this.$axios("/api/detailmovie?movieId="+this.movieId).then(res=>{
				if(res.data.msg === "ok"){
					this.loading = false;
					this.details = res.data.data.detailMovie;
					console.log(res.data.data.detailMovie);
					this.$nextTick(()=>{
						let scroll = new BScroll(this.$refs.swiper,{
							scrollX:true,
							scrollY:false,
							startX:0,
							probeType:1
						})
					})
				}
			})
		},
	}
</script>

<style scoped lang="scss">
	.detail-page{
		display:flex;
		flex-direction:column;
		position:absolute;
		width:100%;
		height:100%;
		left:0;
		top:0;
		z-index:100;
		background-color:#f6f6f6;
		img{
			display:block;
			width:100%;
			height:100%;
		}
		section.detail-body{
			flex:1;
			overflow:auto;
		}
		i.icon-back{
			position:absolute;
			left:.5rem;
			top:50%;
			transform:translateY(-50%);
		}
		.details{
			height:4.43rem;
			position:relative;
			overflow:hidden;
			.bg{
				position:absolute;
				width:100%;
				height:100%;
				left:0;
				top:0;
				background-repeat:no-repeat;
				background-size:cover;
				background-position:top center;
				z-index:-1;
				filter:blur(4px) opacity(90%);
				background-blend-mode:multiply;
			}
			.btn{
				display:flex;
				padding:0.22rem 0.3rem 0 0.3rem;
				height:0.6rem;
				justify-content:space-between;
				.wish-btn,.rate-btn{
					width:3.34rem;
					height:0.6rem;
					background-color:rgba(0,0,0,.2);
					border-radius:5px;
					color:#e6e6e6;
				}
				i.iconfont{
					color:#cac4bf;
				}
			}
		}
		.movie-detail{
			display:flex;
			height:3rem;
			padding:0.24rem 0.3rem 0.22rem 0.3rem;
			.poster{
				width:2.2rem;
				height:3.0rem;
			}
			.info{
				width:3.9rem;
				margin-left:0.2rem;
				color:#cfccca;
			}
			.title,.eng-title{
				width:100%;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				color:#fff;
			}
			.title{
				font-size:.3rem;
				font-weight:bold;
				line-height:0.5rem;
			}
			.rate{
				line-height:0.55rem;
				font-size:0.28rem;
				color:#ffc600;
				span{
					color:#cfccca;
				}
			}
			.category,.dur,.publish-time{
				line-height:0.4rem;
			}

		}
		.staff{
			color:#3e3e3e;
			padding:.24rem .3rem 0 .3rem;
			dd{
				font-size:0.3rem;
				font-weight:bold;
				margin-left:0;
			}
			dt{
				margin-top:0.1rem;
				line-height:0.36rem;
			}
		}
	}
	.detail-page.slide-enter{
		animation:slide-enter .3s linear;
	}
	.swiper-wrapper{
		margin:0.3rem 0.24rem 0 0.24rem;
		height:1.28rem;
		overflow:hidden;
		.swiper-list{
			display:flex;
			height:100%;
			width:500%;
			align-items:center;
			flex-direction:row;
			min-width:100%;
			overflow-x:auto;
		}
		.swiper-item{
			width:2.56rem;
			height:1.28rem;
			margin-right:0.25rem;
		}

	}
	@keyframes slide-enter{
		0%{
			transform:translateX(100%);
		}
		100%{
			transform:translateX(0%);
		}
	}
</style>

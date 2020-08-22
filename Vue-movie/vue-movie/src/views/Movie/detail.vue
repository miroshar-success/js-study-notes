<template>
	<div>
		<Loading v-if="loading"/>
		<template v-else>
			<div class="detail_body slide-enter-active">
				<Head :title="details.nm">
					<i class="iconfont icon-back" @touchstart="goBack"></i>
				</Head>
				<div class="movie_detail">
					<div class="bg" 
						:style="{backgroundImage:'url('+ details.videoImg +')',backgroundColor:details.backgroundColor}"
					></div>
					<section class="movie_info">
						<div class="poster">
							<img :src="details.videoImg" :alt="details.nm">
						</div>
						<div class="details">
							<h3 class="nm">{{details.nm}}</h3>
							<p class="enm">{{details.enm}}</p>
							<p class="category">{{details.cat}}</p>
							<p class="area">
								<span>{{details.src}} / </span>
								<span>{{details.dur}}分钟</span>
							</p>
							<p class="puhlish_date">{{details.pubDesc}}</p>	
						</div>
					</section>
					<div class="btn">
						<button class="wish_btn">
							<i class="iconfont icon-xin"></i>
							想看
						</button>
						<button class="rate_btn">
							<i class="iconfont icon-iconfontxingxing"></i>
							评分
						</button>
					</div>
				</div>
				<p class="introduce">{{details.dra}}</p>
			</div>		
		</template>
	</div>
</template>

<script>
	import Head from "@/components/Head"
	import Loading from "@/components/Loading"
	export default{
		name:"movie_detail",
		data(){
			return{
				details:{},
				loading:true
			}
		},
		components:{
			Head,
			Loading
		},
		created(){
			let movieId = this.$route.params.movieId;
			this.$axios.get("/api/detailmovie?movieId="+movieId).then(response=>{
				if(response.data.msg === "ok"){
					this.details = response.data.data.detailMovie;
					this.loading = false;
				}
			})
		},
		methods:{
			goBack(){
				this.$router.back();
			}
		},
	}
</script>

<style scoped>
	.detail_body{
		z-index:100;
		position:absolute;
		top:0;
		right:0;
		width:100%;
		min-height:100%;
		background-color:#f6f6f6;
	}
	.icon-back{
		position:absolute;
		top:50%;
		transform:translateY(-50%);
		color:#e6e6e6;
		font-size:0.48rem;
		padding-left:0.22rem;
	}
	@keyframes slide-enter{
		0%{
			transform:translateX(100%);
		}
		100%{
			transform:translateX(0%);
		}
	}
	.slide-enter-active{
		animation:slide-enter .3s linear;
	}
	.movie_detail{
		position:relative;
		padding:0.24rem 0.3rem 0.37rem 0.3rem;
		height:3.82rem;
		border-bottom:0.01rem solid #dcdcdc;
		overflow:hidden;
		color:rgba(255,255,255,.7);
	}
	.movie_detail .bg{
		position:absolute;
		left:0;
		top:0;
		width:100%;
		height:100%;
		filter:blur(13px);
		transform:scale(1.3);
		z-index:-1;
		background-blend-mode:darken;
	}
	.movie_detail .movie_info{
		display:flex;
	}
	.movie_detail .poster{
		margin-right:0.2rem;
		width:2.2rem;
		height:3rem;
	}
	.movie_detail .nm,.movie_detail .enm{
		color:#fff;
		width:100%;
		text-overflow:ellipsis;
		overflow:hidden;
		white-space:nowrap;
	}
	.movie_detail .nm{
		font-size:0.3rem;
		font-weight:bold;
	}
	.movie_detail .category,.movie_detail .area,.movie_detail .puhlish_date{
		padding-top:0.2rem;
	}
	.movie_detail .btn{
		display:flex;
		padding-top:0.22rem;
		width:100%;
		height:0.6rem;
		justify-content:space-between;
	}
	.btn .wish_btn,.btn .rate_btn{
		width:3.34rem;
		height:0.6rem;
		background-color:rgba(0,0,0,.2);
		border-radius:5px;
		color:#e6e6e6;
	}
	.detail_body .introduce{
		padding:0.3rem 0.24rem 0 0.24rem;
	}
</style>

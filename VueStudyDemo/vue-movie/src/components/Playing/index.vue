<template>
	<div class="movie-body">
		<template v-if="loading===true">
			<Loading/>
		</template>
		<template v-else>
			<Scroll>
				<ul class="movie-list">
					<li 
						class="movie-item" 
						v-for="(item,index) in movieList" 
						:key="index"
						@tap="handleToDetail(item.id)"
					>
						<div class="left">
							<div class="movie-poster">
								<img :src="item.img | setSize('128.180')" alt="">
							</div>
							<div class="movie-info">
								<h3 class="title">{{item.nm}}</h3>
								<template v-if="item.sc">
									<p class="rate">
										猫眼评分
										<span>{{item.sc}}</span>
									</p>
								</template>
								<p class="actor">主演:{{item.star}}</p>
								<p class="number">{{item.showInfo}}</p>
							</div>
						</div>
						<button class="buy-btn">购买</button>
					</li>
				</ul>
			</Scroll>
		</template>
	</div>
</template>

<script>
	import {messagebox} from "@/components/MessageBox/index.js"
	export default{
		name:"playing",
		data(){
			return{
				movieList:[],
				loading:true,
				prevId:-1
			}
		},
		activated(){
			this.fetchData();
		},
		mounted(){
			this.$axios("/api/getLocation").then(res=>{
				if(res.data.msg === "ok"){
					let cityinfo = res.data.data;
					let that = this;
					setTimeout(()=>{
						messagebox({
							title:cityinfo.nm,
							confirm:"确定",
							cancel:"取消",
							handleConfirm(){
								that.$store.commit("changeCity",{city:cityinfo.nm,id:cityinfo.id})
								window.localStorage.setItem("city",cityinfo.nm);
								window.localStorage.setItem("id",cityinfo.id);
								that.fetchData();
							}
						})
					},2000)
				}
			})
		},
		methods:{
			fetchData(){
				// 从城市切换过来,当城市id不同的时候,需要重新请求数据,否则不重新请求
				let id = this.$store.state.id;
				if(id === this.prevId) return;
				this.loading = true;
				this.$axios(`/api/movieOnInfoList?cityId=${id}`).then(res=>{
					if(res.data.msg === "ok"){
						this.movieList = res.data.data.movieList;
						this.loading = false;
						this.prevId = id;
					}
				})
			},
			handleToDetail(movieId){
				this.$router.push("/movie/detail/"+movieId);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.movie-body{
		padding-left:0.24rem;
		.movie-item{
			display:flex;
			justify-content:space-between;
			height:1.8rem;
			padding:0.24rem 0 0.23rem 0;
			border-bottom:1px solid rgb(215,215,215);
			.left{
				width:5.58rem;
				display:flex;
			}
		}
		.movie-poster{
			width:1.28rem;
			height:1.8rem;
			img{
				width:1.28rem;
				height:1.8rem;
			}
		}
		.movie-info{
			width:4.38rem;
			margin-left:0.22rem;
			flex:1;
			.title{
				font-size:0.28rem;
				color:rgb(32,32,32);
				line-height:0.52rem;
				font-weight:bold;
			}
			.title,.actor{
				width:100%;
				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap;
			}
			.actor,.rate,.number{
				font-size:0.22rem;
				line-height:0.4rem;
			}
			.actor,.rate{
				color:rgb(113,113,113);
			}
			.number{
				color:rgb(150,150,150);
			}
			.rate>span{
				font-size:0.28rem;
				color:rgb(211,210,53);
			}
		}
		.buy-btn{
			margin:0.64rem 0.24rem 0 0;
			width:1rem;
			height:0.6rem;
			background-color:rgb(238,69,57);
			color:#fff;
			border-radius:5px;
		}
	}
</style>

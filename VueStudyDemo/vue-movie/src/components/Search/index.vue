<template>
	<div class="search-body">
		<div class="search-wrapper">
			<div class="search">
				<i class="iconfont icon-search"></i>
				<input type="text" v-model="searchText" placeholder="找影视剧、影院、演出">
			</div>
			<p class="cancel" @touchstart="handleCancelSearch">取消</p>
		</div>
		<template v-if="searchText.length">
			<div class="search-result" v-if="moviesList.length">
				<template v-if="loading===true">
					<Loading/>
				</template>
				<template v-else>
					<p class="category">电影/电视剧/综艺</p>
					<ul class="search-list">
						<li class="movie-item" v-for="(item,index) in moviesList" :key="index">
							<div class="movie-poster">
								<img :src="item.img | setSize('128.180')" alt="">
							</div>
							<div class="movie-info">
								<p class="title">{{item.nm}}</p>
								<p class="english-title">{{item.enm}}</p>
								<template>
									<p class="rate" v-if="item.sc">猫眼评分 <span>{{item.sc}}</span></p>
									<p v-else>暂无评分</p>
								</template>
								<p class="time">{{item.pubDesc}}</p>
							</div>
						</li>
					</ul>
				</template>
			</div>
		</template>
		<template v-else>
			<p class="search-history" v-show="searchHistory.length">
				<i class="iconfont icon-shizhong"></i>
				{{searchHistory}}
			</p>
		</template>
	</div>
</template>

<script>
	export default{
		name:"search",
		data(){
			return{
				searchText:"",
				moviesList:[],
				searchHistory:"",
				loading:false
			}
		},
		watch:{
			searchText(val){
				this.cancelRequest();
				const that = this;
				let id = this.$store.state.id;
				this.$axios.get(`/api/searchList?cityId=${id}&kw=${val}`,{
					cancelToken:new this.$axios.CancelToken(function executor(c){
						that.source = c;
					})
				}).then(res=>{
					this.loading = true;
					if(res.data.msg === "ok"){
						this.searchHistory = val;
						this.moviesList = res.data.data.movies.list;
						this.loading = false;
					}
				}).catch(err=>{
					if(this.$axios.isCancel(err)){
						console.log("请求取消",err.message)
					}else{
						this.moviesList = [];
					}
				})
			}
		},
		methods:{
			cancelRequest(){
				if(typeof this.source === "function"){
					this.source("终止请求");
				}
			},
			handleCancelSearch(){
				if(this.searchText.length){
					this.searchText = "";
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-wrapper{
		display:flex;
		padding:0.15rem 0.2rem 0.14rem 0.2rem;
		justify-content:space-between;
		align-items:center;
		border-bottom:1px solid rgb(231,231,231);
		.search{
			display:flex;
			align-items:center;
			width:6.24rem;
			height:0.56rem;
			background-color:#fff;
			line-height:0.56rem;
			input{
				flex:1;
				height:100%;
				border-radius:4px;
			}
		}
		i.iconfont{
			margin:0 0.12rem 0 0.15rem;
			color:rgb(169,169,169);
		}
		.cancel{
			color:rgb(192,82,90);
			font-size:0.3rem;
		}
	}
	.search-result{
		.category{
			height:0.78rem;
			line-height:0.78rem;
			padding-left:0.3rem;
			color:#949494;
			font-size:0.28rem;
			border-bottom:1px solid #e7e7e7;
		}
		.search-list{
			padding-left:0.24rem;
		}
		.movie-item{
			display:flex;
			padding:0.24rem 0 0.23rem;
			border-bottom:1px solid #e7e7e7;
		}
		.movie-poster{
			margin-right:0.22rem;
			width:1.28rem;
			height:1.8rem;
			img{
				width:100%;
				height:100%;
				display:block;
			}
		}
		.movie-info{
			width:4.4rem;
			.title{
				font-size:0.3rem;
				font-weight:bold;
				color:#2f2f2f;
			}
			.title,.english-title{
				width:100%;
				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap;
			}
		}
	}
	.search-history{
		padding-left:0.32rem;
		height:0.85rem;
		line-height:0.85rem;
		color:#292929;
		.iconfont{
			color:#a7a7a7;
		}
	}
</style>

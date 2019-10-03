<template>
	<div class="search_body">
		<div class="search_box">
			<div>
				<i class="iconfont icon-search"></i>
				<input type="text" placeholder="找影视剧,影院,演出" v-model="keyword" v-focus>
			</div>
			<span class="cancle_btn">取消</span>
		</div>
		<div class="search_wrapper" v-if="keyword.length">
			<template v-if="searchList.length">
				<p class="type">电影/电视剧/综艺</p>
				<ul class="search_list">
					<li 
						class="movie_item"
						v-for="(item,index) in searchList"
						:key="index"
					>
						<div class="poster"><img :src="item.img | setSize('128.180')" :alt="item.nm"></div>
						<div class="info">
							<p class="title">{{item.nm}}</p>
							<p class="english_name">{{item.enm}}</p>
							<p class="cat">{{item.cat}}</p>
							<p class="date">{{item.pubDesc}}</p>
						</div>
					</li>
				</ul>
			</template>
			<template v-else>
				<p class="no_data">没有请求到数据^_^ !</p>
			</template>
		</div>
	</div>
</template>

<script>
	export default{
		name:"search",
		data(){
			return{
				keyword:'',
				searchList:[],
			}
		},
		//  异步监听使用watch
		watch:{
			keyword(value){
				this.cancelRequest();
				let that = this;
				let cityId = this.$store.state.cityId;
				this.$axios.get(`/api/searchList?cityId=${cityId}&kw=${value}`,{
					cancelToken:new this.$axios.CancelToken(function executor(c){
						that.source = c;
					})
				}).then(response=>{
					let msg = response.data.msg;
					let list = response.data.data.movies.list;
					if(msg && list.length){
						this.searchList = response.data.data.movies.list;
					}
				}).catch(err=>{
					if(err){
						if(this.$axios.isCancel(err)){
							console.log("请求取消",err.message);
						}else{
							this.searchList = [];
						}
					}
				})
			}
		},
		methods:{
			cancelRequest(){
				if(typeof this.source === "function"){
					this.source("终止请求");
				}
			}
		},
		directives:{
			focus:{
				inserted:function(el){
					el.focus();
				}
			}
		}
	}
</script>

<style scoped>
	.search_body{
	}
	.search_box{
		height:0.88rem;
		padding:0 0.2rem;
		background-color:#f5f5f5;
		border-bottom:0.01rem solid #e5e5e5;
		display:flex;
		justify-content:space-between;
		align-items:center;
	}
	.search_box div{
		display:flex;
		align-items:center;
		width:6.24rem;
		height:.56rem;
		border:0.01rem solid #e5e5e5;
		border-radius:.08rem;
		background-color:#ffffff;
	}
	.search_box .iconfont{
		padding:0 0.15rem 0 0.15rem;
		color:#b2b2b2;
	}
	.search_box input{
		height:100%;
		flex:1;
		color:#b2b2b2;
	}
	.cancle_btn{
		color:#ef4238;
		font-size:0.3rem;
	}
	.search_wrapper .type{
		height:0.78rem;
		padding-left:0.22rem;
		border-bottom:0.01rem solid #e5e5e5;
		line-height:0.78rem;
		color:#999;
	}
	.search_list{
		padding-left:0.24rem;
	}
	.search_list .movie_item{
		display:flex;
		height:1.8rem;
		padding:0.24rem 0 0.24rem 0;
		border-bottom:0.01rem solid #e5e5e5;
	}
	.movie_item .info{
		flex:1;		
		overflow:hidden;
	}
	.movie_item .title{
		width:100%;
		font-size:0.3rem;
		font-weight:bold;
		white-space:nowrap;
		text-overflow:ellipsis;
		overflow:hidden;
	}
	.movie_item .date,.movie_item .cat{
		color:#666;
		line-height:0.4rem;
	}
	.movie_item .poster{
		width:1.28rem;
		height:1.8rem;
		margin-right:0.22rem;
	}
	.no_data{
		text-align:center;
		flex:1;
		line-height:5rem;
	}
</style>

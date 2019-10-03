<template>
	<Loading v-if="loading"/>
	<PullRefresh v-else>
		<div class="upcoming">
			<div class="coming_list">
				<section v-for="(movieList,index) in comingList" :key="index">
					<p class="movie_date">{{movieList.comingTitle}}</p>
					<div class="movie_item" v-for="item in movieList.list" :key="item.id" @tap="handleToDetail(item.id)">
						<div class="poster">
							<img :src="item.img | setSize('128.180')" :alt="item.nm">
						</div>
						<div class="movie_info">
							<h3 class="title">{{item.nm}}</h3>
							<p>
								<template v-if="item.sc">
									点映评 <span class="rate" >{{item.sc}}</span>
								</template>
							<p>
							<p class="wish">
								<span>{{item.wish}}</span>
								人想看
							</p>
							<p class="actor">
								<template v-if="item.star">
									主演:{{item.star}}
								</template>
							</p>
							<p class="date">{{item.rt}}大陆上映</p>
						</div>
						<button class="booking_btn">想看</button>
					</div>			
				</section>
			</div>
		</div>
	</PullRefresh>
</template>

<script>
	export default{
		name:"upcoming",
		data(){
			return{
				comingList:[],
				prevCityId:-1,
				loading:true
			}
		},
		activated(){
			let cityId = this.$store.state.cityId;
			if(this.prevCityId === cityId) return;
			this.loading = true;
			this.$axios.get("/api/movieComingList?cityId="+cityId).then(res=>{
				if(res.data.msg === "ok"){
					this.comingList = this.formData(res.data.data.comingList);
					this.loading = false;
					this.prevCityId = cityId;
				}
			})
		},
		//  改造数据 : movieList:[ { comingTitle:"2018-8-1", list:[ {},{} ]} ]
		methods:{
			formData(comingList){
				let movieList = [];
				for(let i = 0; i < comingList.length; i++){
					let comingTitle = comingList[i].comingTitle;
					//  如果不存在
					if( isExist(comingTitle) ){
						movieList.push({comingTitle:comingTitle,list:[comingList[i]]});
					}else{
						for(let j = 0; j < movieList.length; j++){
							if(movieList[j].comingTitle === comingTitle){
								movieList[j].list.push(comingList[i]);
							}
						}
					}
				}
				function isExist(comingTitle){
					for(let i = 0; i < movieList.length; i++){
						if(movieList[i].comingTitle === comingTitle){
							return false;  // 如果为false，则表示存在该字段
						}
					}
					return true;	// 表示不存在该字段
				}
				return movieList;
			},
			handleToDetail(movieId){
				this.$router.push("/movie/detail/upcoming/" + movieId);
			}
		}
	}
</script>

<style scoped>
.upcoming{
	padding-bottom:0.98rem;
	overflow:auto;
	background-color:#ffffff;
}
.coming_list section{
	padding:0.24rem 0 0 0.24rem;
}
.movie_item{
	display:flex;
	padding-top:0.24rem;
	padding-bottom:0.23rem;
	height:1.8rem;
	border-bottom:0.01rem solid #d7d7d7;
	align-items:center;
}
.movie_item .poster{
	width:1.28rem;
	height:1.8rem;
}
.movie_item .movie_info{
	width:4.22rem;
	margin-left:0.22rem;
}
.movie_item .title,.movie_item .actor{
	width:100%;
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
.movie_item .title{
	font-size:0.3rem;
	font-weight:bold;
}
.movie_info .wish span,.movie_info .rate{
	font-size:0.28rem;
	color:#ffb400;
}
.movie_info .date{
	padding-top:0.14rem;
	color:#999999;
}
.movie_info .actor{
	color:#666666;
}
.movie_item .booking_btn{
	width:1rem;
	height:0.6rem;
	background-color:#52b0eb;
	color:#fff;
	border:none;
	border-radius:0.08rem;
}
</style>

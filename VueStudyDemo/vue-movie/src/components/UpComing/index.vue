<template>
	<div class="coming-list-body">
		<template v-if="loading===true">
			<Loading/>
		</template>
		<template v-else>
			<Scroll>
				<div>
					<section v-for="(item,index) in comingList" :key="index">
						<p class="coming-title">{{item.comingTitle}}</p>
						<ul class="coming-list">
							<li 
								class="movie-item" 
								v-for="(movie,index) in item.list" 
								:key="index"
							>
								<div class="left">
									<div class="movie-poster">
										<img :src="movie.img | setSize('128.180')" alt="">
									</div>
									<div class="movie-info">
										<h4 class="title">{{movie.nm}}</h4>
										<p class="wish"><span>{{movie.wish}}</span>人想看</p>
										<p class="actor">主演:{{movie.star}}</p>
										<p class="showInfo">{{movie.showInfo}}</p>
									</div>
								</div>
								<button class="prev-btn">预售</button>
							</li>
						</ul>
					</section>
				</div>
			</Scroll>
		</template>
	</div>
</template>

<script>
	export default{
		name:"coming",
		data(){
			return{
				comingList:[],
				loading:true,
				prevId:-1
			}
		},
		activated(){
			let id = this.$store.state.id;
			if(this.prevId === id) return;
			this.loading = true;
			this.$axios(`/api/movieComingList?cityId=${id}`).then(res=>{
				if(res.data.msg === "ok"){
					let comingList = res.data.data.comingList;
					this.comingList = this.formatComingList(comingList);
					this.loading = false;
					this.prevId = id;
				}
			})
		},
		methods:{
			// 转化数据格式为: [{comingTitle:"8月23日 周五",list:[]}]
			formatComingList(data){
				let comingList = [];
				for(let i = 0, len = data.length; i < len; i++){
					let comingTitle = data[i].comingTitle;
					if( isExist(comingTitle) ){
						for(let j = 0; j < comingList.length; j++){
							if(comingList[j].comingTitle === comingTitle){
								comingList[j].list.push(data[i])
							}
						}
					}else{
						comingList.push({comingTitle,list:[data[i]]})
					}
				}
				
				function isExist(comingTitle){
					for(let i = 0,len = comingList.length; i < len; i++){
						if(comingList[i].comingTitle === comingTitle){
							return true;
						}
					}
					return false;
				}
				return comingList;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coming-list-body{
		background-color:#fff;
		section{
			padding-left:0.24rem;
			.coming-title{
				padding-top:0.25rem;
				color:rgb(52,52,52);
			}
		}
		.movie-item{
			display:flex;
			justify-content:space-between;
			padding:0.24rem 0 0.23rem 0;
			height:1.8rem;
			border-bottom:1px solid rgb(214,214,214);
			.left{
				display:flex;
				width:5.58rem;
			}
		}
		.movie-poster{
			margin-right:0.22rem;
			width:1.28rem;
			height:1.8rem;
			img{
				width:1.28rem;
				height:1.8rem;
				display:block;
			}
		}
		.movie-info{
			width:4.4rem;
			.title{
				color:rgb(28,28,28);
				font-size:0.28rem;
				font-weight:bold;
				line-height:0.52rem;
			}
			.wish,.actor{
				color:rgb(94,94,94);
				font-size:0.25rem;
			}
			.wish>span{
				font-size:0.3rem;
				color:rgb(245,206,36);
			}
			.showInfo{
				color:rgb(147,147,147);
			}
			.wish,.actor,.showInfo{
				line-height:0.4rem;
			}
			.title,.actor{
				width:100%;
				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap;
			}
		}
		.prev-btn{
			margin-top:0.64rem;
			margin-right:0.24rem;
			width:1rem;
			height:0.6rem;
			background-color:rgb(83,177,234);
			color:#fff;
			border-radius:4px;
		}
	}
</style>

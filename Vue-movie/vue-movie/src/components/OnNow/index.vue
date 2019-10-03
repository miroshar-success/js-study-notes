<template>
	<Loading v-if="loading"/>
	<PullRefresh v-else>
		<div class="on_now">
			<ul class="movie_list">
				<li
					class="movie_item" 
					v-for="(item,index) in movieList" 
					:key="index"
					@tap="handleToDetail(item.id)"
				>
					<div class="poster">
						<img :src="item.img | setSize('128.180')" :alt="item.nm">
					</div>
					<div class="movie_info">
						<h3 class="title">{{item.nm}}</h3>
						<p class="rate">
							猫眼评分 <span>{{item.sc}}</span>
						<p>
						<p class="actor">{{item.star}}</p>
						<p class="number">{{item.showInfo}}</p>
					</div>
					<button class="buy_ticket">购票</button>
				</li>
			</ul>
		</div>		
	</PullRefresh>
</template>
<script>
	import TopNav from "@/components/TopNav"
	import {messageBox} from "../../utils/index.js"
	export default{
		name:"onnow",
		data(){
			return{
				movieList:[],
				loading:true,
				prevCityId:-1,
				position:"",
				id:-1
			}
		},
		activated(){
			this.fetchData();
		},
		filters:{
			getDimensions(value){
				return value.substring(1,2)+"D";
			}
		},
		created(){
			this.$axios("/api/getLocation").then(res=>{
				if(res.data.msg === "ok"){
					this.position = res.data.data.nm;
					this.id = res.data.data.id;
				}
			});
		},
		mounted(){
			let _this = this;
			setTimeout(()=>{
				messageBox({
					title:"您当前的城市为",
					content:_this.position,
					confirm:"确认",
					cancel:"切换城市",
					handleCancel(){
						_this.$router.push("/movie/city");
					},
					handleConfirm(){
						//  重新设置本地存储的当前城市及id
						window.localStorage.setItem("current_city",_this.position);
						window.localStorage.setItem("city_id",_this.id);
						_this.$store.commit("CURRENT_CITY",{nm:_this.position,id:_this.id});
						_this.fetchData();
					}
				})				
			},1500);
		},
		methods:{
			fetchData(){
				// 如果切换城市了再重新发起请求,否则不请求.
				let cityId = this.$store.state.cityId; 
				if(this.prevCityId === cityId) return;
				this.loading = true;	
				/* 此处loading变为true,是因为上次加载数据完成时loading为false了,初始值已经变化。如果切换城市还要Loading效果
				需要再手动赋值为true
				*/ 
				this.$axios.get("/api/movieOnInfoList?cityId="+cityId).then(res=>{
					if(res.data.msg === "ok"){
						this.movieList = res.data.data.movieList;
						this.loading = false;
						// 将当前的 cityId 赋值给 prevCityId;
						this.prevCityId = cityId;
					}
				})
			},
			handleToDetail(movieId){
				this.$router.push("/movie/detail/onnow/"+movieId);
			}
		}
	}
</script>

<style scoped>
	.on_now{
		overflow:auto;
		background-color:#ffffff;
	}
	.movie_item{
		display:flex;
		padding:0.24rem;
		height:1.8rem;
		background-color:#ffffff;
		border-bottom:0.01rem solid #d7d7d7;
		align-items:center;
	}
	.movie_item .poster{
		width:1.28rem;
		height:1.8rem;
	}
	.movie_item .movie_info{
		position:relative;
		width:3.34rem;
		margin-left:0.22rem;
		margin-right:1.18rem;
	}
	.movie_info .rate,.movie_info .actor{
		color:#5f5f5f;
		line-height:0.4rem;
	}
	.movie_info .number{
		color:#929292;
		line-height:0.4rem;
	}
	.movie_info .rate>span{
		color:#f1ca4c;
		font-size:0.32rem;
	}
	.movie_item .title{
		font-size:0.3rem;
		font-weight:bold;
		color:#191919;
		line-height:0.5rem;
	}
	.movie_item .actor{
		width:100%;
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
	}
	.movie_item .buy_ticket{
		width:1rem;
		height:0.6rem;
		background-color:#ee4539;
		color:#fff;
		border:none;
		border-radius:.1rem;
	}
</style>

<template>
	<div class="cinema_body">
		<div class="switch_cinema">
			<div class="whole_city">
				<p>全城</p>
				<i class="iconfont icon-arrowdown-copy"></i>
			</div>
			<div class="pipe">|</div>
			<div class="brand">
				<p>品牌</p>
				<i class="iconfont icon-arrowdown-copy"></i>
			</div>
			<div class="pipe">|</div>
			<div class="unique">
				<p>特色</p>
				<i class="iconfont icon-arrowdown-copy"></i>
			</div>
		</div>
		<template v-if="isLoading">
			<Loading/>
		</template>
		<template v-else>
			<div class="cinema_list">
				<p class="updateMsg" v-show="loading">{{updateMsg}}</p>
				<PullRefresh
					:handlePullDown="handlePullDown"
					:handleTouchEnd="handleTouchEnd"
				>
					<ul class="cinema_wrapper">
						<li class="cinema_item"
							v-for="item in cinemaList"
							:key="item.id"
							@tap="handleGoDetail"
						>
							<div class="head">
								<span class="cinema_name">{{item.nm}}</span>
								<span class="cinema_price">{{item.sellPrice}}元</span>
							</div>
							<div class="cinema_detail">
								<span class="address">{{item.addr}}</span>
								<span class="distance">{{item.distance}}</span>
							</div>
							<ul class="tag">
								<template
									v-for="(tag,index) in item.tag" 
								>
									<li 
										class="cinema_tags"
										:key="index"
										v-if="typeof(tag) !== 'object'"
									>
										<span :class=" index | formColor">{{index | formTag}}</span>
									</li>						
								</template>
							</ul>
						</li>
					</ul>				
				</PullRefresh>
			</div>
		</template>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	export default{
		name:"cinemaList",
		data(){
			return{
				cinemaList:[],
				loading:false,
				updateMsg:"",
				isLoading:true,
				prevCityId:-1
			}
		},
		activated(){
			this.fetchData();
		},
		filters:{
			formTag(tag){
				let tagValues = [
					{key:"allowRefund",value:"退"},
					{key:"snack",value:"小吃"},
					{key:"vipTag",value:"折扣卡"},
					{key:"endorse",value:"改签"},
				]
				for(let i = 0; i < tagValues.length; i++){
					if(tagValues[i].key === tag){
						return tagValues[i].value
					}
				}
				return ""
			},
			formColor(tag){
				let tagColors = [
					{key:"allowRefund",tagClass:"return"},
					{key:"snack",tagClass:"card"},
					{key:"vipTag",tagClass:"card"},
					{key:"endorse",tagClass:"return"},
				]
				for(let i = 0, len = tagColors.length; i < len; i++){
					if(tagColors[i].key === tag){
						return tagColors[i].tagClass;
					}
				}
				return ""
			}
		},
		methods:{
			handleGoDetail(){
				console.log("去到详情页");
			},
			fetchData(){
				let cityId = this.$store.state.cityId;
				if(this.prevCityId === cityId) return;
				this.isLoading = true;
				this.$axios.get("/api/cinemaList?cityId="+cityId).then(response=>{
					if(response.data.msg === "ok"){
						this.cinemaList = response.data.data.cinemas;
						// 进入页面刷新
						this.isLoading = false;
						//  数据请求完成后 修改文本为数据显示完成, 再隐藏文本内容!
						this.updateMsg = "数据更新完成!";
						setTimeout(()=>{
							this.loading = false;
						},100);
						this.prevCityId = cityId;
					}
				});
			},
			//  开始下拉,当下拉高度大于30的时候, 显示 默认的 ----
			handlePullDown(pops){
				if(pops.y > 30){
					this.loading = true;
					this.updateMsg = "- - - ";
				}
			},
			// 当开始松手的时候,开始请求数据,并将文本修改为 更新数据
			handleTouchEnd(){
				this.updateMsg = "更新数据......"
				//  请求数据...
				this.fetchData();
			}
		}
	}
</script>

<style scoped>
	.switch_cinema{
		width:100%;
		height:0.8rem;
		display:flex;
		justify-content:space-between;
		align-items:center;
		border-bottom:0.02rem solid #e4e4e4;
		font-size:0.24rem;
		color:#656565;
	}
	.switch_cinema .whole_city,.switch_cinema .brand,.switch_cinema .unique{
		display:flex;
		flex:1;
		justify-content:center;
		align-items:center;
	}
	.switch_cinema .iconfont{
		color:#c9c9c9;
	}
	.content .cinema_body{
		display:flex;
		flex-direction:column;
		position:absolute;
		width:100%;
		top:0;
		left:0;
		bottom:0.98rem;
		background-color:#fff;
	}
	.content .cinema_list{
		position:relative;
		flex:1;
		overflow:scroll;
	}
	.cinema_list .cinema_wrapper{
		padding-left:0.24rem;
		background-color:#fff;
	}
	.cinema_item{
		padding:0.37rem 0.25rem 0.37rem 0;
		border-bottom:0.01rem solid #e5e5e5;
	}
	.head .cinema_name{
		font-size:0.3rem;
		color:#000;
	}
	.head .cinema_price{
		color:#ef4238;
	}
	.cinema_detail{
		height:0.65rem;
		line-height:0.65rem;
	}
	.cinema_detail .address{
		width:5.75rem;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		color:#666666;
		font-size:0.24rem;
	}
	.cinema_detail .distance{
		color:#999;
	}
	.cinema_item .head,.cinema_item .cinema_detail,.cinema_item .tag{
		display:flex;
		justify-content:space-between;
	}
	.cinema_item .tag{
		justify-content:flex-start;
	}
	.cinema_tags>span{
		margin-right:0.08rem;
		padding:0.05rem;
		font-size:0.2rem;
	}
	.rebook,.return{
		color:#589daf;
	}
	.snack,.card{
		color:#ff9900;
	}
	.sell{
		color:#ff7979;
	}
	.rebook,.return,.snack,.card,.sell{
		border-width:0.01rem;
		border-style:solid;
		border-radius:0.05rem;
	}
	.updateMsg{
		text-align:center;
		color:#666;
	}
</style>

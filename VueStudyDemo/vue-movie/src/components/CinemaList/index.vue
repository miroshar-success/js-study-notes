<template>
	<div class="cinema-list-body">
		<ul class="switch-cinema">
			<li>
				<span>全城</span>
				<i class="iconfont icon-arrowdown-copy"></i>
			</li>
			<div class="right-line"></div>
			<li>
				<span>品牌</span>
				<i class="iconfont icon-arrowdown-copy"></i>
			</li>
			<div class="right-line"></div>
			<li>
				<span>特色</span>
				<i class="iconfont icon-arrowdown-copy"></i>
			</li>
		</ul>
		<div class="cinema-list-wrapper">
			<template v-if="loading===true">
				<Loading></Loading>
			</template>
			<template v-else>
				<Scroll>
					<ul class="cinema-list">
						<li v-for="(item,index) in cinemaList" :key="index" class="cinema-item">
							<div class="cinema-name">
								<p class="name">{{item.nm}}</p>
								<p class="price">{{item.sellPrice}}<span>元</span></p>
							</div>
							<div class="cinema-address">
								<p class="address">{{item.addr}}</p>
								<p class="distance">{{item.distance}}</p>
							</div>
							<div class="tag">
								<template v-for="(value,key) in item.tag">
									<span :key="key" v-if="value===1" 
									:class="tags[key]['class']"
									>{{tags[key]["value"]}}</span>
								</template>
							</div>
							<template v-if="item.promotion.cardPromotionTag">
								<p class="card">{{item.promotion.cardPromotionTag}}</p>
							</template>
						</li>
					</ul>
				</Scroll>
			</template>
		</div>
	</div>
</template>

<script>
	export default{
		name:"cinemaList",
		data(){
			return{
				cinemaList:[],
				tags:{
					allowRefund:{value:"退订",class:"allowRefund"},
					endorse:{value:"改签",class:"endorse"},
					snack:{value:"小吃",class:"snack"},
					sell:{value:"优惠",class:"sell"}
				},
				loading:true,
				prevId:-1
			}
		},
		activated(){
			this.fetchData();
		},
		methods:{
			fetchData(){
				let id = this.$store.state.id;
				if(this.prevId === id) return;
				this.loading = true;
				this.$axios.get(`/api/cinemaList?cityId=${id}`).then(res=>{
					if(res.data.msg === "ok"){
						this.cinemaList = res.data.data.cinemas;
						this.loading = false;
						this.prevId = id;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cinema-list-body{
		position:absolute;
		width:100%;
		top:0;
		left:0;
		bottom:0.96rem;
		display:flex;
		flex-direction:column;
		.switch-cinema{
			display:flex;
			align-items:center;
			width:100%;
			height:0.8rem;
			border-bottom:1px solid #e5e5e5;
			li{
				flex:1;
				text-align:center;
				line-height:0.8rem;
				color:#666;
			}
			.right-line{
				width:2px;
				height:0.4rem;
				background-color:#e5e5e5;
			}
			i.iconfont{
				color:#c5c5c5;
			}
		}
		.cinema-list-wrapper{
			padding-left:0.24rem;
			overflow:auto;
			.cinema-item{
				padding-top:0.36rem;
				padding-bottom:0.36rem;
				border-bottom:1px solid #dcdcdc;
			}
			.tag{
				.allowRefund{
					color:#f67779;
					border-color:#f67779;
				}
				.sell{
					color:#f4a619;
					border-color:#f4a619;;
				}
				.snack{
					color:#f6cc57;
					border-color:#f6cc57;
				}
				.endorse{
					color:#6f9b95;
					border-color:#6f9b95;
				}
				span{
					margin:0.12rem 0.1rem 0.12rem 0;
					display:inline-block;
					font-size:0.2rem;
					border-style:solid;
					border-width:1px;
					border-radius:2px;
					padding:0.03rem;
				}
			}
		}
		.cinema-name,.cinema-address{
			display:flex;
			justify-content:space-between;
		}
		.cinema-address{
			line-height:0.6rem;
		}
		.price,.distance{
			margin-right:0.25rem;
		}
		.name{
			font-size:0.3rem;
			color:#000;
		}
		.price{
			color:#cc5057;
			font-size:0.32rem;
			span{
				font-size:0.22rem;
			}
			&:after{
				content:"起";
				font-size:0.22rem;
				color:#a0a0a0;
			}
		}
		.address{
			width:5.8rem;
			text-overflow:ellipsis;
			overflow:hidden;
			white-space:nowrap;
			color:#656565;
		}
		.distance{
			color:#a0a0a0;
		}
		.card{
			color:#909090;
			font-size:0.2rem;
			&:before{
				margin-right:0.1rem;
				display:inline-block;
				content:"卡";
				width:0.32rem;
				height:0.32rem;
				border-radius:2px;
				background-color:#aa77e8;
				color:#fff;
				text-align:center;
				line-height:0.32rem;
				font-size:0.2rem;
			}
		}
	}
</style>

<template>
	<div class="goods-wrapper">
		<div class="goods-menu" ref="menu">
			<ul class="menu-list">
				<li 
					v-for="(item,index) in goods"
					:key="index"
					class="menu-item"
					:class="{currentMenuIndex:index===currentIndex}"
					@click="handleSelectMenu(index)"
				>
					<div class="text">
						<template v-if="item.type > 0">
							<SupportIcon :type='item.type' :size='3'/>
						</template>
						<span class='name'>{{item.name}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="goods-content" ref="content">
			<ul class="goods-list">
				<li 
					v-for="(item,index) in goods" 
					:key="index"
					class="goods-list-hook"
				>
					<h1 class="title">{{item.name}}</h1>
					<ul class="food-list">
						<li 
							class="food-item"
							v-for="(food,index) in item.foods"
							:key="index"
							@tap.stop="handleToDetail(food)"
						>
							<div class="icon">
								<img :src="food.icon" alt="" width="57" height="57">
							</div>
							<div class="info">
								<h2 class="food-name">{{food.name}}</h2>
								<p class="description" v-if="food.description">{{food.description}}</p>
								<div class="extra">
									<span class="sell-count">月售{{food.sellCount}}份</span>
									<span class="rating">好评率{{food.rating}}</span>
								</div>
								<div class="price">
									<span class="now-price">{{food.price}}</span>
									<span v-if="food.oldPrice" class="old-price">{{food.oldPrice}}</span>
								</div>
							</div>
							<div class="button-wrapper">
								<!-- 把具体的每个食品信息传递到控制按钮组件,这样每个按钮操作对应获取到的食品 -->
								<ButtonController :food="food"/>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<Detail :food="food" ref="detail"/>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	import ButtonController from "@/components/ButtonController";
	import Detail from "@/components/Detail";
	import SupportIcon from '@/components/SupportIcon'
	export default{
		name:"goods",
		data(){
			return{
				goods:[],
				types:["decrease","discount","guarantee","invoice","special"],
				listHeight:[],	// 商品详情每个类别数据的高度,
				scrollY:0,
				food:{}
			}
		},
		components:{ButtonController,Detail,SupportIcon},
		created(){
			this.$axios.get("/api/goods").then(res => {
				if(res.data.msg === 200){
					this.goods = res.data.goods
					console.log(res.data.goods);
					this.$nextTick(()=>{
						this._initScroll();
						this._calculateHeight();
					})
				}
			})
		},
		computed:{
			// 判断此时滚动在哪个区间
			currentIndex(){
				for(let i = 0; i < this.listHeight.length; i++){
					let h1 = this.listHeight[i];
					let h2 = this.listHeight[i+1];
					if(  !h2 ||  (this.scrollY >= h1 && this.scrollY < h2) ){
						return i;
					}
				}
				return 0;
			}
		},
		methods:{
			//  初始滚动,左侧的菜单栏和右侧的商品详细栏
			_initScroll(){
				this.MenuScroll = new BScroll(this.$refs.menu,{
					click:true,
					tap:true,
					probeType:1
				});
				this.ContentScroll = new BScroll(this.$refs.content,{
					click:true,
					tap:true,
					probeType:3
				})
				// 滚动时求出当前滚动的高度,并将此时的高度赋值给 scrollY
				this.ContentScroll.on("scroll",(pos)=>{
					this.scrollY = Math.abs( Math.round(pos.y) );
				})
			},
			_calculateHeight(){
				let FoodList = this.$refs.content.querySelectorAll(".goods-list-hook");
				let height = 0;	
				this.listHeight.push(0);
				FoodList.forEach(item => {
					height += item.scrollHeight;
					this.listHeight.push(height);
				})
			},
			// 点击左侧的菜单栏按钮,切换右侧的商品
			handleSelectMenu(index){
				this.$nextTick(() => {
					this.ContentScroll.scrollTo(0,-this.listHeight[index],200);
				})
			},
			// 点击商品去到对应的详情页。
			handleToDetail(data){
				this.food = data;
				this.$nextTick(() => {
					this.$refs.detail.show();
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "@/common/scss/mixin.scss";
	.goods-wrapper{
		display:flex;
		position:absolute;
		top:174px;
		bottom:48px;
		width:100%;
		.goods-menu{
			width:80px;
			overflow:auto;
			background-color:#f3f5f7;
		}
		.menu-item{
			padding:0 12px;
			display:table;
			height:54px;
			width:56px;
			.text{
				display:table-cell;
				color:#07111b;
				font-size:12px;
				line-height:12px;
				vertical-align:middle;
				@include border-bottom-1px(rgba(7,17,27,0.1));
				.name{
					vertical-align:top;
					line-height:12px;
				}
				.support-icon{
					margin-right:3px;
				}
			}
			&.currentMenuIndex{
				font-weight:700;
				font-size:12px;
				background-color:#fff;
				.text{
					@include border-bottom-1px(transparent);
				}
			}
		}
		.goods-content{
			flex:1;
			overflow:auto;
			background-color:#f3f5f7;
		}
		.goods-list{
			background-color:#fff;
			.title{
				padding-left:18px;
				height:26px;
				font-size:12px;
				color:rgb(147,153,159);
				line-height:26px;
				background-color:#f3f5f7;
				border-left:2px solid #d9dde1;
			}
			.food-list{
				padding:0 18px;
			}
			.food-item{
				display:flex;
				padding:18px 0;
				@include border-bottom-1px(rgba(7,17,27,0.1));
				.info{
					flex:1;
				}
				.icon{
					margin-right:10px;
					width:57px;
					height:57px;
				}
				.food-name{
					padding-top:2px;
					font-size:14px;
					color:rgb(7,17,27);
					line-height:14px;
				}
				.description,.extra{
					padding-top:6px;
					font-size:10px;
					color:rgb(147,153,159);
				}
				.description{
					line-height:12px;
				}
				.extra{
					line-height:10px;
					.sell-count{
						margin-right:12px;
					}
				}
				.now-price{
					margin-right:8px;
					font-size:14px;
					color:#f01414;
				}
				.old-price{
					font-size:10px;
					color:rgb(147,153,159);
					text-decoration:line-through;
				}
				.now-price,.old-price{
					font-weight:700;
					line-height:24px;
					&:before{
						content:"￥";
						font-size:10px;
					}
				}
				.button-wrapper{
					position:absolute;
					right:2px;
					bottom:19px;
				}
			}
			.food-item:last-child{
				border:none;
			}
		}
	}
</style>

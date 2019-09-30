<template>
	<div>
		<div class="list-control">
			<div class="list-control-filter">
				<span>品牌：</span>
				<span class="list-control-filter-item"
				v-for="(item,index) in brands"
				:key="index"
				@click="handleFilterBrand(item)"
				:class="{on:filterBrand===item}"
				>{{item}}</span>
			</div>
			<div class="list-control-order">
				<span>排序：</span>
				<span class="list-control-order-item"
					@click="handleOrderDefault"
					:class="{on:order===''}"
				>默认</span>
				<span class="list-control-order-item"
					@click="handleOrderSales"
					:class="{on:order==='sales'}"
				>销量
					<template v-if="order==='sales'">
						<i class="iconfont icon-icondown"></i>
					</template>
				</span>
				<span class="list-control-order-item"
					@click="handleOrderCost"
					:class="{on:order.startsWith('cost')}"
				>价格
					<template v-if="order==='cost-asc'">
						<i class="iconfont icon-iconup"></i>
					</template>
					<template v-if="order==='cost-desc'">
						<i class="iconfont icon-icondown"></i>
					</template>
				</span>
			</div>
		</div>
		<div 
		v-show="list.length"
		class="product-list"
		>
			<!-- 渲染过滤后的数据 -->
			<Product
				v-for="item in filteredAndOrderedList"	
				:key="item.id"
				:info="item"
			/>
			<div class="product-not-found"
				v-show="!filteredAndOrderedList.length"
			>
				暂无相关商品
			</div>
		</div>	
	</div>
</template>

<script>
	import Product from "@/components/product"
	export default{
		name:"list",
		components:{Product},
		data(){
			return{
				order:'',	// 商品排序 sales 按照销量排序, cost-desc 价格降序   cost-asc 价格升序
				filterBrand:"",
				filterColor:""
			}
		},
		computed:{
			// 获取数据列表
			list(){
				return this.$store.state.productList
			},
			// 获取数据里的所有品牌(去重后的数据)
			brands(){
				return this.$store.getters.brands
			},
			// 获取数据里的所有颜色(去重后的数据)
			colors(){
				return this.$store.getters.colors
			},
			filteredAndOrderedList(){
				let list = [...this.list];	// 复制一份原始数据
				// 按品牌过滤
				if(this.filterBrand !== ""){
					list = list.filter((item)=>item.brand === this.filterBrand)
				}
				if(this.order !== ""){
					if(this.order === "sales"){
						list = list.sort((a,b)=>b.sales - a.sales)
					}
					else if(this.order === "cost-desc"){
						list = list.sort((a,b)=>b.cost - a.cost)
					}
					else if(this.order === "cost-asc"){
						list = list.sort((a,b)=>a.cost - b.cost)
					}
				}
				return list;
			}	
		},
		mounted(){
			this.$store.dispatch("getProductList")
		},
		methods:{
			handleOrderDefault(){
				this.order = "";
			},
			handleOrderSales(){
				this.order = "sales";
			},
			handleOrderCost(){
				this.order = this.order === "cost-desc" ? "cost-asc" : "cost-desc"
			},
			handleFilterBrand(brand){
				// this.filterBrand = brand;
				this.filterBrand = this.filterBrand === brand ? "" : brand;
				console.log(brand);
			},
			handleFilterColor(color){
				this.filterColor = this.filterColor === color ? "" : color;
				console.log(color);
			}
		}
	}
</script>

<style lang="scss">
	.product-list{
		display:flex;
		flex-wrap:wrap;
	}
	.list-control{
		background:#fff;
		border-radius:6px;
		margin:16px;
		padding:16px;
		box-shadow:0 1px 1px rgba(0,0,0,.2);
	}
	.list-control {
		.list-control-order-item,.list-control-filter-item{
			cursor:pointer;
			display:inline-block;
			border:1px solid #e9eaec;
			border-radius:4px;
			margin-right:6px;
			padding:2px 6px;
			user-select:none;
		}
		.list-control-filter{
			margin-bottom:16px;
		}
	}
	.list-control-filter-item.on,
	.list-control-order-item.on{
		background-color:#f2352e;
		border:1px solid #f2352e;
		color:#fff;
	}
	.product-not-found{
		text-align:center;
		padding:32px;
	}
</style>

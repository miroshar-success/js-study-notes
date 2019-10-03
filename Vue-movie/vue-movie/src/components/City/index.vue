<template>
	<div class="city_body">
		<template v-if="loading">
			<Loading/>
		</template>
		<template v-else>
			<PullRefresh ref="scroll_ref">
				<section>
					<div class="hot_city">
						<p class="title">热门城市</p>
						<div class="hot_citylist">
							<ul class="city_wrapper">
								<li 
									@tap="handleGetCity(item.nm,item.id)"
									class="hotcity_item"
									v-for="item in hotCity" 
									:key="item.id"
								>{{item.nm}}</li>
							</ul>
						</div>
					</div>
					<div class="city_list" ref="city_sort">
						<div 
							v-for="item in cityList" 
							:key="item.index"
						>
							<p class="first_letter">{{item.index}}</p>
							<ul>
								<li 
									class="city_name"
									v-for="list in item.list" 
									:key="list.id"
									@tap="handleGetCity(list.nm,list.id)"
								>{{list.nm}}</li>
							</ul>
						</div>
					</div>				
				</section>			
			</PullRefresh>	
		</template>
		<ul class="city_index">
			<li
				v-for="(item,index) in cityList"
				:key="index"
				@touchstart="handleChangeCity(index)"
			>{{item.index}}</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:"city",
		data(){
			return{
				cityList:[],
				hotCity:[],
				loading:true
			}
		},
		created(){
			// 先判断本地是否存储了城市列表和热门城市列表
			let cityList = JSON.parse(window.localStorage.getItem("cityList"));
			let hotCity = JSON.parse(window.localStorage.getItem("hotCity"));
			if(cityList && hotCity){
				this.cityList = cityList;
				this.hotCity = hotCity;
				this.loading = false;
			}else{
				this.$axios.get("/api/cityList").then(result=>{
					if(result.data.msg === "ok"){
						let cities = result.data.data.cities;
						let {cityList,hotCity} = this.formatCity(cities);
						this.cityList = cityList;
						this.hotCity = hotCity;
						this.loading = false;
						//  数据大的时候可以进行本地存储，利用h5的window.localStorage();
						window.localStorage.setItem("cityList",JSON.stringify(cityList));
						window.localStorage.setItem("hotCity",JSON.stringify(hotCity));
					}
				})
			}
		},
		methods:{
			//  这里重点是改造数据,改造成 [ {index:"A",list:[ {nm:"安庆",id:1},{nm:"安康",id:2} ]}  ]
			formatCity(cities){
				let cityList = [];
				let hotCity = [];
				// 筛选出热门城市
				cities.filter((item)=>{
					if(item.isHot){
						hotCity.push({nm:item.nm,id:item.id})
					}
				})
				// 先获取所有城市的首字母
				for(let i = 0, len = cities.length; i < len; i++){
					let firstLetter = cities[i].py.substring(0,1).toUpperCase();
					if(isExist(firstLetter)){
						cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]});
					}else{
						for(let j = 0, l = cityList.length; j < l; j++){
							if(cityList[j].index === firstLetter){
								cityList[j].list.push({nm:cities[i].nm,id:cities[i].id});
							}
						}
					}
				}
				// 判断是否已经存在首字母的城市列表
				function isExist(firstLetter){
					for(let i = 0, len = cityList.length; i < len; i++){
						if(cityList[i].index === firstLetter){
							return false;	// 如果false,则表明已经存在该首字母的城市列表了,将数据添加进 cityList.list
						}
					}
					return true;  // 返回true则表示不存在,将数据添加进 cityList
				}
				// 排序的数组是乱序的,对数组进行首字母再排序
				cityList.sort((a,b)=>{
					if(a.index > b.index){
						return 1;
					}else{
						return -1;
					}
				});
				return {cityList,hotCity}
			},
			handleChangeCity(index){
				//  获取所有首字母Element
				let cityIndex = this.$refs.city_sort.getElementsByClassName("first_letter");
				// 获取它们的top值,然后再赋值给父元素
				this.$refs.city_sort.parentNode.scrollTop = this.$refs.scroll_ref.handleScollToIndex(0,-cityIndex[index].offsetTop);
			},
			//  点击热门城市或者城市列表,修改为当前的城市
			handleGetCity(nm,id){
				//  将当前的城市存储在本地
				window.localStorage.setItem("current_city",nm);
				window.localStorage.setItem("city_id",id);
				this.$store.commit("CURRENT_CITY",{nm,id});
				//  选择城市后使用编程式路由进行页面跳转
				this.$router.push("/movie/onnow");
			}
		}
	}
</script>

<style scoped>
	.city_body{
		overflow:auto;
	}
	.locate_city .title,.hot_city .title,.city_list .first_letter{
		padding-left:0.26rem;
		height:0.6rem;
		background-color:#ebebeb;
		font-size:0.26rem;
		color:#2f2f2f;
		line-height:0.6rem;
	}
	.hot_citylist{
		background-color:#f6f6f6;
	}
	.hot_citylist .city_wrapper{
		display:flex;
		flex-wrap:wrap;
		padding-bottom:0.3rem;
	}
	.hot_citylist .hotcity_item{
		margin:0.3rem 0 0 0.26rem;
		width:1.98rem;
		height:0.66rem;
		text-align:center;
		line-height:0.66rem;
		border:0.01rem solid #e3e3e3;
		border-radius:0.05rem;
		font-size:0.25rem;
		background-color:#fff;
	}
	.city_list .first_letter{
		position:sticky;
		top:0;
		padding-left:0.5rem;
	}
	.city_list ul{
		background-color:#fff;
	}
	.city_list .city_name{
		width:6.6rem;
		margin-left:0.3rem;
		height:0.86rem;
		line-height:0.86rem;
		border-bottom:0.01rem solid #c3c3c3;
	}
	.city_body .city_index{
		position:fixed;
		z-index:100;
		right:0.16rem;
		top:2.58rem;
		text-align:center;
	}
	.city_index>li{
		line-height:0.4rem;
		font-size:0.26rem;
	}
</style>

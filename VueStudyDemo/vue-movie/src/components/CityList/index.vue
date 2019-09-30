<template>
	<div class="city-body" ref="cityBody">
		<template v-if="loading===true">
			<Loading/>
		</template>
		<template v-else>
			<Scroll ref="scroll_top">
				<section>
					<div class="position-city">
						<h4 class="title">定位城市</h4>
						<template>
							<div class="city-item">{{this.$store.state.city}}</div>
						</template>
					</div>
					<div class="hot-city">
						<h4 class="title">热门城市</h4>
						<ul class="city-list">
							<li 
								v-for="(city,index) in hotCity" 
								:key="index"
								class="city-item"
								@tap="handleChangeCity(city)"
							>
								{{city.nm}}</li>
						</ul>
					</div>
					<div class="city-wrap">
						<div class="all-city" v-for="(item,index) in cityList" :key="index">
							<p class="title first-letter">{{item.index}}</p>
							<ul>
								<li 
									v-for="(city,index) in item.list" 
									:key="index"
									@tap="handleChangeCity(city)"
								>{{city.nm}}</li>
							</ul>
						</div>
					</div>			
				</section>
			</Scroll>
			<ul class="city-index">
				<li 
					v-for="(item,index) in cityList" 
					:key="index"
					@touchstart="handleToIndex(index)"
				>{{item.index}}</li>
			</ul>
		</template>
	</div>
</template>

<script>
	export default{
		name:"city",
		data(){
			return{
				hotCity:[],
				cityList:[],
				loading:true
			}
		},
		created(){
			let hotCity = window.localStorage.getItem("hotCity");
			let cityList = window.localStorage.getItem("cityList");
			if(hotCity && cityList){
				this.hotCity = JSON.parse(hotCity);
				this.cityList = JSON.parse(cityList);
				this.loading = false;
			}else{
				this.$axios.get("/api/cityList").then(result=>{
					if(result.data.msg === "ok"){
						const cities = result.data.data.cities;
						let {hotCity,cityList} =  this.formatCity(cities);
						// 将获取到的城市列表和热门城市使用H5的本地存储
						window.localStorage.setItem("hotCity",JSON.stringify(hotCity));
						window.localStorage.setItem("cityList",JSON.stringify(cityList));
						this.hotCity = hotCity;
						this.cityList = cityList;
						this.loading = false;
					}
				})
			}
		},
		methods:{
			formatCity(cities){
				// 获取热门城市列表
				let hotCity = cities.reduce(function(accumulator,currentValue){
					if(currentValue.isHot === 1){
						accumulator.push(currentValue);
					}
					return accumulator;
				},[]);
				
				// 将城市列表转化为 [ {index:"A",list:[{nm:"安庆"},{nm:"安阳"}]} ] 的形式
				let cityList = [];
				for(let i = 0, len = cities.length; i < len; i++){
					let firstLetter = cities[i].py.substring(0,1).toUpperCase();
					if(isExist(firstLetter)){
						for(let j = 0, len = cityList.length; j < len; j++){
							if(firstLetter === cityList[j].index){
								cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
							}
						}
					}else{
						cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]})
					}
				}
				function isExist(firstLetter){
					for(let i = 0, len = cityList.length; i < len; i++){
						if(cityList[i].index === firstLetter){
							return true;
						}
					}
					return false
				}
				cityList.sort((a,b)=>{
					if(a.index > b.index){
						return 1
					}else if(a.index < b.index){
						return -1;
					}else{
						return 0;
					}
				})
				return {hotCity,cityList} 
			},
			/*
			点击索引值 a b c跳转到首字母为对应索引值的城市列表
			*/ 
			handleToIndex(index){
				const cityBody = this.$refs.cityBody;
				const firstLetterHeight = cityBody.getElementsByClassName("first-letter")[index].offsetTop;
				this.$refs.scroll_top.scrollToIndex(-firstLetterHeight);
			},
			handleChangeCity(info){
				this.$store.commit("changeCity",{
					city:info.nm,
					id:info.id
				});
				window.localStorage.setItem("city",info.nm);
				window.localStorage.setItem("id",info.id);
				this.$router.push("/movie/playing");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.city-body{
		.title{
			height:0.6rem;
			background-color:rgb(235,235,235);
			line-height:0.6rem;
			padding-left:0.25rem;
		}
		.hot-city .city-list{
			display:flex;
			justify-content:flex-start;
			flex-wrap:wrap;
		}
		.city-item{
			margin:0.26rem 0 0 0.3rem;
			width:1.98rem;
			height:0.66rem;
			background-color:#fff;
			color:rgb(41,41,41);
			text-align:center;
			line-height:0.66rem;
			border-radius:3px;
			border:1px solid rgb(228,228,228);
		}
		.hot-city .city-list,.position-city{
			padding-bottom:0.26rem;
		}
		.all-city ul{
			padding-left:0.28rem;
			padding-right:0.58rem;
			li{
				height:0.85rem;
				line-height:0.85rem;
				border-bottom:1px solid rgb(197,197,197);
			}
			li:last-child{
				border-bottom-width:0;
			}
		}
		.city-index{
			position:fixed;
			right:0.15rem;
			top:2.8rem;
			width:0.3rem;
			text-align:center;
			font-size:0.25rem;
		}
	}
</style>

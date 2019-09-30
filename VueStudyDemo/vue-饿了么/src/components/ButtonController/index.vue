<template>
	<div class="control-wrapper">
		<div class="decrease" v-show="food.count > 0" @touchstart.stop="handleDecreaseFood">
			<i class="iconfont icon-circle-remove"></i>
		</div>
		<div class="count" v-show="food.count > 0">{{food.count}}</div>
		<div class="add" @touchstart.stop="handleAddFood">
			<i class="iconfont icon-add"></i>
		</div>
	</div>
</template>

<script>
	export default{
		name:"button-control",
		data(){
			return{
				
			}
		},
		props:{
			food:{
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		methods:{
			/*
			Vue不能检测对象属性的添加或删除,可以使用Vue.set(object,propertyName,value)方法向嵌套对象添加响应式属性。
			也可以使用 vm.$set实例方法,它是Vue.set的别名。
			*/
		   // 添加食品进入购物车,如果没有count属性,说明没有添加进购物车,则添加该属性并设置属性值为1,
			handleAddFood(){
				if(!this.food.count){
					this.$set(this.food,"count",1);
					this.$store.commit("handleAddtoCart",this.food);
				}else{
					this.food.count++;
				}
			},
			// 减少购物车食品数量,当数量减到0的时候,需要将该食品对象从 添加到的食品数组里删除
			handleDecreaseFood(){
				this.$store.commit("handleDecreaseFood",this.food);
			}
		}
	}
</script>

<style scoped lang="scss">
	.control-wrapper{
		display:flex;
		width:68px;
		height:20px;
		line-height:20px;
		justify-content:flex-end;
		.decrease,.add{
			width:20px;
			color:#00a0dc;
			text-align:center;
			i.iconfont{
				font-size:20px;
			}
		}
		.count{
			width:28px;
			color:#93999f;
			text-align:center;
		}
	}
</style>

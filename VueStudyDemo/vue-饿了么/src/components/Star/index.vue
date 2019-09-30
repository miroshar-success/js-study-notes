<template>
	<!--  封装一个 star组件  starType 表示显示的星星尺寸,通过computed属性,一共分为3类 -->
	<div class="star" :class="starType">
		<span 
			v-for="(item,index) in itemClasses" 
			:key="index"
			:class="item" 
			class="star-item"
		></span>
	</div>
</template>

<script>
	const [LENGTH,CLASS_ON,CLASS_HALF,CLASS_OFF] = [5,"on","half","off"];
	
	export default{
		name:"star",
		data(){
			return{
			}
		},
		props:{
			size:{
				type:Number		// 要显示的星星图片的尺寸
			},
			score:{
				type:Number		// 商家店铺评分
			}
		},
		computed:{
			starType(){
				return "star-" + this.size;
			},
			itemClasses(){
				let result = [];	// 表示每个星星要显示的类名,一共是5个
				// 将分数换算城 整数 或者.5 的数 .0 - .4 向下舍入   .5-.9 转换成.5  
				let score = Math.floor(this.score * 2) / 2;	
				// 分数是否有小数，如果有，取出整数部分遍历
				let hasDecimal = this.score%1 !== 0;	
				let integer = Math.floor(score);
				for(let i = 0; i < integer; i++){
					result.push(CLASS_ON);
				}
				if(hasDecimal) result.push(CLASS_HALF);	// 半颗星的个数只会有1个
				while(result.length < LENGTH){
					result.push(CLASS_OFF);
				}
				return result
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/scss/mixin.scss";
	.star{
		font-size:0;
		.star-item{
			display:inline-block;
			background-repeat:no-repeat;
		}
	}
	.star-48{
		.star-item{
			margin-right:22px;
			width:20px;
			height:20px;
			background-size:20px 20px;
			&:last-child{
				margin-right:0;
			}
			&.on{
				@include bg-image("./imgs/star48_on");
			}
			&.half{
				@include bg-image("./imgs/star48_half");
			}
			&.off{
				@include bg-image("./imgs/star48_off");
			}
		}
	}
	.star-36{
		.star-item{
			margin-right:6px;
			width:15px;
			height:15px;
			background-size:15px 15px;
			&:last-child{
				margin-right:0;
			}
			&.on{
				@include bg-image("./imgs/star36_on");
			}
			&.half{
				@include bg-image("./imgs/star36_half");
			}
			&.off{
				@include bg-image("./imgs/star36_off");
			}
		}
	}
	.star-24{
		.star-item{
			margin-right:3px;
			width:10px;
			height:10px;
			background-size:10px 10px;
			&:last-child{
				margin-right:3;
			}
			&.on{
				@include bg-image("./imgs/star24_on");
			}
			&.half{
				@include bg-image("./imgs/star24_half");
			}
			&.off{
				@include bg-image("./imgs/star24_off");
			}
		}
	}
</style>

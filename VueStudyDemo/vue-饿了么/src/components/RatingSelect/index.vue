<template>
	<div class="rating-header">
		<ul class="selected-list">
			<li 
				class="selected-item positive"
				:class="{'active':selectedType === 0}"
				@touchstart="handleSelectRatingItem(0)"
			>
				{{desc.all}}
				<span class="count">{{ratings.length}}</span>
			</li>
			<li 
				class="selected-item positive" 
				:class="{'active':selectedType === 1}"
				@touchstart="handleSelectRatingItem(1)"
			>
				{{desc.positive}}
				<span class="count">{{positives.length}}</span>
			</li>
			<li
				class="selected-item negative"
				:class="{'active':selectedType === 2}"
				@touchstart="handleSelectRatingItem(2)"
			>
				{{desc.negative}}
				<span class="count">{{negatives.length}}</span>
			</li>
		</ul>
		<div class="switch" :class="{'on':this.onlyContent}" @touchstart.stop="handleToggleContent">
			<i class="iconfont icon-xuanzhongduigou"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const ALL = 0;
	const POSITIVE = 1;
	const NEGATIVE = 2;
	/*
	selectedType: 当前选择的是哪个评价类型
	ratings: 所有的评价内容
	onlyContent: 是否只显示有文字的内容
	desc: 不同评价类型的文本内容
	*/ 
	export default{
		name:"rating-selected",
		data() {
			return{
				type:this.selectedType,	// 不能在子组件修改父组件的值,在data里初始化selectedType,然后修改type的值
				content:this.onlyContent,
			}
		},
		props:{
			selectedType:{
				type:Number,
				default:ALL
			},
			ratings:{
				type:Array,
				default:function(){
					return []
				}
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default:function(){
					return{
						all:"全部",
						positive:"推荐",
						negative:"吐槽"
					}
				}
			}
		},
		computed:{
			// 所有好评和差评,获取对应数组的长度 即为 对应的好评数和差评数
			positives(){
				return this.ratings.filter(item => {
					return item.rateType === 0;
				})
			},
			negatives(){
				return this.ratings.filter(item => {
					return item.rateType === 1;
				})
			}
		},
		methods:{
			handleSelectRatingItem(type){
				//  这里不能直接修改从父组件传递过来的值,将传递过来的父组件值存储,然后在本组件修改
				this.type = type;
				this.$emit("selectedType",type)
			},
			// 切换是否有内容的评价
			handleToggleContent(){
				this.content = !this.content;
				this.$emit("onlyContent",this.content);
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/common/scss/mixin.scss";
	.rating-header{
		padding:0 18px;
		border-bottom:1px solid #e6e7e8;
		.selected-list{
			padding:18px 0;
			display:flex;
			@include border-bottom-1px(rgba(7,17,27,0.1));
		}
		// 每个评价选项的通用样式,选中时文本设置为白色
		.selected-item{
			margin-right:8px;
			padding:8px 12px;
			text-align:center;
			font-size:12px;
			line-height:16px;
			color:#637078;
			border-radius:1px;
			&.active{
				color:#fff;
			}
			&.negative{
				background-color:rgba(77,85,93,0.2);
				&.active{
					background-color:rgb(77,85,93);
				}
			}
			&.positive{
				background-color:rgba(0,160,220,0.2);
				&.active{
					background-color:rgb(0,160,220);
				}
			}
			.count{
				font-size:10px;
			}
		}
		.switch{
			padding:12px 0;
			height:24px;
			line-height:24px;
			.text{
				margin-left:2px;
				font-size:12px;
				color:rgb(147,153,159);
				vertical-align:top;
			}
			i.iconfont{
				color:rgb(147,153,159);
				font-size:24px;
			}
			&.on{
				i.iconfont{
					color:#00c850;
				}
			}
		}
	}
</style>

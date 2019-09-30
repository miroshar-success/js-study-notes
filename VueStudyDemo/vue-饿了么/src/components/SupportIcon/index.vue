<template>
	<span class='support-icon' :class='iconType'></span>
</template>

<script>
	export default{
		name:'support-icon',
		props:{
			size:{
				type:Number,
			},
			type:{
				type:Number
			}
		},
		computed:{
			iconType(){
				const types = ['decrease','discount','special','invoice','guarantee'];
				return `icon-${this.size} ${types[this.type]}`
			}
		}
	}
</script>

<style scoped lang='scss'>
	@import '@/common/scss/mixin.scss';
	.support-icon{
		display:inline-block;
	}
	.icon-1{
		width:12px;
		height:12px;
		background-size:12px 12px;
		&.decrease{
			@include bg-image('./imgs/decrease_1');
		}
		&.discount{
			@include bg-image('./imgs/discount_1');
		}
		&.special{
			@include bg-image('./imgs/special_1');
		}
		&.invoice{
			@include bg-image('./imgs/invoice_1');
		}
		&.guarantee{
			@include bg-image('./imgs/guarantee_1');
		}
	}
	.icon-2{
		width:16px;
		height:16px;
		background-size:16px 16px;
		&.decrease{
			@include bg-image('./imgs/decrease_2');
		}
		&.discount{
			@include bg-image('./imgs/discount_2');
		}
		&.special{
			@include bg-image('./imgs/special_2');
		}
		&.invoice{
			@include bg-image('./imgs/invoice_2');
		}
		&.guarantee{
			@include bg-image('./imgs/guarantee_2');
		}
	}
	.icon-3{
		width:12px;
		height:12px;
		background-size:12px 12px; 
		&.decrease{
			@include bg-image('./imgs/decrease_3');
		}
		&.discount{
			@include bg-image('./imgs/discount_3');
		}
		&.special{
			@include bg-image('./imgs/special_3');
		}
		&.invoice{
			@include bg-image('./imgs/invoice_3');
		}
		&.guarantee{
			@include bg-image('./imgs/guarantee_3');
		}
	}
	.icon-4{
		width:16px;
		height:16px;
		background-size:16px 16px;
		&.decrease{
			@include bg-image('./imgs/decrease_4');
		}
		&.discount{
			@include bg-image('./imgs/discount_4');
		}
		&.special{
			@include bg-image('./imgs/special_4');
		}
		&.invoice{
			@include bg-image('./imgs/invoice_4');
		}
		&.guarantee{
			@include bg-image('./imgs/guarantee_4');
		}
	}
</style>

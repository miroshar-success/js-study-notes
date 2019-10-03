<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	export default{
		name:"pullRefresh",
		props:{
			handlePullDown:{
				type:Function,
				default:function(){}
			},
			handleTouchEnd:{
				type:Function,
				default:function(){}
			}
		},
		mounted(){
			const scroll = new BScroll(this.$refs.wrapper,{
				tap:true,
				probeType:1
			});
			scroll.on("scroll",pops=>{
				this.handlePullDown(pops);
			});
			scroll.on("touchEnd",pops=>{
				this.handleTouchEnd(pops);
			});
			this._scroll = scroll;
		},
		methods:{
			handleScollToIndex(x,y){
				this._scroll.scrollTo(x,y);
			}
		}
	}
</script>

<style scoped>
	.wrapper{
		height:100%;
	}
</style>

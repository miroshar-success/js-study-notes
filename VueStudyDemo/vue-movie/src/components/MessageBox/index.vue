<template>
	<div class="wrapper">
		<div class="message-box">
			<p class="title">当前城市:{{title}}</p>
			<div class="bottom">
				<button class="cancel" @touchstart.prevent="handleCancel">取消</button>
				<button class="confirm" @touchstart.prevent="handleConfirm">确认</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"message-box"
	}
</script>

<style scoped lang="scss">
	.wrapper{
		left:0;
		top:0;
		position:absolute;
		width:100%;
		height:100%;
		background-color:rgba(0,0,0,.4);
	}
	.message-box{
		position:absolute;
		left:0;
		right:0;
		top:0;
		bottom:0;
		margin:auto;
		width:3rem;
		height:2.2rem;
		border-radius:4px;
		overflow:hidden;
		z-index:200;
		.title{
			text-align:center;
			height:1.4rem;
			line-height:1.4rem;
			background-color:#fff;
		}
		.bottom{
			display:flex;
			justify-content:space-between;
			height:0.8rem;
			width:100%;
			border-top:1px solid #e5e5e5;
		}
		.cancel,.confirm{
			background-color:#fff;
			flex:1;
			border-right:1px solid #e5e5e5;
		}
		.confirm{
			border-right:none;
		}
	}
</style>

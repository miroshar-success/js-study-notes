<template>
	<div class="mask">
		<div class="message_box">
			<div class="content">
				<h3 class="title">{{title}}</h3>
				<p class="city">{{content}}</p>
			</div>
			<div class="btn">
				<button 
					class="cancel_btn"
					@touchstart="handleCancel"
				>{{cancel}}</button>
				<button 
					class="confirm_btn"
					@touchstart="handleConfirm"
				>{{confirm}}</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"message_box",
	}
</script>

<style scoped>
	.mask{
		z-index:100;
		position:absolute;
		left:0;
		top:0;
		width:100%;
		height:100%;
		background-color:rgba(0,0,0,.5);
	}
	.message_box{
		position:absolute;
		width:5rem;
		height:3.26rem;
		top:50%;
		left:50%;
		transform:translateX(-50%) translateY(-50%);
		background-color:#fff;
		border-radius:0.1rem;
		overflow:hidden;
	}
	.message_box .content{
		height:2.14rem;
		text-align:center;
		border-bottom:0.01rem solid #e6e6e6;
	}
	.message_box .btn{
		display:flex;
		width:100%;
		height:1.1rem;
	}
	.message_box .cancel_btn,.message_box .confirm_btn{
		flex:1;
		font-weight:bold;
		background-color:#fff;
		font-size:0.3rem;
	}
	.message_box .cancel_btn{
		border-right:0.01rem solid #e6e6e6;
	}
	.message_box .confirm_btn{
		color:#576b95;
	}
	.message_box .title{
		padding-top:0.5rem;
		font-size:0.3rem;
		font-weight:bold;
	}
	.message_box .city{
		font-size:.3rem;
		line-height:0.6rem;
	}
</style>

<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./static/iconfont.css";
	ul,ol{
		padding: 0;
		margin: 0;
		list-style:none;
	}
	.uni-title{
		font-size:34upx;
		font-weight:bold;
	}
</style>

<script>
	import Vuex from 'vuex'
	export default {
		onLaunch: function () {
			console.log('App Launch');
			const _this = this;
			this.audio.onEnded(()=>{
				if(this.mode === 1){
					this.play();
				}else if(this.mode === 2){
					// 如果是顺序播放，则按顺序播放历史记录里的歌曲，
					this.setsrc(this.history[this.musicIndex+1].src);
					this.setdetail(this.history[this.musicIndex+1].detail);
					this.setLyric(this.history[this.musicIndex+1].lyric);
					this.changeMusicIndex();
				}else if(this.mode === 3){
					const index = Math.floor(Math.random() * this.history.length);
					this.setsrc(this.history[index].src);
					this.setdetail(this.history[index].detail);
					this.setLyric(this.history[index].lyric);
				}
			})
		},
		onShow: function () {
			console.log('App Show');
		},
		onHide: function () {
			console.log('App Hide');
		},
		computed:{
			...Vuex.mapState(["audio","mode","musicIndex","history"])
		},
		methods:{
			...Vuex.mapMutations(["play","setsrc","setdetail","setLyric","changeMusicIndex"]),
		},
		updated(){
			console.log(this.history.length);
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./static/uni.css";
	@import "./static/iconfont.css";
	.uni-title{
		font-weight:bold;
		font-size:32upx;
		padding-left:32upx;
	}
	@keyframes rotate{
		0%{
			transform:rotateZ(0deg);
		}
		100%{
			transform:rotateZ(360deg);
		}
	}
</style>

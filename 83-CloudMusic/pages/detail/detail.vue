<template>
	<view class="page-body">
		<swiper indicator-dots indicator-active-color="#fbfafa" indicator-color="#433f3e">
			<swiper-item class="main">
				<view class="singer-title">
					<text>——</text>
					<text class="singerName">
						<text v-for="(item,index) in singer" :key="index">{{item + " "}}</text>
					</text>
					<text>——</text>
				</view>
				<view class="music-poster">
					<img :src="detail.songs[0].al.picUrl" alt="" class="img">
				</view>
			</swiper-item>
			<swiper-item class="lyric">
				<view class="lyric-box">
					<ul>
						<li class="text" 
						v-bind:class="{fontClass:index==num-1}"
						v-for="(item,index) in lyricArr" 
						:key="index">{{item.text}}
						</li>
					</ul>
				</view>
			</swiper-item>
		</swiper>
		<view class="progress">
			<span class="">{{current}}</span>
			<slider 
				:value="value" 
				@change="timeChange" 
				:block-size="size" 
				@changing="sliderChange"
				activeColor="rgb(199,12,12)"
				backgroundColor="rgb(25,25,25)"
			>
			</slider>
			<span>{{total}}</span>
		</view>
		<view class="play-control">
			<text class="mode-btn" @click.stop="changeMode">
				<text class="iconfont" v-if="mode==1">&#xe66d;</text>
				<text class="iconfont" v-else-if="mode==2">&#xe623;</text>
				<text class="iconfont" v-else-if="mode==3">&#xe6e2;</text>
			</text>
			<text class="iconfont prev-btn" @click.stop="prev">&#xe60b;</text>
			<text class="iconfont play-btn" v-show="paused" @click.stop="playMusic">&#xe61d;</text>
			<text class="iconfont pause-btn" v-show="!paused" @click.stop="pauseMusic">&#xe769;</text>
			<text class="iconfont next-btn" @click.stop="next">&#xe6a1;</text>
			<text class="iconfont menu-btn">&#xe60c;</text>
		</view>
	</view>
</template>

<script>
	import Vuex from "vuex"
	export default{
		data(){
			return{
				total:"00:00",
				current:"00:00",
				value:0,
				size:12,
				updatestate:true,
				flag:true,
				poster:"",
				lyricArr:[],
				num:0,
				ulContext:null,
				height:0,
			}
		},
		computed:{
			...Vuex.mapState(["detail","audio","paused","lyric","mode","history","musicIndex"]),
			singer(){
				let temp = [];
				const singerName = this.detail.songs[0].ar;
				if(singerName.length >=2 ){
					singerName.forEach(function(item){
						temp.push(item.name);
						temp.push("/");
					});
					return temp.slice(0,temp.length-1);
				}else{
					// 注意 此时 直接 return temp.push(this.detail.songs[0].ar[0].name) 返回的是数组的长度
					temp.push(this.detail.songs[0].ar[0].name);
					return temp;
				}
			}
		},
		mounted(){
			uni.setNavigationBarTitle({
				title:this.detail.songs[0].name
			});
			const _this = this;
			this.audio.onTimeUpdate(function(){
				let time = _this.formatTime(_this.audio.currentTime);
				_this.current = time;
				// 当前时间除以总时间,表示歌曲进度的百分比
				if(_this.updatestate){
					_this.value = (_this.audio.currentTime / _this.audio.duration) * 100;
				}
				_this.size = 12;
				_this.total = _this.formatTime(_this.audio.duration);
				let curTime = _this.audio.currentTime.toFixed(3);
				// 如果当前的播放时间大于歌词的时间,则显示下一条
// 				if(curTime > _this.lyricArr[_this.num].time){
// 					_this.num++;
// 				}
			}),
			// 歌曲的总时间
			// 获取音乐图片,将其赋值给data中的数据
			this.poster = document.querySelector(".music-poster>.img");
			this.ulContext = document.querySelector(".lyric-box>ul");
			// 将时间和歌词数组 以 ] 为分割
// 			this.$nextTick(function(){
// 				const oLi = document.querySelectorAll(".lyric-box li")[0];
// 				let lyricHeight = parseFloat(getComputedStyle(oLi)['height']);
// 				_this.height = lyricHeight;
// 			});
			// 当歌曲结束后重新获取歌词位置
			this.audio.onEnded(function(){
				_this.num = 0;
				uni.setNavigationBarTitle({
					title:this.detail.songs[0].name,
					success(res){
						console.log(res);
					}
				});
			})
		},
		updated(){
			if(!this.paused){
				this.poster.style.animationPlayState = "running";
			}else{
				this.poster.style.animationPlayState = "paused";
			};
			const _this = this;
			if(this.num > 6){
				setTimeout(function(){
					_this.ulContext.style.top = -(_this.num - 6)*(_this.height) + 'px';
					_this.ulContext.style.transition = "top .45s linear";
				},100);
			};
		},
		methods:{
			// 定义一个函数，处理歌曲的当前时间和总时间
			...Vuex.mapMutations(["play","pause","changeMode","changeMusicIndex","setsrc","setdetail","setLyric"]),
			formatTime(time){
				//将时间处理为 分和 秒的形式
				let min = Math.floor(time / 60);
				let sec = Math.floor(time % 60);
				min = min < 10 ? '0' + min : min;
				sec = sec < 10 ? '0' + sec : sec;
				return min + ":" + sec;
			},
			timeChange(e){
				const _this = this;
				// 让歌曲快进到点击按钮的当前的播放时间
				let skipTime = (e.detail.value/100) * this.audio.duration;
				this.audio.seek(skipTime);
				this.updatestate = true;
				this.num = 0;
// 				(function skip(){
// 					if(skipTime > _this.lyricArr[_this.num].time){
// 						_this.num++;
// 						skip();
// 					}
// 				})();
			},
			sliderChange(e){
				// 拖动过程中修改slider原点的大小，并同时修改当前播放的时间
				this.size = 20;
				// 一直拖动进度条的时候暂停音乐播放
				this.updatestate = false;
			},
			playMusic(){
				this.play();
			},
			pauseMusic(){
				this.pause(); 
			},
// 			changeMusicInfo(){
// 				// let lyricArr = this.lyric.lrc.lyric.split("\n");
// 				let tempArr = [];
// 				lyricArr.forEach(function(item){
// 					let a = item.split("]");
// 					let text = a[1];
// 					let time = a[0].slice(1).split(":");
// 					let sec = time[0]*60 + time[1]*1;
// 					tempArr.push({
// 						time:sec,
// 						text:text
// 					})
// 				});
// 			}
			next(){
				this.setsrc(this.history[this.musicIndex+1].src);
				this.setdetail(this.history[this.musicIndex+1].detail);
				this.setLyric(this.history[this.musicIndex+1].lyric);
				this.changeMusicIndex();
			}
		}
	}
</script>

<style scoped>
	ul,ol{
		padding: 0;
		margin: 0;
		list-style:none;
	}
	uni-swiper{
		height:870upx;
	}
	uni-page-body,.page-body{
		height:100%;
		background-color:#770e12;
	}
	.progress{
		padding-top:80upx;
		margin:auto 0;
		width:750upx;
		text-align:center;
	}
	.progress span{
		font-size:14upx;
	}
	slider{
		display:inline-block;
		vertical-align:6upx;
		margin:0 24upx;
		padding:0;
		width:560upx;
	}
	.play-control{
		position:relative;
		height:200upx;
		width:100%;
		text-align:center;
	}
	.play-control>text{
		position:absolute;
		line-height:200upx;
	}
	.play-control>.mode-btn{
		left:50upx;
		font-size:50upx;
	}
	.play-control>.menu-btn{
		right:60upx;
		font-size:60upx;
	}
	.play-control .iconfont,.progress span{
		color:#e5ced1;
	}
	.play-control .prev-btn,.play-control .next-btn{
		font-size:76upx;
	}
	.play-control .prev-btn{
		left:180upx;
	}
	.play-control .next-btn{
		right:180upx;
	}
	.play-control .pause-btn,.play-control .play-btn{
		font-size:116upx;
		left:50%;
		transform:translateX(-50%);
	}
	.music-poster{
		padding-top:50upx;
		width:100%;
		height:660upx;
		text-align:center;
	}
	.music-poster>img{
		width: 600upx;
		height:600upx;
		border-radius:50%;
		border:20upx solid rgba(190,10,10,.5);
		animation:rotate 25s linear infinite;
	}
	.singer-title{
		padding:20upx 0;
		height:70upx;
		width:100%;
		color:#fff;
		line-height:70upx;
		text-align:center;
	}
	.singer-title .singerName{
		padding:0 20upx;
		font-size:26upx;
	}
	.content{
		padding-top:100upx;
		height:660upx;
		overflow:hidden;
		background-color:#770e12;
	}
	.lyric-box li{
		font-size:26upx;
		height:60upx;
		line-height:60upx;
		color:rgba(250,230,230,.8);
		transition:font-size .35s;
	}
	.lyric-box li.fontClass{
		color:#fff;
		font-size:30upx;
	}
	.lyric-box{
		position:relative;
		top:100upx;
		width:100%;
		height:700upx;
		overflow:hidden;
	}
	.lyric-box>ul{
		position:absolute;
		top:0;
		width:100%;
		text-align:center;
	}
</style>

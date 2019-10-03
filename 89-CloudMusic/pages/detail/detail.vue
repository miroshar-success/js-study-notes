<template>
	<view class="page-body">
		<swiper class="swiper-wrapper" indicator-dots
		indicator-active-color="#f9f9f9"
		indicator-color="#948c84"
		>
			<swiper-item class="swiper-item">
				<view class="singer-info">
					<text>—</text>
					<text class="singer">{{detail.songs[0].ar[0].name}}</text>
					<text>—</text>
				</view>
				<view class="poster">
					<img :src="detail.songs[0].al.picUrl">
				</view>
				<view>
					<text class="currentLyric"
					v-for="(item,index) in lyricArr"
					:key="index"
					v-if="index===num-1"
					>{{item.text}}</text>
				</view>
			</swiper-item>
			<swiper-item>
				<slider block-size="12" show-value
				:value="volume"
				@change="changeVolume"
				@changing="changingVolume"
				></slider>
				<view class="lyric-box">
					<ul class="lyric-list">
						<li 
						class="lyric-item" v-for="(item,index) in lyricArr" 
						:key="index"
						v-bind:class="{active:index===num-1}"
						>{{item.text}}
						</li>
					</ul>
				</view>
			</swiper-item>
		</swiper>
		<view class="control-area">
			<view class="progress">
				<view class="current time">{{current}}</view>
				<slider class="slider"
					activeColor="#23ca7d"
					block-size="12" 
					@change="changeTime" 
					@changing="changingTime"
					:value="value"
					></slider>
				<view class="total time">{{duration}}</view>
			</view>
			<ul class="change">
				<li class="mode">
					<i class="iconfont">&#xe623;</i>
				</li>
				<li class="prev">
					<i class="iconfont">&#xe60b;</i>
				</li>
				<li class="play-btn" v-show="paused" @click.stop="playMusic">
					<i class="iconfont">&#xe61d;</i>
				</li>
				<li class="pause-btn" v-show="!paused" @click.stop="pauseMusic">
					<i class="iconfont">&#xe613;</i>
				</li>
				<li class="next">
					<i class="iconfont">&#xe6a1;</i>
				</li>
				<li class="menu">
					<i class="iconfont">&#xe655;</i>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import Vuex from "vuex"
	export default{
		data(){
			return{
				// 歌曲当前的时间
				current:"00:00",
				// 歌曲总时间
				duration:"00:00",
				// 旋转的图片元素
				img:null,
				// slider当前的取值
				value:0,
				// 当慢慢拖动滚动条的时候歌曲也一直在播放，
				flag:true,
				lyricArr:[],
				// 音量,默认为60
				volume:60,
				// 歌词索引值,当前播放的是第几条歌词
				num:0,
				timeArr:[],
				// 每条歌词的高度
				oHeight:0,
				// 歌词的父级
				ulList:null
			}
		},
		computed:{
			...Vuex.mapState(["detail","audio","paused","lyric"])
		},
		mounted(){
			const _this = this;
			// 设置标题为歌曲的名字
			uni.setNavigationBarTitle({
				title:this.detail.songs[0].name
			});
			// 获取图片元素
			this.$nextTick(function(){
				_this.img = document.querySelector(".poster>img");
				_this.ulList = document.querySelector(".lyric-list");
				let aLi = document.querySelectorAll(".lyric-list>li")[0];
				_this.oHeight = parseFloat(getComputedStyle(aLi)["height"]);
			});
			// 控制进度条显示歌曲当前进度
			let duration = this.audio.duration;
			this.duration = this.formTime(duration);
			
			this.audio.onTimeUpdate(function(){
				let current = _this.audio.currentTime;
				_this.current = _this.formTime(current);
				if(_this.flag){
					_this.value = (current/duration) * 100;
				};
				// 当歌曲播放的时间大于当前歌词对应的时间，则把歌词+1
				if( _this.audio.currentTime > _this.timeArr[_this.num] ){
					_this.num++;
				}
				// 当歌曲当前播放的词条大于6时,修改歌词父级top值
				if(_this.num > 6){
					_this.ulList.style.top = (_this.num-6) * -(_this.oHeight) + "px";
				}else{
					_this.ulList.style.top = 0 + 'px';
				}
			}),
			// 音频播放结束事件
			this.audio.onEnded(function(){
				_this.play();
			});
			// 设置歌词
			let [temp,time] = [[],[]];
			let tempArr = this.lyric.split("\n");
			tempArr.forEach(item => {
				let a = item.split("]");
				temp.push({
					time:a[0].substring(1),
					text:a[1]
				});
			});
			this.lyricArr = temp;
			// 将歌词里的时间转换为s的形式,和歌曲当前的播放时间对比
			temp.forEach(function(item){
				let a = item.time.split(":");
				time.push(a[0]*60 + a[1]*1);
			});
			this.timeArr = time;
		},
		methods:{
			...Vuex.mapMutations(["play","pause"]),
			changeTime(e){
				// 点击的当前位置
				let value = e.detail.value;
				let position = (value/100) * this.audio.duration;
				// 当暂停的时候跳转进度,跳转进度后让歌曲播放
				if(this.paused){
					this.audio.seek(position);
					this.play();
					this.img.style.animationPlayState = "running";
				}else{
					this.audio.seek(position);
				}
				// 拖动结束的时候允许播放
				this.flag = true;
				
				// 快进的时候让歌词快速滚动到当前播放的位置
				const _this = this;
				this.num = 0;
				(function skip(){
					// 先将歌词词条归0，然后将当前点击时的时间 和 第0条歌词的时间对比，大于的时候num递加
					if(position > _this.timeArr[_this.num]){
						_this.num++;
						skip();
					}
				})();
			},
			changingTime(e){
				// 拖动结束的时候暂停播放歌曲
				this.flag = false;
			},
			playMusic(){
				this.play();
				this.img.style.animationPlayState = "running";
			},
			pauseMusic(){
				this.pause();
				this.img.style.animationPlayState = "paused";
			},
			// 格式化时间,转化为 分:秒 的形式
			formTime(value){
				let min = Math.floor(value/60);
				let sec = Math.floor(value%60);
				min = min < 10 ? '0' + min : min;
				sec = sec < 10 ? "0" + sec : sec;
				return min + ":" + sec;
			},
			changeVolume(e){
				this.audio.volume = (e.detail.value)/100;
			},
			changingVolume(e){
				this.audio.volume = (e.detail.value)/100;
			}
		}
	}
</script>

<style scoped>
	.page-body,uni-page-body,uni-page-wrapper{
		height:100%;
		background-color:rgb(140,12,12);
	}
	.swiper-wrapper{
		width:100%;
		height:calc(100% - 290upx);
		text-align:center;
	}
	.singer-info{
		width:100%;
		height:84upx;
		color:#fff;
		font-size:26upx;
		text-align:center;
		line-height:84upx;
	}
	.singer-info>.singer{
		padding:0 12upx;
	}
	.poster{
		margin-top:56upx;
	}
	.poster>img{
		width:600upx;
		height:600upx;
		border:16upx solid #615c54;
		border-radius:50%;
		animation:posterRotate 20s linear 0s infinite;
	}
	.progress{
		height:90upx;
		line-height:90upx;
	}
	.progress uni-slider{
		margin:28upx 0 0;
		width:558upx;
	}
	.progress .time{
		padding:0 15upx;
		color:#e6e6e6;
		font-size:26upx;
	}
	.progress .current,.progress uni-slider{
		float:left;
	}
	.progress .total{
		float:right;
	}
	.control-area{
		position:absolute;
		bottom:80upx;
	}
	.control-area .change{
		height:118upx;
		line-height:118upx;
		padding:0 35upx;
		display:flex;
		flex-direction:row;
		flex-wrap:nowrap;
		justify-content:space-between;
	}
	.control-area .change .iconfont{
		color:#fff;
	}
	.change .prev>.iconfont,.change .next>.iconfont{
		font-size:76upx;
	}
	.change .play-btn>.iconfont,.change .pause-btn>.iconfont{
		font-size:118upx;
	}
	.change .menu>.iconfont,.change .mode>.iconfont{
		font-size:40upx;
	}
	@keyframes posterRotate{
		0%{
			transform:rotateZ(0deg);
		}
		100%{
			transform:rotateZ(360deg);
		}
	}
	.lyric-box{
		position:relative;
		margin-top:80upx;
		height:70%;
		overflow:hidden;
	}
	.lyric-list{
		position:absolute;
		width:100%;
		top:0;
		text-align:center;
		transition:top .6s;
	}
	.lyric-list>.lyric-item{
		height:56upx;
		line-height:56upx;
		font-size:26upx;
		color:#f1f1f1;
		transition:all .5s;
	}
	.lyric-list>li.active{
		font-size:28upx;
		color:#000;
	}
	.uni-slider-wrapper .uni-slider-value{
		color:#fff;
	}
	.currentLyric{
		font-size:28upx;
		color:#f1f1f1;
	}
</style>

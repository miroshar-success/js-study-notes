<template>
	<view>
		<button @click="bindPlay" type="primary">播放</button>
		<button @click="bindPause" type="warn">暂停</button>
		<text>调节音量</text>
		<slider show-value :value="volume" @changing="bindVolume"></slider>
		<view class="content">
			<map name="map" id="current" :longitude="longitude" :latitude="latitude"></map>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				audio:uni.createInnerAudioContext(),
				volume:5,
				longitude:0,
				latitude:0,
			}
		},
		mounted(){
			// uni.createInnerAudioContext() 创建并返回内部audio上下文innerAudioContext对象
			console.log(this.audio);
			this.audio.src = "http://sc1.111ttt.cn:8282/2015/1/08m/20/101201133517.m4a?tflag=1546606800&pin=97bb2268ae26c20fe093fd5b0f04be80#.mp3";
			const _this = this;
			uni.getLocation({
				altitude:true,
				success(res){
					console.log(res);
					_this.longitude = res.longitude;
					_this.latitude = res.latitude;
				}
			})
		},
		methods:{
			bindPlay(){
				this.audio.play();
				this.audio.volume = this.volume/100;
				
				console.log(this.audio.paused,this.audio.duration,this.audio.volume);
				const _this = this;
				this.audio.onTimeUpdate(function(){
					console.log(_this);
					console.log(_this.audio.currentTime);
				});
			},
			bindPause(){
				this.audio.pause();
			},
			bindVolume(event){
				console.log(event.detail);
				let value = event.detail.value;
				this.audio.volume = event.detail.value/100;
			}
		}
	}
</script>

<style>
	map{
		width:100vw;
	}
</style>

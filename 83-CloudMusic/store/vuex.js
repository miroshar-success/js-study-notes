import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	// 保存全局变量
	state:{
		audio:uni.createInnerAudioContext(),
		detail:{},
		// paused表示暂停状态，
		paused:true,
		// 歌词
		lyric:"",
		// 播放模式 1. 单曲循环   2. 顺序播放  3. 随机播放
		mode:1,
		// 播放的历史记录
		history:[],
		// 当前播放的是哪一首歌曲
		musicIndex:0
	},
	mutations:{
		setsrc(state,url){
			state.audio.src = url;
			state.audio.play();
			state.paused = false;
		},
		setdetail(state,detail){
			state.detail = detail;
		},
		// 函数播放, 按钮为暂停按钮
		play(state){
			state.audio.play();
			state.paused = false;
		},
		// 函数暂停，按钮为播放按钮
		pause(state){
			state.audio.pause();
			state.paused = true;
		},
		setLyric(state,lyric){
			state.lyric = lyric;
		},
		sethistory(state,data){
			let num = state.history.findIndex(function(item){
				return item.id === data[3]
			});
			if(num === -1){
				state.history.unshift({
					src:data[0],
					detail:data[1],
					lyric:data[2],
					id:data[3]
				});
				console.log(state.history);
			}
		},
		changeMusicIndex(state){
			state.musicIndex++;
			if(state.musicIndex === state.history.length -1){
				state.musicIndex = -1;
			}
		},
		changeMode(state){
			state.mode++;
			if(state.mode === 4){
				state.mode = 1;
			}
			console.log("a");
		}
	},
	actions:{
		getSource({commit,dispatch},item){
			// commit 用来执行mutations里的函数
			// dispatch 用来执行actions里其他的函数
			Promise.all([
				new Promise(function(resolve,reject){
					uni.request({
						url:"https://api.wulv5.com/music/song/url?id=" + item.id,
						success:(res => {
							commit("setsrc",res.data.data[0].url);
							resolve(res.data.data[0].url)
						})
					})
				}),
				new Promise(function(resolve,reject){
					uni.request({
						url:"https://api.wulv5.com/music/song/detail?ids=" + item.id,
						dataType:"json",
						success:( (res) => {
							commit("setdetail",res.data);
							resolve(res.data);
						})
					})
				}),
				new Promise(function(resolve,reject){
					uni.request({
						url:"https://api.wulv5.com/music/lyric?id=" +item.id,
						dataType:"json",
						success:( res => {
							commit("setLyric",res.data);
							resolve(res.data);
						})
					})
				})
			]).then( (data) => {
				data[3] = item.id;
				commit("sethistory",data);
			});
		}
	}
})
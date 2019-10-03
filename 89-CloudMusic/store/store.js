import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		// 创建一个全局的音频组件
		audio:uni.createInnerAudioContext(),
		// 歌曲详情
		detail:{},
		// 播放状态,是否在播放的状态,默认为暂停的状态 
		paused:true,
		// 歌词
		lyric:{}
	},
	mutations:{
		// 获取歌曲的url
		setUrl(state,url){
			state.audio.src = url;
			state.audio.play();
			state.paused = false;
		},
		// 设置歌曲详情
		setDetail(state,detail){
			state.detail = detail;
		},
		// 设置歌曲歌词
		setLyric(state,lyric){
			state.lyric = lyric;
		},
		// 音乐播放函数,状态为false
		play(state){
			state.audio.play();
			state.paused = false;
		},
		// 音乐暂停函数,状态为true
		pause(state){
			state.audio.pause();
			state.paused = true;
		}
	},
	actions:{
		getUrl(context,item){
			// 传入歌曲的id,获取url
			uni.request({
				url:"https://api.wulv5.com/music/song/url",
				data:{
					id:item.id
				},
				success:(res) => {
					context.commit("setUrl",res.data.data[0].url);
				}
			}),
			// 获取歌曲的详情
			uni.request({
				url:"https://api.wulv5.com/music/song/detail?ids=" + item.id,
				success:(res) => {
					context.commit("setDetail",res.data);
				}
			}),
			// 获取歌曲歌词
			uni.request({
				url:"https://api.wulv5.com/music/lyric?id=" + item.id,
				success:(res) => {
					context.commit("setLyric",res.data.lrc.lyric);
				}
			})
		},
		// 检查歌曲是否可用
		checkUrl(context,item){
			return new Promise((resolve,reject) => {
				uni.request({
					url:"https://api.wulv5.com/music/check/music",
					data:{
						id:item.id
					},
					success:(res) => {
						resolve(res.data);
					}
				})
			})
		}
	}
})
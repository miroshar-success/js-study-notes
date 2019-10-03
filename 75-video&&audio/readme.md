# video

	用于在HTML或者XHTML文档中嵌入视频内容。 
	允许内容: 流式内容，包含一个src属性或是一个或者多个<source>元素。
	
	属性
	autoplay:视频会自动开始播放(谷歌浏览器不支持)
	buffered:可以读取到哪段时间范围内的媒体被缓存了
	controls:Gecko会提供用户控制，允许用户控制视频的播放，包括音量，跨帧，暂停/恢复播放
	height:视频展示区域的高度
	width:视频显示区域的宽度
	loop:重复播放
	muted:指明了视频里的音频的默认设置。设置后，音频会初始化为静音。
	poster:一个海报帧的URL，用于在用户播放或者跳帧之前展示。如果属性未指定，那么在第一帧可用之前什么都不会展示；
	src:要嵌到页面的视频的URL。
	
## video的事件

	play()			开始播放
	pause()			暂停播放
	timeupdate	：	
	当currentTime更新时会触发timeupdate事件，这个事件的触发频率由系统决定，但是会保证每秒触发4-66次。
		currentTime 当前的播放时间
		duration	总时间
		
	ended			播放结束事件
	
## HTMLMediaEleMent.paused

	该属性告诉视频是否正在暂停 
	返回值 true:暂停中 false 没有暂停
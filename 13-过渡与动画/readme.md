
# animation

	animation属性是一个简写属性，用于设置六个动画属性
		animation-name:动画名字
		animation-duration:完成动画需要的时间
		animation-timing-function:动画的速度曲线
		animation-delay:动画在开始之前的延迟	
		animation-iteration-count:动画播放的次数 n(具体次数)/infinite(无限)
		animation-direction:是否应该轮流反向播放动画 normal(默认)/alternate
		
## animation-play-state

	暂停动画 paused:running;
	animation-play-state:paused;
	-webkit-animation-play-state:paused; 
	
## @keyframes

	通过@keyframes规则，可以创建动画。创建动画的原理是，将一套CSS样式逐渐变化为另一套样式。
	Firefox支持替代的 @-moz-keyframes
	Opera支持替代的@-o-keyframes
	Safari和Chrome支持替代的 @-webkit-keyframes
	
## animation事件

	animationend		CSS动画结束播放时触发
	animationiteration	CSS动画重复播放时触发
	animationstart		CSS动画开始播放时触发
	
# 过渡transition

	transition属性设置元素当前过渡效果，是可以简写的属性：
		transition-property: 指定CSS属性的name
		transition-duration: 指定transition效果需要多少毫秒才完成
		transition-timing-function: 指定transition效果的转速曲线
		transition-delay:	定义transition效果开始的时候
	
	过渡事件:
	transitionend  过渡结束
	
	
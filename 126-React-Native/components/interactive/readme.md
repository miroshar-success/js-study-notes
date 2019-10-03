# Button

	onPress
		用户点击按钮调用处理函数
	title
		按钮内显示的文本
	color
		文本的颜色(iOS) 或者是按钮的背景色(Android)
		
	可以通过TouchableHighlight封装Button组件。
		activeOpacity: 指定封装的视图在被触摸操作激活时以多少不透明度显示
		underlayColor: 有触摸操作时显示出来的底层颜色。
		
	TouchableOpacity
		activeOpacity: 指定封装的视图在被触摸操作激活时以多少不透明度显示（0到1之间）。默认值为0.2
	
	disabled
		true: 禁止组件的一切交互。
	onPress
			当触摸操作结束的时候调用
	
	TouchableNativeFeedback
		用于封装视图,使其可以正确响应触发操作(仅限Android平台)。在Android设备上,这个组件利用原生状态来渲染触摸的反馈。
			
		tips:
		1. 原生触发操作反馈的背景可以使用background属性来自定义。

	方法:
		SelectionBackground()
			创建一个对象,表示安卓主题默认的对于被选中对象的背景。
			
		SelectionBackgroundBorderless()
			创建一个对象,表示安卓主题默认的对于被选中的无边框对象的背景。
			
		Ripple(color:string,borderless:boolean)
			创建一个对象,当按钮被按下时产生一个涟漪状的背景。
			color:表示涟漪的颜色,如果参数borderless为true,那么涟漪还会渲染到视图的范围之外。
			
# Picker
	
	可以在iOS和Android上渲染原生的选择器(Picker)。
	
	onValueChange
		itemValue:被选中项的value属性
		itemPosition:被选中项在picker中的索引值
		
	selectedValue:
		默认选中的值。
		
	enabled
		如果为false,则会禁止用此选择器。
		
	mode
		指定在点击选择器时,以怎样的形式呈现选项
		dialog: 显示一个模态对话框,默认选项。
		dropdown:以选择器所在位置为锚点展开一个下拉框。
		
# Slider
		
	disabled: true 禁止拖动。
	maximumValue:最大值
	minimumTrackTintColor: 滑块左侧轨道的颜色
	minimumValue: 滑块的最小值
	onSlidingComplete 用户松开滑块的时候调用
	onValueChange 用户拖动滑块的过程中调用
	step 滑块的步长
	maximumTrackTintColor 滑块右侧轨道的颜色
	value 滑块的初始值
	maximumTrackImage 指定一个滑块右侧轨道背景图。仅支持静态图片。（iOS）

# Switch

	disabled true则禁用此组件的交互
	trackColor	开启状态时的背景颜色  
	{false:color,true:color}	传入一个对象,分别表示状态开启和关闭时的颜色。
	thumbColor	圆形按钮的背景颜色
	value 表示开关是否打开,默认为false
		
	
	
	
	
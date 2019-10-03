
# 配置项列表
	
	pages.json文件用来对uni-app进行全局配置，决定页面文件的路径，窗口表现，设置多tab等。
	
	globalStyle
	pages
	tabBar
	condition
	subPackages
	preloadRule
	workers
	
## globalStyle

	用于设置应用的状态栏，导航条，标题，窗口背景色等。
	navigationBarBackgroundColor		导航栏背景颜色
	navigationBarTextStyle				导航栏标题颜色，仅支持black/white
	navigationBarTitleText				导航栏标题文字内容
	navigationStyle						导航栏样式
	backgroundColor						窗口的背景颜色
	backgroundTextStyle					下拉loading的样式，仅支持dark/light
	enablePullDownRefresh				是否开启下拉刷新
	onReachBottomDistance				页面上拉触底事件触发时距离底部距离
	backgroundColorTop					顶部窗口的颜色
	backgroundColorBottom				底部窗口的颜色
	
## pages

	1. pages节点的第一项为应用入口页(即首页)
	2. 应用中新增/减少页面，都需要对pages数据进行修改
	3. 文件名不需要写后缀，框架会自动寻找路径下的页面资源


	uni.stopPullDownRefresh()	停止下拉更新
	onReachBottom()	设置了 onReachBottomDistance 属性 距离页面底部多少距离触发该事件
	
	bounce:none		页面回弹效果，设置为"none"时关闭效果。

	scrollIndicator:	滚动条显示策略，设置为"none"时不显示滚动条。

## 交互反馈

	uni.showModal(Object)
	显示模态弹窗，类似于标准Html的消息框：alert,confirm
	
	
## app-plus

	配置编译到App平台时的特定样式，
	titleNView:		导航栏(Object)	
					backgroundColor  
					"buttons"
					
	searchInput:	
	
# 基础内容

	icon	text	rich-text	progress
	
	text: 文本 
		selectable	文本是否可选
		space		是否显示连续空格
		decode		是否解码
		
	rich-text:富文本
	nodes:	Array/String	节点列表/HTML String
	tips: 推荐使用Array类型，由于组件会将string类型转换为Array类型，因而性能会所有下降。
	
# 视图容器

	view 
	hover-class					指定按下去的样式类
	hover-stop-propagation		指定是否阻止本节点的祖先节点出现点击态
	hover-start-time 			按住后多久出现点击态，单位毫秒
	hover-stay-time 			手指松开后点击态保留时间，单位毫秒
	
# scroll-view

	scroll-x				横向滚动
	scroll-y				竖向滚动
	upper-threshold			距顶部/左边多远时触发scrolltoupper事件
	lower-threshold			距底部/右边多远时触发scrolltolower事件
	scroll-top				设置竖向滚动条位置
	scroll-left				设置横向滚动条位置
	scroll-with-animation	在设置滚动条位置时，使用动画过渡
	@scroll					滚动时触发
	scroll-into-view		值应为某子元素id。设置哪个方向可滚动，则在哪个方向滚动到该元素

# swiper

	swiper-item		swiper的子组件
	
	属性：
	indicator-dots				是否显示面板指示点
	indicator-color				指示点颜色
	indicator-active-color		当前选中的指示点颜色
	autoplay					自动切换
	current						当前所在滑块的index(从0开始)
	interval					自动切换时间间隔
	duration					滑块滑动时长
	circular					是否采用衔接滑动
	vertical					滑动方向是否为纵向
	@change						current改变时会触发change事件
	
# movable-area

	movable-view 可移动的视图容器，在页面种可以拖拽滑动
	
	属性：
	direction	movable-view的移动方向，属性值有all vertical horizontal none
	inertia		movable-view是否带有惯性
	out-of-bounds	超过可移动区域后，movable-view是否还可以移动
	scale		是否支持双指缩放
	@change		拖动过程中触发的事件
	@scale		缩放过程中触发的事件
	damping		阻尼系数，用于控制x或改变y的动画和过届回弹的动画，值越大移动越快

# 表单

## button
	
	type: primary/default/warn
	size:defualt/min
	form-type:	submit:提交表单 / reset:重置表单
	
## checkbox
	
	checkbox-group	@change	<checkbox-group>种选项发生改变是触发change事件，
	多项选择器，内部由多个checkbox组成。
	
	checkbox属性
	value	checkbox标识，选中时触发<checkbox-group>的change事件，并携带<checkbox>的value
	disabled	是否禁用
	checked		当前是否选中
	color		checkbox选中时的颜色
	
# input	

	value:				输入框的初始内容
		text			文本输入键盘
		number			数字键盘
		idcard			身份证输入键盘
		digit			带小数点的数字键盘
		
	type				类型
	password			密码类型
	placeholder-class	指定placeholder的样式类
	disabled			是否禁用
	maxlength			最大输入长度
	focus				获取焦点
	confirm-type		键盘右下角按钮的文字
						send("发送")	小程序
						search("搜索")
						
	adjust-position		键盘弹起时，是否自动向上推动页面
	@input				输入框聚焦时触发
	@blur				失去焦点时触发
	@confirm			点击完成按钮时触发
	@focus				输入框聚焦时触发
	
# picker

	从底部弹起的滚动选择器，支持五种选择器，通过mode来区分，分别是普通选择器，多列选择器
	时间选择器，日期选择器，省市区选择器。
	
	mode:selector
		range:	Array		mode为selector或multiSelector时，range有效
		value:	Number		value的值表示选择了range中的第几个(从0开始)
		@change				value改变时触发change事件
		@cancel				取消选择或点遮罩层收起picker时触发
		
# radio

	<radio-group>
	
# form	

	将组件内用户输入的<switch> <input> <checkbox> <slider> <radio> <picker>提交
	
	@submit	提交表单时触发
	@reset	重置表单
		
		
# 导航

	navigator
	属性：
		url						应用内的跳转链接
		open-type				跳转方式
			navigate			对应uni.navigateTo的功能
			redirect			对应uni.redirectTo的功能
			switchTab			对应uni.switchTab的功能
			reLaunch			对应uni.reLaunch
			navigateBack		对应uni.navigateBack
		hover-class				点击的样式类
		
		
	uni.navigateTo(Object)
		保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
		
	uni.redirectTo(Object)
		关闭当前页面，跳转到应用内的某个页面。
		
	uni.reLaunch(Object)
		关闭所有页面，打开到应用内的某个页面
		
# 生命周期

	应用生命周期
	
		onLaunch	当uni-app初始化完成时触发
		onShow		当uni-app启动，或从后台进入前台显示
		onHide		当uni-app从前台进入后台
	
	页面生命周期
		onLoad								监听页面加载。其参数为上个页面传递的数据，参数类型为Object
		onShow								监听页面显示
		onReady								页面初次渲染完成
		onHide								页面隐藏
		onPullDownRefresh					下拉动作
		onReachBottom						页面上拉触底事件
		onTabItemTap						点击tab时触发
		onNavigationBarButtonTap			监听原生标题栏按钮点击事件
		onNavigationBarSearchInputChanged	原生标题栏搜索框输入事件
		onNavigationBarSearchInputConfirmed	点击"搜索"按钮时触发
		onNavigationBarSearchInputClicked	监听原生标题栏搜索输入框点击事件
		
# 媒体
	
## 图片

	uni.chooseImage	
	从本地相册选择图片或使用相机拍照。
		count:		最多可以选择的图片张数
		sizeType	original原图，compressed压缩图
		sourceType	album从相册选择，camera使用相机
		success		成功则返回图片的本地文件路径列表 tempsFilePaths
	
	uni.previewImage	
	预览图片
		current			当前显示图片的链接，不填则默认为urls的第一张
		indicator		图片指示器样式，
		loop			是否可循环预览
		urls			需要预览的图片链接列表
		success			接口调用成功的回调函数
		
	uni.getImageInfo
	获取图片信息
		src				图片的路径
		success			调用成功的函数
			width/height/path
			
			
	uni.saveImageToPhotosAlbum
	保存图片到系统相册
	
	
## 文件

	uni.saveFile
	保存文件到本地
		tempFilePath	需要保存的文件临时路径
	uni.getSavedFileList
	获取本地已保存的文件列表
	uni.getSavedFileInfo
	获取本地文件的文件信息。
	
	uni.openDocument
	新开页面打开文档，支持格式:doc,xls ppt,docx,xlsx pptx
		filePath		文件路径，可通过downFile获得
		fileType		文件类型，指定文件类型打开文件
		
	uni.removeSavedFile
	删除本地存储的文件。
	
## 设备

	系统信息
	uni.getSystemInfo({
		
	}); 
	
	网络状态
	uni.getNetworkType
	
	监听网络状态变化
	uni.onNetworkStatusChange(callback)
	isConnected	当前是否有网络连接
	networkType	网络类型
	
# 媒体

	音频组件 : uni.createInnerAudioContext()
	创建并返回内部audio上下文  innerAudioContext 对象。
	
	属性：
		src					音频的数据链接,用于直接播放。
		startTime			开始播放的位置
		autoplay			是否自动开始播放
		loop				是否循环播放
		duration			当前音频的长度
		currentTime			当前音频的播放位置
		paused				当前是否暂停或停止状态
		buffered			音频缓冲的时间点
		volume				音量 0 - 1
	
	事件：
		play				播放
		pause				暂停
		stop				停止
		seek				跳转到指定位置
		onPlay				播放事件
		onPause				暂停事件
		onStop				停止事件
		onEnded				自然播放结束事件
		onTimeUpdate		播放进度更新事件
		onSeeking			进行seek操作事件			
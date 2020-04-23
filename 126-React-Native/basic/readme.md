# Props和state
	
	props是在父组件中指定,而且一经指定,在被指定的组件的生命周期中则不再改变。对于需要改变的数据,需要使用state。
	
	state:
	1. 一切界面变化都是状态state变化
	2. state的修改必须通过setState()方法
	 2.1 this.state.likes = 100; 这样的直接赋值修改无效
	 2.2 setState是一个merge合并操作,只修改指定属性,不影响其他属性
	 2.3 setState是异步操作,修改不会马上生效
	 
	 
# Style
	
	属性名需要使用驼峰命名 background-color 改为 backgroundColor
	
	使用StyleSheet.create来集中定义组件的样式。
	
```jsx
<Text style={styles.container}></Text>

<!-- 添加多条样式时,写在数组里,相同的属性,后面的会覆盖前面的 -->
<Text style={[styles.red,styles.blue]}></Text>

const styles = StyleShtte.create({
	container:{
		width:200,
		height:200,
		backgroundColor:"red"
	},
	red:{
		color:"red"
	},
	blue:{
		color:"blue"
	}
})
```

## Height/Width
	
	React Native 中的尺寸都是无单位的，表示的是与设备像素密度无关的逻辑像素点。
	
	这样给组件设置宽高也是一种常见的模式,比如要求在不同尺寸的屏幕上都显示一样的大小
	
## NativeEveNt
	
	changedTouches - 从上一次事件以来的触摸事件数组。
	identifier - 触摸事件的 ID。
	locationX - 触摸事件相对元素位置的 X 坐标。
	locationY - 触摸事件相对元素位置的 Y 坐标。
	pageX - 触摸事件相对根元素位置的 X 坐标。
	pageY - 触摸事件相对根元素位置的 Y 坐标。
	target - 接收触摸事件的元素 ID.
	timestamp - 触摸事件的时间标记，用来计算速度.
	touches - 屏幕上所有当前触摸事件的数组.
	
## Flex(弹性宽高)

	一般而言我们会使用flex:1来指定某个组件扩张以撑满所有剩余的空间。如果有多个并列的子组件使用了flex:1
	则这些子组件会平分父容器中剩余的空间。
	
	tips:
	1. 能够撑满剩余空间的前提是其父容器的尺寸不为0.如果父容器既没有固定的width和height,也没有设定flex,则父容器尺寸为0.
	其子组件如果使用了flex,也是无法显示的。
	2. 在react native中使用flexbox规则来指定某个组件的子元素的布局.Flexbox可以在不同屏幕尺寸上提供一致的布局结构。
	3. 3个常用属性 flexDirection justifyContent 和 alignItems三个样式属性就已经满足大多数布局需求。
	4. 在React Native中 flexDirection的默认值是column而不是row。


	Flex Direction
		column(默认) | row
		
	Justify Content
		flex-start center flex-end space-around space-between
	
	Align items
		决定子元素沿次轴的排列方式。 flex-start center flex-end stretch
		
# 文本样式和图片
	
	
	Text:
		selectable: 是否可以长按选择文本,以便复制和粘贴。
		ellipsizeMode: 这个属性通常和numberOfLines属性配合使用,表示当Text组件无法全部需要显示的字符串时如何
		用省略号进行修饰。
			head: 头部截取显示省略号
			middle: 文本内容中间截取显示省略号
			tail: 从文本内容尾部截取显示
			clip: 不现实省略号,直接从尾部截断
		
		
		onLayout
			在加载或者布局变化以后调用,{nativeEvent:{x,y,width,height}}
		
		onLongPress
			当文本被长按以后调用此回调函数。
			
		onnPress
			当文本被点击以后调用此回调函数
		
		numberOfLines	文本超出多少行显示省略号
		
		selectionnColor: the highlight color of the text
	
	Image组件
		1. 本地图片引入方式
	<Image source={require("./imgs/xxx.jpg")}/>
	图片的查找和js模块的查找方式一样,还可以使用@2x,@3x这样的文件名后缀,来为不同的屏幕精度提供图片。
	
		tips: 如果有 xxx.ios.png 和 xxx.android.png Packager会根据平台而选择不同的文件。
		这种方式引用的图片咨询包含图片的尺寸信息,如果需要动态缩放图片,可能需要手动在style属性设置{width:null,height:null}
		网络图片需要手动指定图片的尺寸
		require中的图片名字必须是一个静态字符串(不能使用变量,因为require是在编译时期执行,而非运行时器执行)。
		
		2. 网络图片引入方式
	<Image source={{uri:"https://xxx.jpg"}} style={{width:100,height:100}}/>
	
	
	背景图片： <ImageBackground>
	
## Image props
	
	borderTopRightRadius
	borderBottomLeftRadius
	borderBottomRightRadius
	borderTopLeftRadius
	opacity
	resizeMode
		cover:
			保持图片宽高比的前提下缩放图片,直到宽度和高度都大于等于容器的视图的尺寸
		contain:
			保持图片宽高比的前提下缩放图片,直到宽度和高度都小于等于容器视图的尺寸
		stretch:
			拉伸图片且不维持宽高比,直到宽高都刚好填满容器
		repeat:
			重复平铺图片直到填满容器,图片会维持原始尺寸
			
	resizeMethod
		当图片实际尺寸和容器样式尺寸不一致时,决定以怎样的策略来调整图片的尺寸。
			
	overlayColor
		当图片有圆角的时候,指定一个颜色用于填充圆角处的空白。
	
	prefetch()
		预加载一个远程图片(将其下载到本地磁盘缓存)
	
	onLoad
		加载成功后调用
		
	onLoadEnd
		加载结束后,不论成功还是失败,
		
	onLoadStart
		开始加载时调用
	
# TextInput
	
	允许用户输入文本的基础组件。 onChangeText的属性,接受一个函数,在文本变化时被调用。onSubmitEditing的属性
	在文本被提交后调用。
	
	placeholderTextColor  	占位符的颜色
	keyboardType,在所有平台都可用：
		default
		number-pad
		decimal-pad
		numeric
		email-address
		phone-pad
	
	
	tips:TextInput在安卓上默认有一个底边框,同时会有一些padding。如果要想看起来和IOS上尽量一致,需要设置padding:0
		
		autoFocus
			如果为true,在componentDidMount后会自动获得焦点。默认false
		blurOnSubmit
			如果为true,文本框会在提交的时候失焦。对于单行输入框默认值为true,多行则为false。
		tips:
			对于多行输入框来说,如果将blurOnSubmit设为true,则在按下回车键时就会失去焦点同时触发onSubmitEditing事件,
			而不会换行。
	
	defaultValue: 提供一个文本框的初始值。
	
	editable 文本框是否可以编辑。
	lineImageLeft
			指定一个图片放在左侧。
	maxLength
		限制文本框中最多的字符数。
		
	multiline
		如果为true,文本框中可以输入多行文字。默认为false。
		tips: 安卓上设置mutiline={true},文本默认会垂直居中。可以设置 textAlignVertical:"top"
		
	numberOfLines
		设置输入框的行数。当multiline为true时使用它，可以占据对应的行数
		
	onBlur()
		当文本框失去焦点的时候调用此函数。
	
	onChange()
		当文本框内容变化时调用此函数,回调参数为{nativeEvent:{eventCount,target,text}}
		
	onFocus()
		当文本框获得焦点的时候,回调参数为 {nativeEvent:{target}}
		
	onKeyPress
		当一个键被按下的时候调用。传递给回掉函数的参数为{nativeEvent:{key:keyValue}}
		
	onSelectionChange
		长按选择文本时,选择范围变化时调用此函数,需要设置multiline=true
		
	onSubmitEditing
	当软键盘的确定/提交按钮被按下的时候调用此函数，所传参数为{nativeEvent: {text, eventCount, target}}

	placeholder	占位符
	
	placeholderTextColor 占位符颜色
	
	selection:
		设置选中文字的范围.如果首尾为同一索引位置,则相当于指定光标的位置。
		
	selectionColor
		设置输入框高亮时的颜色
		
	selectTextOnFocus
		获得焦点的时候,所有的文字都会被选中。
		
	clear()
		清空输入框的内容
		
		
# ScrollView

	ScrollView是一个通用的可滚动的容器。可以在其中放入多个组件和视图,不仅可以垂直滚动,还能水平滚动。
	
	在ios ScrollView 设置style限制不了高度, 可以给整个组件再套一个View容器,样式设置到容器上
	
	弊端:
	1. 性能不好,会一次性把整个组件给渲染出来。即使有些组件因为内容太长被挤出了屏幕外。
	2. 浪费内存,拖累性能

	优点:
	1. 使用简单
	
	tips:
	1. ScrollView必须有一个确定的高度才能正常工作,一般确定所有的父容器都有确定的高度,然后给ScrollView设置flex:1
	以使其自动填充父容器的空余空间。
	
## props

	contentContainerStyle
		样式会应用到一个内层的内容容器上,所有的子视图都会包裹在内容容器内。
```js
return (
  <ScrollView contentContainerStyle={styles.contentContainer}>
  </ScrollView>
);
...
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});
```
	showsVerticalScrollIndicator
		true时显示一个垂直方向的滚动条
		
	showsHorizontalScrollIndicator
		true时显示一个水平方向的滚动条
		
	horizontal=true
		所有的子视图会在水平方向上排成一行。
		
	padingEnabled=true
		滚动条会停在滚动视图的尺寸的整数倍位置。可以用在水平分页上。默认为false
		tips: 垂直分页在Android上不支持
		
	onMomentumScrollEnd
		滚动一帧结束的时候发生
		e.nativeEvent.contentOffset.x
		
	onMomentumScrollBegin
		滚动动画开始时调用
	
	pagingEnabled:true
		滚动条会停在滚动视图的尺寸的整数倍位置。可以用在水平分页上。
		
	decelerationRate:
		一个浮点数,用于决定当用户抬起手指之后,滚动视图减速停下的速度。 也可以设置为"normal" 或 "fast"
		
# 长列表

	高性能的简单列表组件,会惰性渲染子元素,出现在屏幕中时开始渲染。 React Native提供了几个使用于展示长列表数据的组件。
	FlatList或者SectionList。
	
## FlatList

	FlatList组件用于显示一个垂直的滚动列表,其中的元素之间的结构近似而仅数据不同。
	
	FlatList更适于长列表数据,元素个数可以增删。和ScrollView不同的是,FlatList并不立即渲染所有元素,而是优先渲染屏幕上
	可见的元素。
	
	FlatList组件必须的两个属性是 data和 renderItem, data是列表的数据源,而renderItem则从数据源中逐个解析数据,
	然后返回一个设定好格式的组件来渲染。
	
## SectionList
	
	如果要渲染一组需要分组的数据,可以选择用SectionList
	
	renderItem={({item})=> <Text>{item}</Text>}   返回数据的每一项
	renderSectionHeader={({section})=><Text>{section.title}</Text>} 返回数据标题
	
	绑定Key值  keyExtractor={(item, index) => index}
	
# StatusBar

	用于控制应用状态的组件。
	barStyle 文本颜色    ios黑色   安卓默认白色
		白色: light-content
		黑色: dark-content
	
	隐藏状态栏: hidden:true
	
	布局在android下是从状态下开始的,而在ios下是默认从顶部开始,如果也想让安卓从最顶端开始布局,可以使用
	translucent={true}
	
	状态栏颜色: backgroundColor
	
# NativeModules

	StatusBarManager   
		顶部状态栏的高度: StatusBarManager.HEIGHT
		 
	获取平台:
		platform.OS
```js
example:
1. 显示字符串
const plat = Platform.select({
	ios:"这是苹果设备",
	android:"这是安卓设备"
})
{plat}

2. 也可以在不同的设备显示不同的组件
const plat = Platform.select({
	ios:Card,
	android:Grid
})
```

# TouchableHighlight

	用于封装视图,使其可以正确响应触摸操作。当按下的时候,封装的视图的不透明度会降低,同时会有一个底层的颜色透过而被用户
	看到,使得视图变暗或变亮。
	
	tips:
	1. TouchableHighlight 只支持一个子节点。如果希望有多个子组件,可以用一个View来包装它们。
	2. underlayColor 有触摸操作时显示出来的底层的颜色

# TouchableOpacity

	用于封装视图,使其可以正确响应触摸操作。当按下的时候,封装的视图的不透明度会降低。
	与TouchableHighlight的区别在于并没有额外的颜色变化,更适于一般场景。
	
	activeOpacity: 被触摸时工作激活时以多少不透明度显示。
	
	
# React Navigation

	npm install --save react-navigation
	
	npm install --save react-native-gesture-handler
	
	react-native link react-gesture-handler
	
## Usage
	
	improt Icon from "react-native-vector-icons/FontAwesome";	
		<Icon name={} size={} color={}/>	
		
		size 默认:12
		name
		color
		
# Navigator

	Stack Navigator
	
	1. createStackNavigator是一个函数,它接受一个路由配置对象和一个可选对象并返回一个React组件。
	2. 路由配置对象中的key是路由名称,value是该路由的配置。配置中唯一必须的属性是screen
	3. 如果要指定堆栈中的初始路由,请在堆栈选项对象上设置initialRouteName.

	导航：
	this.props.navigation.navigate("Details")
		使用要跳转的路由的名称来调用navigate方法。
	tips:
	1.	如果使用未在stack navigator中定义的路由名称来调用this.props.navigator.navigate方法，则不会发生仍和事情。
		只能导航到已经在我们的stack navigator上定义的路由,不能随便导航到任意组件。
	2.  当用户从 A 路由跳转到 B 路由，A 将被卸载（ componentWillUnmount方法将被调用），当用户回来时，A 路由将再次被加载。
	3.  navigation.popToPop()	可以返回堆栈中的第一个页面
	4.  navigation.push("Details") 会在堆栈中一直添加页面

## 传递参数
	
	1. 将参数包装成一个对象,作为navigation.navigate方法的第二个参数传递给路由。
		this.props.navigation.navigate("Detail",{params})
	tips:
		推荐传递的参数是JSON序列化的,这样就可以使用state持久化。
		
	2. 读取页面组件中的参数的方法:
		this.props.navigation.state.params,如果没有提供参数,这可能是null,所以使用getParam通常更容易。
		也可以使用 this.props.navigation.getParam读取参数。
		
## 配置标题栏

	每个页面组件都一个名为 navigationOptions的静态属性,它是一个对象或一个返回包含各种配置选项的对象的函数。
```js
class HomeScreen extends React.Component{
	static navigationOptions:{
		title:"Home"
	}
}
```
	tips:
	1. 默认情况下按照平台惯例设置,在iOS上标题居中,在Android上左对齐。

	在标题中使用参数：
		需要使用navigationOptions成为一个返回配置对象的函数。
		
	使用setParams更新 navigationOptions
		this.props.navigation.setPatams({msg:"Hello"})
							此处的key值和上一个组件传递过来的key值相同。
						
## 设置标题颜色

	headerStyle: 一个应用于header的最外层View的样式对象
	headerTintColor: 返回按钮和标题都使用这个属性作为它们的颜色。
	headerTitleStyle:可以为标题定制fontFamily,fontWeight,和其他Text样式属性.
	
	跨页面共享的navigationOptions 将配置移动到 defaultNavigationOptions 属性下的stackNavigator中。
	
	
# createBottomNavigator

	navigationOptions:
		tabBarLabel: 底部导航栏的标题
		tabBarIcon:	 底部导航栏的图标 
		
		
# React-Native CloudMusicApp

	react-native-swiper
		tips: 使用轮播图组件不自动轮播的话 添加一个key属性 值为 banner.length
	
	react-native中 position只能设置 absolute 和 relative.
	
	react-native-scrollable-tab-view
	
		
	
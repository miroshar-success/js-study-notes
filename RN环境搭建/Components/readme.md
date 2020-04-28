# Image

    静态图片资源：
    要往App中添加一个静态图片,只需要把图片文件放在代码文件夹中某处。然后引用它：
    
```jsx harmony
<Image source={require('./my-icon.png')}/>
```
    tips:
        1. 如果有my-icon.ios.png 和 my-icon.android.png,Packager会根据平台而选择不同的文件。
        2. 还可以使用@2x @3x 这样的文件名后缀,来为不同的屏幕精度提供图片。
        3. require中的图片名字必须是一个静态字符串(不能使用变量,因为require是在编译时期执行,而非运行时期执行！)。
     
     读取本地静态图片则无须指定尺寸,因为它们的尺寸在加载时就可以立刻知道。 比如这样一个引用
        require('./my-icon.png')的实际输出结果可能是:
            {'_packager_asset':true,"uri":"my-icon.png",width:591,height:573}
     
    静态的非图片资源
        require语法也可以用来静态地加载项目中的声音，视频或者文档文件。大多数常见文件类型都支持。    
        
    网络图片：
        与静态资源不同的是,需要手动指定图片的尺寸。同事建议使用https以满足iOS App Transport Security的要求。
```jsx harmony
<Image
  source={{
    uri: 'https://facebook.github.io/react/logo-og.png',
    method: 'POST',
    headers: {
      Pragma: 'no-cache',
    },
    body: 'Your Body goes here',
  }}
  style={{width: 400, height: 400}}
/>
```
    uri数据图片
        有时候可能拿到的图片是base64数据,此时可以使用:'data:'格式来显示图片。需要手动指定图片的尺寸。
            tips:
                1. 建议仅对非常小的图片使用base64数据。比如一些小图标
             
```jsx harmony
<Image
  style={{
    width: 51,
    height: 51,
    resizeMode: 'contain',
  }}
  source={{
    uri:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
  }}
/>
``` 
   
## 缓存控制(仅iOS)
    
    在某些情况下可能仅仅想展示一张已经在本地缓存的图片。缓存资源属性提供了你控制网络层与缓存交互的方式。
        default: 使用原生平台默认策略
        reload: URL的数据将从原始地址加载。不使用现有的缓存数据。
        force-cache: 现有的缓存数据将用于满足请求，忽略其期限或者到期日。如果缓存中没有对应请求的数据,
        则从原始地址加载。
        only-if-cached:现有的缓存数据将用于满足请求，忽略其期限或到期日。如果缓存中没有对应请求的数据，则不尝试
        从原地址加载，并且认为请求是失败的。
    
## 背景图片与嵌套写法

    <ImageBackground> 组件(props与<Image>完全相同),然后把需要背景图的子组件潜入其中即可。
    
```jsx harmony
retutn (
    <ImageBackground
        source={{...}}
         style={{width:'100%',height:'100%'}}
    >
        <Text>Inside</Text>
    </ImageBackground>
)
```

# TextInput    

    TextInput是一个允许用户输入文本的基础组件。 onChangeText属性,接受一个函数，此函数会在文本变化时被调用。
    onSubmitEditing 会在本文被提交后调用。
    
    常用事件:
        1. onChangeText
        2. onSubmitEditing
        3. onFocus
        
    tips:
        1. 注意有些属性仅在multiline为true或者为false的时候有效。当multiline=false时,为元素的某一个边框添加样式
        将不会生效。
        2. TextInput在安卓上默认有一个底边框,同时会有一些padding。
        
    props:
        maxLength 可以输入的最长文本字符串长度
        autoCapitalize:
            控制TextInput是否要自动将特定字符切换为大写。
                characters:所有的字符。
                words: 每个单词的第一个字符
                sentences: 每句话的第一个字符(默认)
                none: 不切换
                
        autoComplete
        autoFocus
            true，在componentDidMount后会获取焦点
        blurOnSubmit
            如果为true,文本框会在提交的时候失去焦点。单行输入框默认值为true,多行则为false。
        caretHidden
            如果为true,则隐藏光标。默认值为false。
        clearButtonMode
            是否要在文本框右侧显示'清除'按钮。仅在单行模式下可用。
                never while-editing unless-editing always。
        clearTextOnFocus
            如果为true,每次开始输入的时候都会清除文本框的内容。        
        editable
            如果为false,文本框是不可编辑的。默认值为true。
        inlineImageLeft
            指定一个图片放在左侧。图片必须放置在/anroid/app/src/main/res/drawable目录下。
        inlineImagePadding
            给放置在左侧的图片设置padding样式。
        keyboardType
            决定弹出何种软键盘类型:
                default/number-pad/decimal-pad/numeric/email-address/phone-pad
        multiline
            如果为true,文本框中可以输入多行文字。默认为false。
        numberOfLines
            设置输入框的行数。当multiline为true时使用它，可以占据对应的行数。
            
        onBlur
            当文本框失去焦点的时候调用此函数
        
        onChange
            当文本框内容变化时调用此函数。回调参数为{'nativeEvent':{eventCount,target,text}}
        
        onEndEditing
            当文本输入结束后调用此回调函数
        
        onFocus
            当文本框获得焦点的时候调用此回调函数。
            
        onKeyPress
            当一个键被按下的时候调用此回调。
            
        onSelectionChange
            长按选择文本时,选择范围变化时调用此函数。
            
        onSubmitEditing
            当软键盘的 确定/提交 按钮被按下的时候调用此函数。如果multiline={true} 此属性不可用。
            
        placeholder
            
        placeholderTextColor
        
        returnKeyType
     
## 处理触摸事件

    Button 按钮组件
    
        props:
            onPress 
            title
            color
                
    Touchable系列组件
        TouchableHighlight          会在用户手指按下时变暗。
            props:
                activeOpacity: 指定封装的视图在被触摸系统激活时以多少不透明度显示(0-1之间),默认0.85
                underlayColor: 有触摸操作时显示出来的底层的颜色。
                
        TouchableOpacity            会在用户手指按下时降低按钮的透明度,而不会改变背景的颜色。
            用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低。
            props:
                activeOpacity: 指定封装的视图在被触摸操作激活后以多少不透明度显示(0-1之间)，默认0.2。
                
        TouchableWithoutFeedback    没有任何视觉反馈
    
        TouchableNativeFeedback     会在用户手指按下时形成类似墨水涟漪的视觉效果

# 滚动视图

    ScrollView:
        ScrollView 适合用来显示数量不多的滚动元素。放置在ScrollView中的所有组件都会被渲染,哪怕有些组件因为内容太长
        被挤出了屏幕外。如果需要显示较长的滚动列表,那么应该使用功能差不多但性能更好的FlatList组件。
        
        ScrollView 必须有一个确定的高度才能正常工作。因为它实际上所做的就是将一系列不确定高度的子组件装进一个确定高度的容器。
        
        tips:
            在iOS上 A ScrollView with a single item can be used to allow the user to zoom content.Set up the 
            maximumZoomScale and minimumZoomScale props and your user will be able to use pinch and expand 
            gestures to zoom in and out.
    
    props:
        1. alwaysBounceVertical
            当此属性为true时，垂直方向即使内容比滚动视图本身还要小,也可以弹性地拉动一截。
            
        2. contentContainerStyle
            这些样式会应用到一个内层的内容容器上。所有的子视图都会包裹在内容容器内。
            
        3. keyboardDismissMode
            用户拖拽视图的时候,是否要隐藏软键盘。
                'none'      --- 拖拽时不隐藏软键盘。
                'no-drag'   --- 当拖拽开始的时候隐藏软键盘
        
        4. onContentSizeChange
            此函数会在ScrollView内部可滚动内容的视图发生变化时调用。
            
        5. onMomentumScrollBegin
            滚动动画开始时调用此函数。
            
        6.  onMomentumScrollEnd
            滚动动画结束时调用此函数。
    
    长列表: FlatList 和 SectionList
        FlatList组件用于显示一个垂直的滚动列表,其中的元素之间结构近似而仅数据不同。FlatList更适合于长列表数据,
        且元素个数可以增删。FlatList并不立即渲染所有元素,而是优先渲染屏幕上可见的元素。
        
        Props:
            data 和 renderItem。  data是列表的数据源,而renderItem则从数据源中逐个解析数据。然后返回一个设定好格式
            的组件来渲染。
```jsx harmony
import { FlatList, Text, View } from 'react-native';

export default class FlatListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          // 
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}
```
            
    如果要渲染一组需要分组的数据,可以使用SectionList。
        SectionList需要提供一个keyExtractor属性。
```jsx harmony
export default class SectionListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
```
    
    
    
    
    
    
    
        
        
        
        
        
        
        
        
        
        
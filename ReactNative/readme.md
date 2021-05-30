# 安装

    node
    watchman
    XCode: 编译iOS应用所需的工具和环境
    CodoaPods
    
    安装Homebrew
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

    Paste that in a macOS Terminal of Linux shell prompt;
    
    安装node 和 Watchman
    
        Watchman是由Facebook提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能(packager可以快速捕捉文件的变化从而实现
        实时刷新)。
        
            brew install node
            
            brew install watchman
        
    更新node版本：
        1. 清除node.js 的cache
            sudo npm cache clean -f
        2. 安装n工具
            sudo npm install -g n
        3. 用n工具安装最新版本的node.js
            sudo n stable

## Yarn
    
    Yarn 是Facebook提高的替代npm的工具，可以加速node模块的下载。
    
        npm install -g yarn
    安装完yarn之后可以使用yarn代替npm,
    yarn 代替 npm install命令。用yarn add MODULE_NAME 代替 npm install MODULE_NAME;
    
## CocoaPods
    
    CocoaPods是用Ruby编写的包管理器。从0.60版本开始的react native的ios版本需要使用CocoaPods来管理依赖。
    
    sudo gem install cocoapods
    或者:
    brew install cocoapods
    
```js
//  cd ~/.cocoapods/repos 
//  pod repo remove master
//  git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git master
```
    最后进入自己的工程,在自己工程的podFile第一行加上
```js
// source 'https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git'
```
[bug](https://www.jianshu.com/p/7b21254cbd77);

    
    安装好依赖后可以初始化项目：
        npx react-native init AwesomeProject
        
    cd ./AwesomeProject/ios
        pod install
![pod-install](https://github.com/JayK0720/Front-End/blob/master/RN%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/imgs/img-1.png)

    yarn ios
    或者
    yarn react-native run-ios
![yarn-ios](https://github.com/JayK0720/Front-End/blob/master/RN%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/imgs/img-2.png)
![successful](https://github.com/JayK0720/Front-End/blob/master/RN%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/imgs/img-3.png)
    
# 核心组件与原生组件

    Core Components
    React Native            Android View        Ios View
    UI Component
    
    <View>                  <ViewGroup>         <UIView>
    <Text>                  <TextView>          <UITextView>
    <Image>                 <ImageView>         <UIImageView>
    <ScrollView>            <ScrollView>        <UIScrollView>
    <TextInput>             <EditText>          <UITextField>
    
# Core Components

    <Text>
    
        Any JavaScript expression will work between curly braces,including function cals like 
        {getFullName('Rum','Tum','Tugger')}
    
    <TextInput>
    <View>
    
    <Image
        source={{uri:"http://www.xxx.jpg"}}
        style={{width:200,height:200}}
    />
    tips:
        1. 在iOS上使用http链接的图片地址可能不会显示，从Android9开始，也会默认阻止http请求。
    
    <Button
        onPress={}
        disabled
    />
    
# Props和State

    我们使用两种数据来控制一个组件:props和state。props是在父组件中指定,而且一经指定,在被指定的组件的生命周期中则不再改变。
    对于需要改变的数据,我们需要使用state。
```jsx harmony
function Blink(props){
    const [isShowingText,setIsShowingText] = useState(true);
    const timer = useRef();
    useEffect(() => {
        timer.current = setInterval(() => {
            setIsShowingText(!isShowingText);
        },1000);
        return () => {
            clearInterval(timer.current);
        }
    },[isShowingText]);
    if(!isShowingText) return null;
    return (
        <Text>{props.text}</Text>
    )
}

class App extends Component {
    render() {
        return (
                <SafeAreaView
                    style={{
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <Blink text={'Hello World'}/>
                    <Blink text={'Hello React-Native'}></Blink>
                    <Blink text={'Hello Vue.js'}></Blink>
                </SafeAreaView>
        );
    }
}
```

# StyleSheet

    使用StyleSheet.create来集中定义组件样式。
```jsx harmony
const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
```
    React Native中的尺寸都是无单位的,表示的是与设备像素密度无关的逻辑像素点。
    
    React Native中的FlexBox的工作原理和web上的css基本一致，也存在少许差异。首先是默认值不同:
        1. flexDirection的默认值是column而不是row.
        2. flex只能指定一个数字值。
        
        
        Justify Content:
            justifyContent可以决定其子元素沿着主轴的排列方式。可选项有:
                flex-start, flex-end, center, space-around, space-between, space-evenly.
                
        space-between space-evenly 的区别：
        假设有3个子元素, 
            space-evenly： 容器剩余空间由4个间隙平分
            space-between: 容器剩余空间由3个间隙平分
            
    
        Align Items
            在组件的style中指定的 alignItems 可以决定其子元素沿着次轴的排列方式。可选项有:
                flex-start, center, flex-end ,stretch。
                tips: 只有将子元素样式中的width:50 去掉之后,alignItems:'center' 才能生效。
                
        Align Self
            alignSelf has the same options and effect as alignItems but instead of affecting the children within
            a container, you can apply this property to a single child to change it's alignment within its parent.
            alignSelf overrides any option set by the parent with alignItems。
            
        Align content
            alignContent defines the distribution of lines along the cross-axis. This only has effect when items 
            are wrapped to multiple lines using flexWrap。
            
        Flex Wrap
            The flexWrap property is set on containers and controls what happens when children overflow the
            size of the container along the main axis. By default children are forced into a single line(which can
            shrink elements).If wrapping is allowed items are wrapped into multiple lines along the main axis if needed.
            
    
    
    
    
    
    
    
    
    
    
    
    
    
    
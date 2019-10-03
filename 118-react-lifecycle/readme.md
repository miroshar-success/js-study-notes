
# React.createElement()
    
    babel会把JSX转译为一个名为React.createElement()的函数调用
```js
const element = (
    <h1 className="greeting">
        Hello World!    
    </h1>
)

const element = React.createElement(
    "h1",
    {className:"greeting"},
    "Hello World!"
)


// 实际上,它创建了这样的对象
const element = {
    type:"h1",
    props:{
        className:"greeting",
        children:"Hello World!"
    }
}
```
# React.Component / React.PureComponent
    
    React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 
    shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。
    
    tips:
    1. React.PureComponent中的shouldComponentUpdate()将跳过所有子组件树的prop更新。
    
# Refs

    Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素
    
    何时使用Refs
    1. 管理焦点,文本选择或媒体播放
    2. 触发强制动画
    3. 集成第三方DOM库。
    
## 创建Refs

    Refs是通过Ref.createRef()创建的,并通过ref属性附加到React元素。在构造组件时,通常将Refs分配给实例属性,以便
    可以在整个组件中引用它们。
    
    ref的值根据节点的类型有所不同:
    1. 当ref属性用于HTML元素时,构造函数中使用React.createRef()创建的ref接收底层DOM元素作为其current属性
    2. 当ref属性用于自定义class组件时,ref对象接收组件的挂载实例作为其current属性。
    
## 回调Refs

    React也之支持另一种设置refs的方式,称为回调refs, 回调refs接收一个React组件实例或者HTML DOM元素作为参数,以便他们
    能在其他地方被存储和访问.
    
    
    tips:
    1. 如果还在使用this.refs.textInput这种方式访问refs,建议用回调refs或React.createRef API的方式代替。
    2. 绑定在组件上时,可以获取组件上的方法
    
# 生命周期

    componentDidMount
    componentWillMount
    componentDidUpdate
    componentWillUnmount
    componentWillReceiveProps
    shouldComponentUpdate(nextProps,nextState)
        return true/false 是否需要重新渲染
    componentWillUpdate
    componentDidUpdate
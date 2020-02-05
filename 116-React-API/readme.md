# React.Component

    定义React组件的基类:
    
```jsx harmony
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

# React.PureComponent

    React.Component并未实现shouldComponentUpdate(),而React.Component中以浅层对比prop和state的方式来
    实现了该函数。
    tips:   
        1. 如果赋予React组件相同的props和state,render()函数会渲染相同的内容,那么在某些情况下使用React.PureComponent
        可提高性能。
        
# React.createElement

```jsx harmony
React.createElement(
    type,
    [props],
    [...children]
)
```
    type: 可以是HTML元素 或者 React 组件 和 函数组件,也可以是 Fragment元素
    
# React.Fragment

    React.Fragment组件能够在不额外创建DOM元素的情况下，让render()方法中返回多个元素
    
```jsx harmony
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```
# React.createRef

```jsx harmony
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```
# React.lazy

    React.lazy允许你定义一个动态加载的组件。这有助于缩减boundle的体积,并延迟加载在初次渲染时未用到的
    组件
```jsx harmony
// 这个组件是动态加载的
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```
    
# 生命周期
    
    1. 当组件实例被创建并插入DOM中时,生命周期调用顺序:
        constructor()
        static getDerivedStateFromProps()
        render()
        componentDidMount()
    
    2. 当组件的props或state发生变化时会触发更新.更新顺序为:
        static getDerivedStatedFromProps()
        shouldComponentUpdate()
        render()
        getSnapshotBeforeUpdate()
        componentDidMount()
    
    3. 当组件从DOM中移除时调用下面当周期函数:
        componentWillUnMount()
        
    4. 错误处理
        static getDerivedStateFromError()
        componentDidCatch()
        
## render

    render() 方法是 class 组件中唯一必须实现的方法。
    render() 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，
    并且它不会直接与浏览器交互。

## constructor

    constructor()
    如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。
    
    通常，在 React 中，构造函数仅用于以下两种情况：
        1. 通过给 this.state 赋值对象来初始化内部 state。
        2. 为事件处理函数绑定实例
```jsx harmony
constructor(props) {
  super(props);
  // 不要在这里调用 this.setState()
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```
## componentDidUpdate

    componentDidUpdate(prevProps, prevState, snapshot)
    componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法
```jsx harmony
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```
    tips:
    1. 也可以在componentDidUpdate()中直接调用setState(),但是必须被包裹在一个条件语句里。否则会导致死循环。
    
## componentWillUnmount

    componentWillUnmount() 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，
    取消网络请求或清除在 componentDidMount() 中创建的订阅等
    
    componentWillUnmount() 中不应调用 setState()，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。
    
## componentDidCatch

    componentDidCatch(error, info)
```jsx harmony
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显示降级 UI
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // "组件堆栈" 例子:
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级 UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```
    tips:
    如果发生错误，你可以通过调用 setState 使用 componentDidCatch() 渲染降级 UI，但在未来的版本中将不推荐这样做。
    可以使用静态 getDerivedStateFromError() 来处理降级渲染。
    
![生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
    

# API
    
    可以在组件中调用的方法。
        setState() 和 forceUpdate()
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
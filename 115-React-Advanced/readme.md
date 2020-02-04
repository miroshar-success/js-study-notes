# Context

    Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据
```jsx harmony
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {__
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```
    tips:
    1. Context主要应用场景在于很多不同层级的组件需要访问同样的一些数据
    2. 当Provider的value值发生变化时,它内部的所有消费组件都会重新渲染
    
## API

    1. React.createContext(defaultValue)
```jsx harmony
const MyContext = React.createContext(defaultValue);
```
        1. 当React渲染一个订阅了这个Context对象的组件,这个组件会从组件树离自身最近的那个匹配的Provider中读取到
        当前的context值。
        2. 组件树中没有匹配到Provider时,defaultValue才会生效。
        3. 将undefined传递给Provider的value时,消费组件的defaultValue不会生效
    
    2. Context.Provider
       每个Context对象都会返回一个Provider.React组件,它允许消费组件订阅context的变化。
```jsx harmony
<MyContext.Provider value={defaultValue}/>
```
    
    3. Class.contextType
        挂载在class上的contextType属性会被重赋值为一个由 React.createContext()创建的Context对象。 这能让你使用
        this.context来消费最近Context上的那个值。可以在任何生命周期中访问到它,包括render函数中。
    
    tips:
        1. 只通过该API订阅单一context。
        2. 可以使用static这个类属性来初始化contextType
        
    3. Context.Consumer
```jsx harmony
<MyContext.Consumer
    value={defaultValue}
>
</MyContext.Consumer>
``` 
    4. Context.displayName
        context对象接受一个名为displayName的property，类型为字符串。 React Devtools使用该字符串来确定
        context要显示的内容。
        
```jsx harmony
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```    

# 错误边界

    错误边界是一种React组件,这种组件可以捕获并打印发生在其子组件树任何位置的JavaScript错误,并且它会渲染出备用UI.
    而不是崩溃了的子组件树。错误边界在渲染期间,生命周期方法和整个组件树的构造函数中捕获错误
    
    tips:但错误边界无法捕获以下场景中产生但错误:
        1. 事件处理
        2. 异步代码
        3. 服务端渲染
        4. 它自身抛出来的错误(并非它的子组件),仅可以捕获其子组件的错误，无法捕获自身的错误！
        
    如果一个class组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 两个生命周期方法中的任意
    一个,那么它就变成一个错误边界。
    static getDerivedStateFromError() 渲染备用UI, componentDidCatch() 打印错误信息
    
# Fragments

    React中的一个常见模式是一个组件返回多个元素。Fragments允许你将子列表分组,而无需向DOM添加额外节点。
    
    tips:
        1. key是唯一可以传递给Fragment的属性。
```jsx harmony
// Table组件
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}

// Columns组件
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

# JSX

    1. JSX 是 React.createElement(component,props,children)函数的语法糖。
```jsx harmony
<MyButton color="blue" shadowSize={2}>Click Me</MyButton>

// 会被编译为:
React.createElement(
    MyButton,
    {color:blue},
    "Click Me"
)

    // 如果没有子节点,可以使用自闭合的标签形式:
<div className="sidebar"/>

// 会被编译为:
React.createElement(
    "div",
    {className:"sidebar"},
    null
)
```
    2. JSX中可以使用 点语法，当在一个模块中导出许多React组件时
```jsx harmony
const MyComponent = {
    DatePicker: function DatePicker(props){
        return <div style={{background:props.color}}>我是DatePicker组件</div>
    }
}
function BlueDatePicker(){
    return <MyComponent.DatePicker color="blue"></MyComponent.DatePicker>
}
ReactDOM.render(
    <BlueDatePicker/>,
    document.getElementById("demo")
)
```
    3. 用户定义的组件必须以大写字母开头
        以小写字母开头的元素代表一个 HTML 内置组件，比如 <div> 或者 <span> 会生成相应的字符串 'div' 或者 'span' 
        传递给 React.createElement（作为参数）
    
## JSX中的Props

    1. JavaScript表达式作为Props
```jsx harmony
{1 + 2 + 3 +4}
```
    tips: if语句以及for循环不是JavaScript表达式,所以不能在JSX中直接使用。
    
    2. 字符串字面量
```jsx harmony
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```    
    3. Props默认值是true
```jsx harmony
<MyTextBox autocomplete></MyTextBox>
和上面是等价的
<MyTextBox autocomplete={true}></MyTextBox>
```
    通常不建议这样使用,因为它可能与ES6对象简写混淆。 {foo} 是 {foo:foo}的简写 而不是{foo:true}
    
    
    3. 属性展开  {...props}
    
    以下两个组件是等价的：
```jsx harmony
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```
## JSX中的子元素

    包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性 props.children 传递给外层组件。
    
    1. 字面量字符串 
    此时 props.children 就只是该字符串
```jsx harmony
<MyComponent>Hello world!</MyComponent>
```
    2. JSX子元素
    3. JavaScript表达式作为子元素
```jsx harmony
function TodoList(){
    const todos = ["finish doc","submit pr","nag dan to review"];
    return (
        <ul>
            {todos.length && todos.map((item) => (<Item key={item} message={item} />))}
        </ul>
    )
}
ReactDOM.render(
    <TodoList/>,
    document.getElementById("list")
)
```
    4. 函数作为子元素
```jsx harmony
// 调用子元素回调 numTimes 次，来重复生成组件
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```
    tips: 这种用法不常见,但可以用来扩展JSX。
    
    5. 布尔类型、Null 以及 Undefined 将会忽略。
```jsx harmony
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>
``` 
    上面但渲染结果都是一样的，但是{0} 会渲染
    
# shouldComponentUpdate

    该方法会在重新渲染前被触发，其默认实现总是返回true，让React执行更新
    
```jsx harmony
shouldComponentUpdate(nextProps, nextState) {
  return true;
}


// demo
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
``` 
    大部分情况下,可以使用React.PureComponent来代替手写的shouldComponentUpdate。
    
# Portals

    Portal提供了一种将子节点渲染到存在于父组件以外的DOM节点的优秀的方案。
    
```jsx harmony
ReactDOM.createPortal(child,container)
```
    child是任何可渲染的React子元素.container是一个DOM元素。
    
    一个portal的典型用例是当父组件有overflow:hidden 或z-index样式时,但你需要子组件能够再视觉上'跳出'其容器。
    
    1. 一个从portal内部触发的事件会一直冒泡至包含React树的祖先，尽管这些元素并不是DOM树中的祖先。    
    
    
# Refs

    适合使用refs的情况:
    1. 管理焦点,文本选择或媒体播放
    2. 触发强制动画
    3. 集成第三方DOM库
    
    1. 创建Refs
    
```jsx harmony
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```
    2. 访问refs
    对该节点的引用可以在ref的current属性中被访问
        const node = this.myRef.current;
    
    2.1 当ref属性用于HTML元素时,构造函数中使用React.createRef创建的ref接受底层DOM元素作为其current属性
    2.2 当ref属性用于自定义class组件时,ref对象接收组件的挂载实例作为其current属性。
    
    tips:
        不能在函数组件上使用ref属性,因为它们没有实例,但是可以在函数组件内部使用ref属性。

# 非受控组件

    你可以 使用 ref 来从 DOM 节点中获取表单数据。
```jsx harmony
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
``` 
    在非受控组件赋予组件一个初始值,可以指定一个defaultValue属性,而不是value。
    
    tips:
        1. <input type="checkbox"/> 和 <input type="radio"/> 支持defaultChecked。
        2. <select>和<textarea> 支持defaultValue

## input[type="file"]

    在 React中, <input type='file'/>  始终是一个非受控组件,因为它的值只能由用户设置,而不能通过代码设置。   
```jsx harmony
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```
    
    
    
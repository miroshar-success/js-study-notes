<!-- TOC -->autoauto- [1. jsx语法](#1-jsx语法)auto    - [1.1. jsx特定属性](#11-jsx特定属性)auto    - [1.2. jsx表示对象](#12-jsx表示对象)auto- [2. 元素渲染](#2-元素渲染)auto    - [2.1. 更新已渲染的元素](#21-更新已渲染的元素)auto- [3. 组件 & props](#3-组件--props)auto    - [3.1. 组合组件](#31-组合组件)auto    - [3.2. props的只读性](#32-props的只读性)auto- [4. state](#4-state)auto- [5. 列表 && key](#5-列表--key)auto- [6. 受控组件](#6-受控组件)auto- [7. 组合vs继承](#7-组合vs继承)autoauto<!-- /TOC -->
# 1. jsx语法

    可以在jsx大括号内放置任何有效的JavaScript表达式。
```jsx harmony
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
    tips:
    1. 因为jsx语法更接近javascript而不是html,所以React Dom 使用camelCase(小驼峰命名)来定义属性的名称，而不是使用HTML
    属性名称的命名约定。
        eg: class==> className
            tabindex ==> tabIndex
    
    2. 如果一个标签里没有内容,可以使用/>来闭合标签
    3. jsx标签里可以包含很多元素
```jsx harmony
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
## 1.1. jsx特定属性

    1. 可以通过使用引号,来将属性值指定为字符串字面量
    const element = <div tabIndex='0'></div>;
    
    2. 也可以使用大括号，在属性值中插入一个javascript表达式：
    const element = <img src={user.avatarUrl}/>
    
    tips:
    1. 在属性中嵌入javascript表达式时，不要在大括号外面加上引号,应该仅使用引号 或大括号中的一个。
    
## 1.2. jsx表示对象

    babel会把jsx转译成一个名为React.createElement()函数调用。
```jsx harmony
const element = (
    <h1 className='greeting'>
        Hello,world!
    </h1>
)

const element = React.createElement(
    'h1',
    {className:'greeting'},
    'hello world!'
);
```
    以上两种代码完全等效！ React.createElement()会预先执行一些检查,以帮助编写无错误代码,但实际上创建了一个这样的对象:
```jsx harmony
const element = {
    type:'h1',
    props:{
        className:'greeting',
        children:'hello world'
    }
}
```
    这些对象被成为react元素！ 但对象不能直接作为react的元素，直接使用第三种写法会报错
    
# 2. 元素渲染

    React元素是创建开销极小的普通对象。React DOM 会负责更新DOM来与React元素保持一致。
    想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()
```jsx harmony
const element = <h1>Hello,World!</h1>;
ReactDOM.render(element,document.getElementById('root'));
```

## 2.1. 更新已渲染的元素

    React元素是不可变对象。一旦被创建就无法更改它的自元素或者属性。更新ui唯一的方式就是创建一个全新的元素,并
    将其传入ReactDOM.render()。
    
```jsx harmony
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```    

# 3. 组件 & props

    函数组件
```jsx harmony
function Welcome(props){
    console.log(props); // {name:'sara'}
    return <h1>Hello,{props.name}</h1>
}
ReactDOM.render(
    <Welcome name="sara"/>,
    document.getElementById('root')
)
```
    当react组件为用户自定义组件时,它会将jsx所接受的属性转换为单个对象传递给组件，这个对象被称之为'props'
    
    tips:
    组件名必须以大写字母开头。React会将以小写字母开头的组件视为原生DOM标签。
    
## 3.1. 组合组件

    可以创建一个可以多次渲染Welcome组件的App组件：
```jsx harmony
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

## 3.2. props的只读性

    所有React组件都必须像纯函数一样保护它们的props不被更改。
```jsx harmony
function formatDate(date) {
  return date.toLocaleDateString();
}

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};
ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  document.getElementById('root')
);
```

# 4. state

    state与props类似，但是state是私有的，并且完全受控于当前组件。
    
    class组件
```jsx harmony
class Clock extends React.Component{
    construtor(props){
        super(props)
        this.state = {
            date:new Date()
        }
    }
    componentDidMount(){
        this.timerID = setInterval(() => {
            this.tick()
        })  
    }   
    tick(){
        this.setState({
            date:new Date()
        })
    }
    componentWillUnmount(){
        this.clearInterval(this.timerID);
    }
    render(){
        return(
            <div>
                <h1>Hello,What are you waiting for?</h1>
                <p>{this.state.date.toLocaleTimeString()}</p>
            </div>
        )
    }
}
```
    tips:
    1. 构造函数是唯一可以为state赋值的地方
    2. state的更新可能是异步的。所以不要依赖它们的值来更新下一个状态。
    3. 修改state值:
      3.1 this.setState({
               comment:'Hello'
        }) 
      
      3.2 setState() 也可以接受一个函数而不是对象
         this.setState((state.props) => ({
            counter:state.counter + props.increment
         }))
    
    也可以使用普通函数
        this.setState( function(state,props){
            return {
                counter:state.counter + props.increment
            }
        } )

# 5. 列表 && key

```jsx harmony
function ListItem(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
    tips:
    1. 如果列表项目的顺序可能会变化,不建议使用索引来作key值，因为这样作会导致性能变差,还可能引起组件状态的问题。
    2. key会传递信息给React,但不会传递给你的组件。如果组件中需要使用key属性的值,使用其他属性名显示传递这个值。
    
# 6. 受控组件

    在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）之类的表单元素通常自己维护 state，并根据用户输入进行更新。
    而在 React 中，可变状态（mutable state）
    通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。
    
    我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作
    被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。    
```jsx harmony
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```
# 7. 组合vs继承
    
    children.props
```jsx
function FancyBorder(props){
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )
}

function WelcomeDialog(){
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    )
}
```
# create-react-server

    npx create-react-server my-server
    cd my-server
    npm start
    
    When you create a new server,the CLI will use yarn to install dependencies(when available).If you have Yarn
    installed,but would prefer to use npm,you can append --use-npm to the creation command.
    For example:
        npx create-react-server my-server --use-npm
```js
my-server/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.jsx
    App.test.js
    index.css
    node-app.js
    logo.svg
```   
    For the project to build,these files must exist with exact filenames:
        public/index.html   is the page template;
        src/node-app.js        is the JavaScript entry point;
    You can delete or rename the other files.
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
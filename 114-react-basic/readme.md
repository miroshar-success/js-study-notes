
# jsx语法

    可以在jsx大括号内放置任何有效的JavaScript表达式。
```js
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
```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
## jsx特定属性

    1. 可以通过使用引号,来将属性值指定为字符串字面量
    const element = <div tabIndex='0'></div>;
    
    2. 也可以使用大括号，在属性值中插入一个javascript表达式：
    const element = <img src={user.avatarUrl}/>
    
    tips:
    1. 在属性中嵌入javascript表达式时，不要在大括号外面加上引号,应该仅使用引号 或大括号中的一个。
    
## jsx表示对象

    babel会把jsx转译成一个名为React.createElement()函数调用。
```js
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
```js
const element = {
    type:'h1',
    props:{
        className:'greeting',
        children:'hello world'
    }
}
```
    这些对象被成为react元素！ 但对象不能直接作为react的元素，直接使用第三种写法会报错
    
# 元素渲染

    React元素是创建开销极小的普通对象。React DOM 会负责更新DOM来与React元素保持一致。
    想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()
```js
const element = <h1>Hello,World!</h1>;
ReactDOM.render(element,document.getElementById('root'));
```

## 更新已渲染的元素

    React元素是不可变对象。一旦被创建就无法更改它的自元素或者属性。更新ui唯一的方式就是创建一个全新的元素,并
    将其传入ReactDOM.render()。
    
```js
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

# 组件 & props

    函数组件
```js
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
    
## 组合组件

    可以创建一个可以多次渲染Welcome组件的App组件：
```js
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

## props的只读性

    所有React组件都必须像纯函数一样保护它们的props不被更改。
```js
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

# state

    state与props类似，但是state是私有的，并且完全受控于当前组件。
    
    class组件
```js
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

# 列表 && key

```js
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
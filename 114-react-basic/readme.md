
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
function tick(){
    const element = (
        <div>
            <h1>Hello,World</h1>
            <p>It is {new Date().toLocalTimeString()}</p>
        </div>
    )
    ReactDOM.render(
        element,
        document.getElementById('root')
    )
}
setInterval(tick,1000);
```
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
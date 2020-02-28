
# React Hook API

    Hook 可以让你在不编写class的情况下"勾入"React的特性。例如 useState 是允许你在React函数组件中添加
    state的Hook。
    
    Hook就是JavaScript函数,但是使用它们会有两个额外的规则:
    1. 只能在函数最外层调用Hook.不要在循环,条件判断或者子函数中调用。
        Only Call Hooks at the Top Level, Don't call Hooks inside loops,conditions,or nested functions.
    2. 只能在React的函数组件中调用Hook。不要在JavaScript函数中调用。也不能在class组件中使用！
    
    使用Hooks的冬季动机：
        1. 在组件之间复用状态逻辑很难
        2. this指向问题
        3. 每个生命周期函数常常包含一些不想关的逻辑。相关关联并且需要对照修改的代码被进行了拆分。很容易产生bug,
        并且导致逻辑不一致。
    
## useState
    
    useState是一种新方法，一般来说，在函数退出后变量就会'消失',而state中的变量会被React保留。
    
    通过在函数组件里调用它来给组件添加一些内部state. useState会返回一对值:当前状态和一个让你更新它的函数。
    可以在事件处理函数中 或 其他一些地方调用这个函数。但是它不会把新的state和旧的state进行合并。
    const [count,setCount] = useState(0);
        1. 唯一的参数是初始state
        2. 需要成对 获取count 和 setCount
        
    tips:
        1. useState的唯一参数就是初始state，初始state只有在第一次渲染时会被用到。
        2. state不一定要是一个对象。
        3. 可以在一个组件中多次使用State Hook;
        4. useState必须按照固定的顺序和次数调用。
```jsx harmony
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。初始值是0
  // 更改它的函数是setCount
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
    如果useState的初始值依赖于父组件的传入,为避免每次更新组件都调用获取初始值的方法,可以使用下面的写法
```jsx harmony
function App(props){
    /*
    defaultCount只会在第一次渲染的时候才会使用,但是每次获取defaultCount的计算逻辑还是会运行
    const defaultCount = props.defaultCount || 0;
    const [count,setCount] = React.useState(defaultCount);
    */
    const [count,setCount] = React.useState(() => {
        // 延迟初始化,这个函数只在初始渲染的时候才会运行
        console.log("initial count");
        return props.defaultCount || 0;
    })
    function handleClick(){
        setCount(count+1);    
    }   
    return (
        <div>
            <button onClick={handleClick}>Add</button>
        </div>
    )
}
```
    tips: 检查hooks语法的插件: eslint-plugin-react-hooks
    install:
        npm install eslint-plugin-react-hooks -D
    在package.json配置
```metadata json
//...
"eslintConfig":{
    "plugins":[
     "react-hooks"
    ],
    "rules":{
        "react-hooks/rules-of-hooks":"error"
    }
}
//...
```
    
## useEffect

    在React组件中执行过数据获取,订阅或者手动修改过DOM。我们统一把这些操作称为"副作用"。
    useEffect就是一个 Effect Hook,给函数组件增加了操作副作用的能力。它跟class组件的componentDidMount,
    componentDidUpdate和componentWillUnmount具有相同的用途。
```jsx harmony
// demo
function Example() {
  const [count, setCount] = useState(0);
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
    tips:
    1. 由于副作用是在组件内声明的,所以它们可以访问到组件的props和state。默认情况下,React会在每次渲染后调用副作用
    --- 包括第一次渲染的时候！
    2. 可以在组件中多次使用useEffect.
    3. 如果你的effect返回一个函数,React将会在执行清除操作时调用它
    
*Demo*
```jsx harmony
function App(){
    const [size,setSize] = React.useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })
    const [count,setCount] = React.useState(0)
    function handleClick(){
        setCount(count+1);
    }
    function onResize(){
        setSize({
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        })
    }
    // 相当于componentDidUpdate 和 componentWillUnmount
    /*
    可以传递一个空数组,数组的每一项不变的情况下，才会阻止useEffect重新执行
    */
    React.useEffect(() => {
        window.addEventListener("resize",onResize,false);
        return () => {
            window.removeEventListener("resize",onResize)
        }
    },[])
    /*
    定义一个useEffect,输出count的变化,如果没有传入第二个参数 [count],则在点击事件自增count
    和调整窗口大小时都会执行 这个副作用
    传递 [count] 表示 只在 count变化时才执行此条副作用,调整窗口时不执行。
    */ 
    React.useEffect(() => {
        console.log("count",count);
    },[count])
    // 相当于componentDidMount 和 componentDidUpdate
    React.useEffect(() => {
        document.title = `${count}`;
    })
    return (
        <div>
            <button
                onClick={handleClick}
            >Click {count}</button>
            <p>size:{size.width} X {size.height}</p>
        </div>
    )
}
```

## useContext

    useContext可以不使用组件嵌套就可以订阅React的Context。使用频率较低但是很有用的hook。
*Demo*
```jsx harmony
function Counter(){
    const count = React.useContext(CountContext);
    return (
        <h3>Counter-Count{count}</h3>
    )
}

function App(){
    const [count,setCount] = React.useState(0);
    const handleClick = () => {
        setCount(count+1)
    }
    return (
        <div>
            <button onClick={handleClick}>Click</button>
            <CountContext.Provider value={count}>
                <Counter/>
            </CountContext.Provider>
        </div>
    )
}
```

## useMemo

    memo 类似于PureComponent作用是 优化组件性能,防止组件触发重渲染, memo 针对一个函数组件
    是否重复执行。
    
    useMemo 针对一段函数逻辑是否重复执行。
    useMemo 是在渲染期间完成的,而useEffect是在渲染之后执行的。
    
    tips:
        useMemo(() => {},[])
    参数如果是空数组的话 只会执行一次。
    
    useMemo和useCallback的区别：
        useMemo(() => fn)
        useCallback(fn)
    
```jsx harmony
const Counter = memo(function Counter({count}){
    console.log("counter render");
    return (
        <div>
            <p>子组件Counter: {count}</p>
        </div>
    )
})

function App(){
    const [count,setCount] = useState(0);
    const [time,setTime] = useState(new Date().getMilliseconds());
    const handleAdd = () => {
        setCount(count+1);
    }
    const handleChangeTime = () => {
        setTime(new Date().getMilliseconds());
    }
    function doubleCount(count){
        console.log("doubleCount - function - 执行了");
        return count * 2;
    }
        /* 这种写法 每次count 和 time 变化时 都会 执行doubleCount 函数 */
    // const dbCount = doubleCount(count);

    /* 使用useMemo 可以阻止重复执行逻辑函数 第一个参数为一个回调函数,第二个参数参数有三种情况:
    *  1. 什么都不传的话，则跟不使用useMemo效果是一样的，每次在不修改count的情况下也会执行。
    *  2. 传递一个空数组,则只会在初始渲染时执行一次,即使count改变时也不会执行逻辑函数
    *  3. 传递一个 数组项,该项每次修改时会调用
    *  */

/*        const dbCount = useMemo(() => {
        return doubleCount(count);
    },[count])*/

    /*
    *  数组项是一个 boolean 值, count为1 和 2 的时候都是false,此时数组项没有修改, dbCount不会执行
    *  count为3时 从 false->true, dbCount为6 count为4时,数组项从 true -> false, dbCount为8
    *  此后 count自增数组项一直为false, dbCount不会执行
    * */
    let dbCount = useMemo(() => {
        return doubleCount(count);
    },[count === 3])

    /*
    *   结合 React.memo() 给Counter 传递一个 函数，当count为 1 和 2的时候, dbcount不会修改, Counter也不会
    * 重新渲染,但是传递给Counter 的函数每次都是一个新的句柄会导致Counter重新渲染
    *
    * 1. 使用useMemo 只在渲染的时候执行一次,这样子组件可以避免重复渲染
    * */
/*        const handleClick = () => {
        console.log("click");
    }*/
    const handleClick = useMemo(() => {
        return () => {
            console.log("click")
        }
    },[]);
    const handleCallback = useCallback(() => {
        console.log("callback");
    },[])
    return (
        <div>
            <p>Click {count} times</p>
            <p>double-count: {dbCount}</p>
            <p>time:{time}</p>
            <Counter count={dbCount} handleClick={handleClick} handleCallback={handleCallback}/>
            <input
                type="button"
                defaultValue="click"
                onClick={handleAdd}
            />
            <input type="button"
                defaultValue="changeTime"
                onClick={handleChangeTime}
            />
        </div>
    )
}
```
# useRef

    wraning: Function components cannot be given refs.
    
    useRef的使用场景:
    1. 调用子组件上的方法 或者 获取DOM元素
    2. 同步不同生命周期需要共享的数据
```jsx harmony
function CountComponent(){
    const [number,setNumber] = React.useState(0);
    const textRef = React.useRef();
    const it = React.useRef();
    React.useEffect(() => {
        it.current = setInterval(() => {
            setNumber(number => number + 1);
        },1000)
    },[])
    React.useEffect(() => {
        if(number >= 10){
            clearInterval(it.current);
        }
    })
    const handleClick = () => {
        console.log(textRef.current.textContent);
    }
    return (
        <div>
            <hr/>
            <p ref={textRef}>{number}</p>
            <button
                onClick={handleClick}
            >click</button>
        </div>
    )
}
```
# 自定义Hook

*Demo*
```jsx harmony
function useCount(defaultCount){
    const [count,setCount] = React.useState(defaultCount);
    const timer = React.useRef();
    React.useEffect(() => {
        timer.current = setInterval(() => {
            setCount(count => count+1);
        },1000)
    },[])
    React.useEffect(() => {
        if(count >= 10){
            clearInterval(timer.current);
        }
    },[])
    return [count,setCount];
}
function Counter(props){
    return (
        <h3>{props.count}</h3>
    )
}
function App(){
    const [count,setCount] = useCount(0);
    return (
        <div>
            <Counter count={count}/>
        </div>
    )
}

function useSize(){
    const [size,setSize] = React.useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })
    React.useEffect(() => {
        window.addEventListener("resize",onResize,false);
        return () => {
            window.removeEventListener("resize",onResize);
        }
    },[])
    const onResize = React.useCallback(() => {
        setSize({
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        })
    })
    return size;
}
```







    
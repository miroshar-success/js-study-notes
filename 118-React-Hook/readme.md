
# React Hook API

    Hook 可以让你在不编写class的情况下使用state以及其他的React特性。
    
    Hook就是JavaScript函数,但是使用它们会有两个额外的规则:
    1. 只能在函数最外层调用Hook.不要在循环,条件判断或者子函数中调用。
    2. 只能在React的函数组件中调用Hook。不要在JavaScript函数中调用。也不能在class组件中使用！
    
## useState

    通过在函数组件里调用它来给组件添加一些内部state. useState会返回一对值:当前状态和一个让你更新它的函数。
    可以在事件处理函数中 或 其他一些地方调用这个函数。
    
    tips:
    1. useState的唯一参数就是初始state，初始state只有在第一次渲染时会被用到。
    2. state不一定要是一个对象。
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



















    
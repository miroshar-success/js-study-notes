# Redux
    
    安装：
    npm install --save redux
    多数情况下,还需要使用React绑定库和开发者工具
    npm install --save react-redux
    npm install --save-dev redux-devtools

## 基本使用
```js
import {createStore} from 'redux';

/*
这是一个reducer,形式为(state,action) => state的纯函数。描述了action如何把state转变成下一个state.
state的形式 可以是基本数据类型,数组 对象
当state变化时 需要返回全新的对象,而不是修改传入的参数。
*/ 
function counter(state = 0,action){
    switch(action.type){
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}

// 创建 store 来存放应用的状态
let store = createStore(counter);

// 可以手动订阅更新,也可以事件绑定到视图层
store.subscribe(() => {console.log(store.getState())});

// 改变内部state唯一方法是 dispatch 一个action.
store.dispatch({type:"INCREMENT"});
store.dispatch({type:"DECREMENT"});
```

## 三大原则

    1. 单一数据源
        整个应用的state被存储在一棵 object tree中,并且这个object tree只存在于唯一一个store中。
    
    2. State是只读的
        唯一改变state的方法就是出发action,action是一个用于描述已发生事件的普通对象。
        
    3. 使用纯函数来执行修改
        为了描述action如何改变state tree,你需要编写reducers。
        
## Action

    Action是把数据从应用传到store的有效载荷。它是store数据的唯一来源。 Action本质上是JavaScript普通对象
    我们约定,action内必须使用一个字符串类型的type字段来表示将要执行的动作。
    
    Action创建函数就是生成action的方法。 在Redux中的action创建函数只是简单的返回一个action:
```js
function addTodo(text){
    return {
        type:ADD_TODO,
        text
    }  
}
```
        
        

































    
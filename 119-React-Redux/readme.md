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
    reducer是一个纯函数,接受旧的state和 action.返回新的state.永远不要在reducer里做这些操作:
        1. 修改传入参数
        2. 执行有副作用的操作,例如API请求和路由跳转
        3. 调用非纯函数,如Date.now() 或 Math.random()
        
# API

*createStore(reducer,action)*

        创建一个Redux store来以存放应用中所有的state。应用中有且仅有一个store。
        1. reducer接受两个参数,分别是当前的state树和要处理的action。返回新的state树
        
    返回值:
        1. Store保存了应用所有的state的对象。改变state的唯一方法是dispatch action.也可以subscribe监听state的变化。
```js
const {createStore} from 'redux';

function todos(state = [],action){
    switch(action.type){
        case "ADD_TODO":
            return state.concat([action.text])
        default:
            return state;
    }
}
let store = createStore(todos,['Use Redux'])
store.dispatch({
    type:"ADD_TODO",
    text:"Read the docs"
})
// [ 'Use Redux', 'Read the docs' ]
```
    tips:
    1. 应用中不要创建多个store!  使用combineReducers 来把多个reducer创建成一个根reducer
    2. 如果 state 是普通对象，永远不要修改它！比如，reducer 里不要使用 Object.assign(state, newData)，
    应该使用 Object.assign({}, state, newData)。这样才不会覆盖旧的 state。
    如果可以的话，也可以使用 对象拓展操作符（object spread spread operator 特性中的 return { ...state, ...newData }。        

*Store*

    Store就是用来维持所有应用的state树的一个对象。改变store内的state的唯一途径就是对它dispatch一个action。
    
    Store的方法:
        1. getState()
            返回应用当前的state树。它与store的最后一个reducer返回值相同。
        2. dispatch(action)
            分发action.这给触发state变化的唯一途径。按照约定,action具有type字段来表示它的类型。
        3. subscribe(listener)
            添加一个变化监听器.每当dispatch action的时候就会执行,state树中的一部分可能已经变化。可以在回调函数里调用
            getState()来拿到当前state.






























    
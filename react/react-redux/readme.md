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

# API

*createStore(reducer,action)*

        创建一个Redux store来以存放应用中所有的state。应用中有且仅有一个store。
        1. reducer接受两个参数,分别是当前的state树和要处理的action。返回新的state树
        
    返回值:
        1. Store保存了应用所有的state的对象。改变state的唯一方法是dispatch action.也可以subscribe监听state的变化。
```jsx harmony
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
    
    createStore的第二个参数是可选的,用于设置state初始状态。
    
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

*CombineReducers*

    combineReducers 辅助函数可以把一个 由多个不同reducer函数作为value的object,合并成一个最终的reducer函数
    然后就可以对这个reducer调用createStore方法。
    
    由combineReducers()返回的state对象。会将传入的每个reducer返回的state按其传递给combineReducers()时对应的key
    进行命名。
```js
// todo.js
export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

// counter.js
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// node-app.js
import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
  todos,
  counter
})

// App.jsx
import { createStore } from 'redux'
import reducer from './reducer/index'

let store = createStore(reducer)
console.log(store.getState())
// {
//   counter: 0,
//   todos: []
// }

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
})
console.log(store.getState())
// {
//   counter: 0,
//   todos: [ 'Use Redux' ]
// }
```

# React Redux
    
    React Redux is the official React binding for Redux.It lets your react components read data from a Redux
    Store ,and dispatch actions to the store to update data.
    
## Provider
    
    React Redux provides <Provider/>,which makes the Redux store available to the rest of your app;
```js
const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```
## connect()
    
    Extracting Data with mapStateToProps
    
    React Redux provides a connect function for you to connec your component to the store. you read values from 
    the Redux store (and er-read the values when store updates).
    Normally, you'll call connect in this way:
```js
import { connect } from 'react-redux'
import { increment, decrement, reset } from './actionCreators'

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = { increment, decrement, reset }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```
    The connect function takes two arguments,both optional:
        1. mapStateToProps: called every time the store state changes. It receives the entire store state, and should
        retuen an object of data this component needs.
        2. mapDispatchToProps: this parameter can either be a function,or an object. Note:we recommend using this 'object
        shorthand' form.
        
## Common ways of calling connect
    
    1. Do not subscribe to the store and do not inject action creators:
        export default connect()(Component)
    If you call connect without providing any arguments,your component will:
        1. no re-render when the store changes
        2. receive props.dispatch that you may use to manually dispatch action
        
    2. Subscribe to the store and do not inject action creators
    If you call connect with only mapStateToProps,your component will:
        1. subscribe to the values that mapStateToProps extracts from the store,and re-render only when those values
        have changed
        2. receive props.dispatch that you may use manually dispatch action
        
    3. Do not subscribe to the store and inject action creators
    if you call connect with only mapDispatchToProps,your component will:
        1. not re-render when the store changes
        2. receive each of the action creators you inject with mapDispatchToProps as props and automatically dispatch
        the actions upon being called
        
    4. Subscribe to the store and inject action creators
    If you call connect with both mapStateToProps and mapDispatchToProps,your component will:
        1. subscribe to the values that mapStateToProps extracts from the store,and re-render only when those values 
        have changed.
        2. receive all of the action creators you inject with mapDispatchToProps as props and automatically dispatch
        the actions upon being called.
 
 ## mapStateToProps
 
    As the first argument passed in to connect,mapStateToProps is used for selecting the part of the data from the store
    that the connected component needs.
    
    mapStateToProps should be defined as a function:
 ```js
function mapStateToProps(state,ownProps ?);
```
    If you do not wish to subscribe to the store,pass null or undefined to connect in place of mapStateToProps.
    
    Return Values Determine if your Component Re-Renders
        React Redux devides whether the contents of the object returned from mapStateToProps are different using ===
        comparison on each fields of the returned object.If any of the fields have changed,then your component will
        be re-rendered so it can receive the updated values as props,
        
    Many common operations result in new object or array references being created:
        1. Creating new arrays with someArray.map() or someArray.filter()
        2. Merging arrays with array.concat
        3. Selecting portion of an array with array.slice
        4. Copying values with Object.assign
        5. Copying values with the spread operator {...oldState,...newData}
    
    Tips:
        In order for your mapStateToProps function to be as fast as possible,you should only re-run these complex
        transformations when the relevant data has changed.
            
## The Number of Declared Arguments Affects Behavior

    With just (state), the function runs whenever the root store state object is different.With (state,ownProps),
    it runs any time the store is different and Also whenever the wrapper props have changed.
    
    This means that you should not add the ownProps argument unless you actually need to use it.
    
    If the formal definition of the function contains one mandatory parameter, mapStateToProps will not receive
    ownProps.
```js
function mapStateToProps(state){
    console.log(state); // state
    console.log(arguments[1]);  // undefined
}
```
    It will receive ownProps when the formal definition of the function contains zero or two mandatory parameters:
```js
function mapStateToProps(state,ownProps){
    console.log(state);     // state
    console.log(ownProps);  // ownProps
}
function mapStateToProps(){
    console.log(arguments[0],arguments[1]); // state    ownProps
}
```

### mapDispatchToProps

    As the second argument passed in to connect,mapDispatchToProps is used from dispatching actions to the store.
    
    React Redux gives you two ways to let components dispatch actions:
        1. By default,a connected component receives props.dispatch and can dispatch actions itself.
        2. connect can accept an argument called mapDispatchToProps,which lets you create functions that
        dispatch when called, and pass those functions as props to your component.

### Approaches for Dispatching

    Default:dispatch as a Prop
        if you do not specify the second arguments to connect(),your component will receive dispatch by default.
        For example:
```js
connect(null,null)(MyComponent)

connect(mapStateToProps)(MyComponent)
```
    Once you have connected your component in this way,your component receives props.dispatch.You may use it to
    dispatch actions to the store
```jsx harmony
function Counter({count,dispatch}){
    return(
        <div>
              <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
              <span>{count}</span>
              <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
              <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
        </div>
    )
}
```
    Pass Down action dispatching logic to unconnected child component.

### Two Forms of mapDispatchToProps

    The mapDispatchToProps parameter can be of two forms.While the function form allows more customization
    the object form is easy to use.
    1. Function form: Allows more customization,gains access to dispatch and optionally ownProps.
    2. Object shorthand form: More declarative and easier to use.
```jsx harmony
// Function Form
const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  }
}


// Object Form
const mapStateToProps = {increment,decrement}
```
### Arguments

    1. dispatch
    2. ownProps(optional)
    
        If you mapDispatchToProps function is declared as taking two parameters, it will be called with dispatch
        as the first parameter and the props passed to the connected components as the second parameter.
````js
const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const reset = () => ({ type: 'RESET' })

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset())
  }
}
````

    We recommend always using the 'object shorthand' form of mapDispatchToPros,unless you have a specific
    reason to customize the dispatching behavior.
    
    dispatch is injected to your component only when:
        1. You do not provide mapDispatchToProps.
        2. Your customized mapDispatchToProps function return specifically contains dispatch.

    Note:
        You can skip the first the parameter by passing undefined or null.Your component will not subscribe to
        the store, and will still receive the dispatch props defined by mapDispatchToProps.
    

## Action创建函数
    
    默认情况下,createStore() 所创建的 Redux store没有使用 middleware,所以只支持同步数据流。可以使用applyMiddleware()
    来增强createStore()。
    
    使用Redux Thunk中间件。 这个函数并不需要保持纯净,它还可以带有副作用，包括执行异步API请求。
        tips: 当middleware链中的最后一个middleware开始dispatch action时，这个action必须是一个普通对象。
    
    Install:
        npm install redux-thunk --save
    
```jsx harmony
import {createStore,applyMiddleware} from 'reduux';
import thunk from 'redux-thunk';
function increment() {
  return {
    type: INCREMENT_COUNTER,
  };
}

function incrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}
const store = createStore(reducer,applyMiddleware(thunk))
```
    Redux Thunk middleware allows you to write action creators that return a function instead of an action.
    The thunk can be used to delay the dispatch of an action,or to dispatch only if a certain condition is met.
    The inner function receives the store methods dispatch and getState as parameters.
```js
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
```






















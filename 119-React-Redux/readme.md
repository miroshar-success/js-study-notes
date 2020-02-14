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

// index.js
import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
  todos,
  counter
})

// App.js
import { createStore } from 'redux'
import reducer from './reducers/index'

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

## Provider
    
```jsx harmony
const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  rootElement
)
```    
## connect
    
    React Redux provides a connect function for you to read values from the Redux store(and re-read the
    values when the store updates)。
    
```jsx harmony
const mapStateToProps = (state) => (
{   })

const mapDispatchToProps = {}
// connect returna s new function that accepts the component to wrap;
connect(mapStateToProps,mapDispatchToProps)();


import { connect } from 'react-redux'
import { addTodo } from '../redux/actions'

class AddTodo extends React.Component {
  // ... component implementation
}

export default connect(
  null, // 第一个参数 mapStateToProps 如果不用可以传递为null
  { addTodo }
)(AddTodo)
``` 

### connect arguments:

    The connect function takes two arguments,both optional:
        1. mapStateToProps: called every time the store state changes.It receives the entire state,and should
        return an object of data this component needs.
        2. mapDispatchToProps: this parameter can either be a function,or an object;
            Note: we recommended using this 'object shorthand' form.
            
    As the first argument passed in to connect,mapStateToProps is used for selecting the part of the data from
    the store that the connected component needs,it is frequently referred to as just mapState for short.
        1. It is called every time the store state changes
        2. It reveives the entire store state and should return an object of data this component needs.
        
        1. if you call connect without providing any arguments,your component will: 
                1.1 not re-render when store changes
                1.2 recive props.dispatch that you may use to manually dispatch action
                
        2. if you call connect with only mapStateToProps,your component will:
                2.1 subscribe to the values that mapStateToProps extracts from the store,and re-render only 
                when those values have changed.
                2.2 receive props.dispatch that you may use to manually dispatch action
                
        3.  if you call connectwith only mapDispatchToProps,your component will:
                3.1 not re-render when the store changes
                3.2 receive each of the action creators you inject with mapDispatchToProps as props and automatically
                dispatch the actions upon being called
        
        4.  if you call connect with both mapStateToProps and mapDispatchToProps,your component will:
                4.1 subscribe to the values that mapStateToProps extracts from the store,and re-render only when
                those values have changed.
                4.2 receive all of the action creators you inject with mapDispatchToProps as props and automatically 
                dispatch the actions upon being called

### mapStateToProps

    Usage:
        function mapStateToProps(state,ownProps?)
        
        If you do not wish to subscribe to the store,pass null or undefined to connect in place of mapStateToProps.
    
    Tips:
        1. Use Selector Functions to Extract and Transform Data.
            We highly encourage the use of 'selector' functions to help encapsulate the process of extracting values
            from specific locations in the state tree.
        2. mapStateToProps Funcitions Should Be Pure and Synchronous
    
    
*mapStateToProps and Performance*

        React Redux internally implements the shouldComponentUpdate method such that the wrapper component
        re-renders precisely when the data your component needs has changed. By default, React Redux decides
        whether the contents of the object returned from mapStateToProps are deifferent using === comparison
        on each fields of the returned object.If any of the fields have changed,then your component will be
        re-rendered so it can receive the updated values as props.
    
    
*The Number of Declared Arguments Affects behavior*

        With just(state),the function runs whenever the root store state object is different. With(state,ownProps)
        ,it rns any time the store state is different and ALSO whenever the wrapper props have changed.
        Tisp:
        1. You should not add the ownProps argument unless you actually need to use it.
```js
function mapStateToProps(state){
    console.log(state); // state
    console.log(arguments[1]);  // undefined
}

function mapStateToProps (state, ownProps={}){
    console.log(state); // state;
    console.log(ownProps);  // undefined
}
```
    It will receive ownProps when the formal definition of the function contains zero or two mandatory parameters;
```js
function mapStateToProps(state,ownProps){
    console.log(state); // state;
    console.log(ownProps);  // ownProps;
}

function mapStateToProps(){
    console.log(arguments[0]);  // state
    console.log(arguments[1]);  // ownProps
}

function mapStateToProps(...args) {
  console.log(args[0]) // state
  console.log(args[1]) // ownProps
}
```    
*Only Perform Expensive Operations When Data Changes*

    Transforming data can often be expensive(and ususlly results in new object references being created).
    In order for your mapStateToProps function to be as fast as possible,you should only re-run these complex
    transformations when the relevant data has changed.
    
    These are a few ways to approach this:
        1. Some transformations could be calculated in an action creator or reducer,and the transformed data could be
        keep in the store
        2. Transformations can also be done in a components's render() method.

### mapDispatchToProps

    As the second argument passed in to connect,mapDispatchToProps is used from dispatching actions to the store.
    
    React Redux gives you two ways to let components dispatch actions:
        1. By default,a connected component receives props.dispatch and can dispatch actions itself.
        2. connect can accept an argument called mapDispatchToProps,which lets you create functions that
        dispatch when called, and pass those functions as props to your component.

 *Approaches for Dispatching*   

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
*Two Forms of mapDispatchToProps*

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
    We recommend always using the 'object shorthand' form of mapDispatchToPros,unless you have a specific
    reason to customize the dispatching behavior.
    
    dispatch is injected to your component only when:
        1. You do not provide mapDispatchToProps.
        2. Your customized mapDispatchToProps function return specifically contains dispatch.

    Note:
        You can skip the first the parameter by passing undefined or null.Your component will not subscribe to
        the store, and will still receive the dispatch props defined by mapDispatchToProps.















    
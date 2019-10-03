import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {createStore,applyMiddleware,compose} from "redux";
import {counter} from "./reducers/index.js";
/*
* 这是一个reducer,形式为(state,action)=>state的纯函数,表示了action如果把state转变成下一个state.
* 当state变化时需要返回全新的对象,而不是修改传入的参数。
*
* */
/*function counter(state=0,action){
    switch(action.type){
        case "INCREMENT":
            return state+1
        case "DECREMENT":
            return state-1
        default:
            return state
    }
}
// 创建Redux store来存放应用的状态。 API是{subscribe,getState,dispatch}
let store = createStore(
    counter,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// 获取默认的状态
console.log(store.getState());

store.dispatch({type:"INCREMENT"});
store.dispatch({type:"DECREMENT"});
store.dispatch({type:"INCREMENT"});
// 订阅,监听状态是否改变了
store.subscribe(()=>{
    console.log(store.getState());
})*/

// unsubscribe()停止state更新
import thunk from "redux-thunk"

let store = createStore(
    counter,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
/*render();
store.subscribe(render);*/
































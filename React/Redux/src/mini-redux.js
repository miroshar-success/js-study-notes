function mini_redux(reducer, initialState, enhancer) {
  // 验证reducer是否是一个函数
  if(typeof reducer !== 'function') {
    throw new Error('reducer must be function')
  }
  let state
  if(initialState !== undefined) {
    state = initialState
  } else {
    state = reducer()
  }
  // 判断是否传递了第三个参数
  if(enhancer !== undefined) {
    // 判断enhancer 是否是一个函数
    if(typeof enhancer !== 'function') {
      throw new Error('enhancer must be function')
    }
    return enhancer(mini_redux)(reducer, initialState)
  }
  const listener_cbs = []
  function getState() {
    return state
  }
  function subscribe(cb) {
    listener_cbs.push(cb)
  }
  function dispatch(action) {
    state = reducer(state, action)
    if(listener_cbs.length) {
      listener_cbs.forEach(listener => {
        listener()
      })
    }
  }
  return {
    getState,
    subscribe,
    dispatch
  }
}

function enhancer(createStore) {
  return (reducer, initialState) => {
    const store = createStore(reducer, initialState)
    const dispatch = store.dispatch
    function _dispatch(action) {
      if(typeof action === 'function') {
        return action(dispatch)
      } else {
        if(Object.prototype.toString.call(action) !== '[object Object]') {
          throw new Error('action must be object')
        }
        return dispatch(action)
      }
    }
    return {
      ...store,
      dispatch: _dispatch
    }
  }
}
// 中间件
const _logger = store => next => action => {
  console.log('logger')
  next(action)
}
const _thunk = store => next => action => {
  console.log('thunk')
  next(action)
}

function middleware(store) {
  return function(next) {
    return function(action) {
      console.log('middleware')
      next(action)
    }
  }
}

// Each middleware receives store's dispatch and getState functions.
// Last middleware in the chain will receive the real's dispatch method as the next parameter.
// ({getState, dispatch}) => next => action
function applyMiddleware() {  // 所有中间件
  const middlewares = Array.from(arguments)
  return createStore => {
    return (reducer, initialState) => {
      const { dispatch, getState, subscribe } = createStore(reducer, initialState)
      const chain_function_array = middlewares.map(middleware => middleware({dispatch, getState}))
      const _dispatch = compose(...chain_function_array)(dispatch)
      return {
        getState,
        dispatch:_dispatch,
        subscribe
      }
    }
  }
}

function compose() {
  const funs = Array.from(arguments)
  return function(dispatch) {
    for(let i = funs.length - 1; i >= 0; i--) {
      dispatch = funs[i](dispatch)
    }
    return dispatch
  }
}


function reducer(state = 0, action) {
  const { type, payload } = action
  switch(type) {
    case 'increment':
      return state+1
    case 'decrement':
      return state-1
    default:
      return state
  }
}

// ------- combineReducers ----------
function combineReducers(reducers) {
  if(Object.prototype.toString.call(reducers) !== '[object Object]') {
    throw new Error('arguments must be a object')
  }
  const reducer_keys = Object.keys(reducers)
  for(let i = 0, length = reducer_keys.length; i < length; i++) {
    const reducer = reducers[reducer_keys[i]]
    if(typeof reducer !== 'function') {
      throw new Error('reducer must be a function')
    }
  }
  // 这里的state是root state
  return function(state, action) {
    const nextState = {}
    for(let i = 0, length = reducer_keys.length; i < length; i++) {
      const key = reducer_keys[i]
      const reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
    }
    return nextState
  }
}

const root_reducer = combineReducers({
  count: reducer
})
console.log(root_reducer)

// const { getState, subscribe, dispatch } = mini_redux(root_reducer, 0, applyMiddleware(_logger, _thunk, middleware))
const { getState, subscribe, dispatch } = mini_redux(root_reducer)
const increment_button = document.querySelector('#mini-redux-app .increment-button')
const decrement_button = document.querySelector('#mini-redux-app .decrement-button')

increment_button.addEventListener('click', () => {
  dispatch({type: 'increment'})
}, false)
decrement_button.addEventListener('click', () => {
  dispatch({type: 'decrement'})
})
subscribe(() => {
  document.querySelector('#mini-redux-app .count').textContent = getState()
})
document.querySelector('#mini-redux-app .count').textContent = getState()

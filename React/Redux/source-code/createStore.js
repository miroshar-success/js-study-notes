const createStore = (reducer, initialState, enhancer) => {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function')
  }
  // 参数处理 (如果只传递了两个参数, 并且第二个参数是函数, 表明它是enhancer)
  if (typeof initialState === 'function' && enhancer === undefined) {
    enhancer = initialState
    initialState = undefined
  }
  // 传递了三个参数
  if (enhancer !== undefined) {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function')
    }
    return enhancer(createStore)(reducer, initialState)
  }
  const cbs = []
  let state;
  // 利用闭包
  if (initialState !== undefined) {
    state = initialState
  } else {
    // 如果未传入action, 在reducer中无法解构 action
    state = reducer(undefined, {})
  }
  const dispatch = (action) => {
    state = reducer(state, action)
    if (cbs.length) {
      cbs.forEach(cb => {
        cb()
      })
    }
  }
  const getState = () => {
    return state
  }
  const subscribe = (cb) => {
    cbs.push(cb)
    // let isSubscribed = true
    return function unsubscribe() {
/*       if (!isSubscribed) return
      isSubscribed = false */
      const idx = cbs.indexOf(cb)
      cbs.splice(idx, 1)
    }
  }
  return {
    dispatch,
    getState,
    subscribe
  }
}

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'counter/increment':
      return state + 2
    case 'counter/decrement':
      return state - 1
    default:
      return state
  }
}
// ----------------------- enhancer 增强 createStore -------------------------
/* const enhancer = (createStore) => {
  return (reducer, initialState) => {
    const store = createStore(reducer, initialState)
    const dispatch = store.dispatch
    const _dispatch = (action) => {
      if (typeof action === 'function') {
        return action(dispatch, store.getState)
      } else {
        dispatch(action)
      }
    }
    return {
      ...store,
      dispatch: _dispatch
    }
  }
} */
const logger1 = (store) => next => action => {
  console.log('start-1')
  next(action)
  console.log('end-1')
}
const logger2 = (store) => next => action => {
  console.log('start-2')
  next(action)
  console.log('end-2')
}
const logger3 = (store) => next => action => {
  console.log('start-3')
  next(action)
  console.log('end-3')
}
const store = createStore(reducer, applyMiddleware(
  logger1,
  logger2,
  logger3
))
// middleware 在 dispatch action和到达reducer之间提供第三方扩展点。
function applyMiddleware() {
  // 函数返回值就是enhancer
  const middlewares = [...arguments]
  return createStore => {
    return (reducer, initialState) => {
      const { dispatch, getState, subscribe } = createStore(reducer, initialState)
      const fn_chain = middlewares.map(middleware => middleware({ dispatch, getState }))
      const _dispatch = compose(...fn_chain)(dispatch)
      return {
        getState,
        subscribe,
        dispatch: _dispatch
      }
    }
  }
}
function compose () {
  const fns = Array.from(arguments)
  return function (dispatch) {
    console.log('dispatch:', dispatch.toString())
    for (let i = fns.length - 1; i >= 0; i--) {
      dispatch = fns[i](dispatch)
      console.log('dispatch:', i, dispatch.toString())
    }
    return dispatch
  }
}
store.dispatch({type: 'counter/increment'})
console.log(store.dispatch.toString())
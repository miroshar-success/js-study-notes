const { useDispatch, useSelector, Provider } = window.ReactRedux
const { createStore, applyMiddleware } = window.Redux
const { createRoot } = window.ReactDOM

const reducer = (state = 0, action) => {
  switch(action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1
    default:
      return state
  }
}
const logger = store => next => action => {
  console.log(store, action)
  next(action)
}

/* const thunk = store => next => action => {
  if(action.type === 'increment' || action.type === 'decrement') {
    setTimeout(() => {
      next(action)
    }, 2000)
  } else {
    next(action)
  }
} */
const increment = () => ({type: 'increment'})
const decrement = () => ({type: 'decrement'})

const thunk = ({dispatch, getState}) => next => action => {
  if(typeof action === 'function') {
    return action(dispatch)
  }
  next(action)
}

const increment_async = () => (dispatch) =>{
  setTimeout(() => {
    dispatch(increment())
  }, 2000)
}

const store = createStore(reducer, applyMiddleware(
  logger,
  thunk
))

function MiddlewareCounter() {
  const dispatch = useDispatch()
  const count = useSelector(state => state)
  const handleIncrement = () => {
    dispatch(increment())
    dispatch(increment_async())
  }
  const handleDecrement = () => {
    dispatch(decrement())
  }
  return (
    <div>
      <button onClick={handleIncrement}>increment</button>
      <span>{count}</span>
      <button onClick={handleDecrement}>decrement</button>
    </div>
  )
}
const root = createRoot(document.querySelector('#middleware-app'))
root.render(
  <Provider store={store}>
    <MiddlewareCounter/>
  </Provider>
)

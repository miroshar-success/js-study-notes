const reducer = (state = 10, action) => {
  const { type, payload } = action
  switch (type) {
    case 'increment':
      return state + payload
    case 'decrement':
      return state - payload
    default:
      return state  
  }
}


const _logger = (store) => next => action => {
  console.log('dispatch', action, store)
  console.log('next', next)
  next(action)
  console.log('finishe', action, store)
}

const store = createStore(reducer, applyMiddleware(
  _logger
))

const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector(state => state)
  return (
    <>
      <button onClick={() => dispatch({type: 'decrement', payload: 2})}>decrement</button>
      <button>{count}</button>
      <button onClick={() => dispatch({type: 'increment', payload: 3})}>increment</button>
    </>
  )
}

createRoot(document.getElementById('customize-middleware-app'))
.render(
  <Provider store={store}>
    <Counter/>
  </Provider>
)
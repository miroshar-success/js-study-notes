// ------ 给 action传递参数 ----------
function increment(payload) {
  return {
    type: 'increment',
    payload
  }
}
function decrement(payload) {
  return {
    type: 'decrement',
    payload
  }
}
function reducer(state = 0, action) {
  const { type, payload } = action
  switch(type) {
    case 'increment':
      return state + payload;
    case 'decrement':
      return state - payload
    default:
      return state
  }
}
const store = createStore(reducer)

function Counter() {
  const count = useSelector(state => state)
  const dispatch = useDispatch()
  const handleIncrement = () => {
    dispatch({
      type: 'increment',
      payload: 5
    })
  }
  const handleDecrement = () => {
    dispatch({
      type: 'decrement',
      payload: 3
    })
  }
  return (
    <window.React.Fragment>
      <button onClick={handleDecrement}>decrement</button>
      <span>{count}</span>
      <button onClick={handleIncrement}>increment</button>
    </window.React.Fragment>
  )
}
const root = createRoot(document.querySelector('#action-app'))
root.render(
  <Provider store={store}>
    <Counter/>
  </Provider>
)

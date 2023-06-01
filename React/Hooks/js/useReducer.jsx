const reducer_root = createRoot(document.getElementById('reducer-app'))

function reducer(state, payload) {
  const { type, value } = payload
  switch(type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state -1;
    case 'reset':
      return value
    default:
      return state
  }
}
const initial_count = 10

function App() {
  const [count, dispatch] = useReducer(reducer, initial_count, function() {
    return initial_count * 10 + 20
  })
  const handleIncrement = () => {
    dispatch({
      type: 'increment'
    })
  }
  const handleDecrement = () => {
    dispatch({
      type: 'decrement'
    })
  }
  const handleReset = () => {
    dispatch({
      type: 'reset',
      value: initial_count
    })
  }
  return (
    <div>
      {count}
      <button onClick={handleIncrement}>increment</button>
      <button onClick={handleDecrement}>decrement</button>
      <button onClick={handleReset}>reset</button>
    </div>
  )
}

// ---------- 复习一次 ----------
const counter_reducer = (state = 1, action) => {
  const { type } = action
  switch (type) {
    case 'even':
      return state + 2
    case 'odd':
      return state + 1
    default:
      return state
  }
}
const Counter = () => {
  const [count, dispatch] = useReducer(counter_reducer)
  const handleClick = (type) => {
    dispatch({
      type
    })
  }
  return (
    <>
      <button onClick={() => handleClick('odd')}>odd</button>
      {count}
      <button onClick={() => handleClick('even')}>even</button>
    </>
  )
}

reducer_root.render(
  <>
    <App/>
    <Counter/>
  </>
)

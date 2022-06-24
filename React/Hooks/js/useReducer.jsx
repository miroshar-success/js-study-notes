const { createRoot } = window.ReactDOM
const { useReducer, useState } = window.React

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

reducer_root.render(
  <App/>
)

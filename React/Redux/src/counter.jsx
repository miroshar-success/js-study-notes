const INCREMENT = 'counter/increment'
const DECREMENT = 'counter/decrement'

function reducer(state = 0, action) {
  const { type } = action
  switch(type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}
const increment = () => ({type: INCREMENT})
const decrement = () => ({type: DECREMENT})

const store = createStore(reducer)

/* function Counter() {
  const count = useSelector(state => state)
  const dispatch = useDispatch()
  const handleIncrement = () => {
    dispatch(increment())
  }
  const handleDecrement = () => {
    dispatch(decrement())
  }
  return (
    <div>
      <button onClick={handleIncrement}>+</button>
      <span>{count}</span>
      <button onClick={handleDecrement}>-</button>
    </div>
  )
}

store.subscribe(() => {
  console.log(store.getState())
})
const root = createRoot(document.getElementById('count-app'))
root.render(
  <Provider store={store}>
    <Counter/>
  </Provider>
) */



// -------- 不用react ---------
function setCount() {
  const count = store.getState()
  document.querySelector('#count-app .count').textContent = count
}
setCount()

document.querySelector('#count-app .minus').addEventListener('click', function() {
  store.dispatch(decrement())
}, false)

document.querySelector('#count-app .plus').addEventListener('click', () => {
  store.dispatch(increment())
}, false)

store.subscribe(() => {
  setCount()
})

// ---- 核心API ------
/*
createStore
store.getState()
store.dispatch()
store.subscribe()
*/

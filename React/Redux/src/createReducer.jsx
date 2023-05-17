const increment = createAction('counter/increment')
const decrement = createAction('counter/decrement')
console.log(typeof increment)
/* const reducer = createReducer(0, (builder) => {
  builder.addCase(increment, (state, action) => state + 1)
  .addCase(decrement, (state, action) => state - 1)
}) */
const reducer = createReducer(0, {
  [increment]: (state, action) => state+1,
  [decrement]: (state, action) => state-1
})
console.log(increment.toString(), increment.type) // counter/increment counter/increment

console.log(reducer.getInitialState())
const store = configureStore({
  reducer: {
    counter: reducer
  },
  devTools: true
})


const add_todo = createAction('todo/add', text => {
  return {
    payload: {
      text,
      completed: false
    }
  }
})
console.log(add_todo('hello world'))
console.log(add_todo('你好, 生活'))

function App() {
  const count = useSelector(state => state.counter)
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  )
}

const root = createRoot(document.querySelector('#create-reducer-app'))
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)

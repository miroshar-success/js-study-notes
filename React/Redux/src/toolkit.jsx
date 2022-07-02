const { createRoot } = window.ReactDOM
const { configureStore, createSlice, createAsyncThunk, createEntityAdapter } = window.RTK
const { Provider, useDispatch, useSelector } = window.ReactRedux

function logger(state) {
  return next => {
    return action => {
      console.log('logger', action)
      next(action)
    }
  }
}


const COUNTER_KEY = 'counter'

const counter = createSlice({
  name: COUNTER_KEY,
  initialState: 0,
  reducers: {
    increment: (state, {payload}) => (state+1),
    decrement: (state, payload) => {
      console.log(state, payload)
      return state - 1
    }
  }
})

const { increment, decrement } = counter.actions
const store = configureStore({
  reducer: {
    [COUNTER_KEY]: counter.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger)
  }
})

const increment_async = createAsyncThunk('counter/async_increment', (payload, {dispatch}) => {
  setTimeout(() => {
    dispatch(increment())
  },2000)
})

const todo_adapter = createEntityAdapter()
console.log(todo_adapter)



function App() {
  const count = useSelector(state => state.counter)
  console.log(useSelector(state => state))
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch(increment())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>+</button>
      <button onClick={() => dispatch(increment_async())}>+1 after 2 seconds</button>
    </div>
  )
}
const root = createRoot(document.querySelector('#toolkit-app'))
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)

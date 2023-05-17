// toolkit
const counterSlice = createSlice({
  name: 'count-slice',
  initialState: 0,
  reducers: {
    increment: state => {
      return state + 1
    },
    decrement: state => {
      return state - 1
    }
  }
})
const { increment, decrement } = counterSlice.actions

const store = configureStore({
  reducer: counterSlice.reducer
})

const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector(state => state)
  const handleIncrement = () => dispatch(increment())
  const handleDecrement = () => dispatch(decrement())
  return (
    <>
      <button onClick={handleIncrement}>increment</button>
      <button>{count}</button>
      <button onClick={handleDecrement}>decrement</button>
    </>
  )
}
const App = () => (
  <Provider store={store}>
    <Counter/>
  </Provider>
)

createRoot(document.getElementById('create-slice-counter-app')).render(<App/>)
function reducer(state = 0, action) {
  switch(action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state
  }
}
const store = createStore(reducer, 0)

const Button = memo((props) => {
  console.log('render')
  return (
    <div>
      <button onClick={props.increment}>increment</button>
      <button onClick={props.decrement}>decrement</button>
    </div>
  )
})
// --------- 给子组件传递 dispatch 使用useCallback ----------
function App() {
  const dispatch = useDispatch()
  const increment = useCallback(() => {
    dispatch({type: 'increment'})
  }, [dispatch])
  const decrement = () => {
    dispatch({
      type: 'decrement'
    })
  }
  const [count, setCount ] = useState(0)
  const s = useSelector(state => state)
  const handleClick = () => {
    setCount(count+1)
  }
  return (
    <div>
      <Button increment={increment} decrement={decrement}/>
      <span>{s}</span>
      <button onClick={handleClick}>{count} times</button>
    </div>
  )
}

const root = createRoot(document.querySelector('#dispatch-app'))
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)

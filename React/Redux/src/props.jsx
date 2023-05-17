function reducer(state = 1, action) {
  switch(action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}
const store = createStore(reducer)

function Parent() {
  const [ count, setCount ] = useState(1)
  const dispatch = useDispatch()
  const handleProps = () => {
    setCount(c => c+1)
  }
  const handleDecrement = () => {
    dispatch({
      type: 'decrement'
    })
  }
  const handleIncrement = () => {
    dispatch({
      type: 'increment'
    })
  }
  return (
    <div>
      <button onClick={handleIncrement}>dispatch +</button>
      <button onClick={handleDecrement}>dispatch -</button>
      <button onClick={handleProps}>count increment</button>
      <Child count={count}/>
    </div>
  )
}

function Child(props) {
  const count = useSelector(state => state*props.count)
  return (
    <span>props: {props.count} --- {count}</span>
  )
}

const root = createRoot(document.querySelector('#props-app'))
root.render(
  <Provider store={store}>
    <Parent/>
  </Provider>
)

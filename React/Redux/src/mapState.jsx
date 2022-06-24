const { createRoot } = window.ReactDOM
const { Provider, connect, useDispatch, useSelector } = window.ReactRedux
const { useState } = window.React
const { createStore, combineReducers } = window.Redux

//  第一个reducer
function counter(state = 0, action) {
  const { type, payload } = action
  switch(type) {
    case 'single_increment':
      return state + 1
    case 'single_decrement':
      return state - 1
    default:
      return state
  }
}
function multiple(state = 1, action) {
  const { type, payload } = action
  switch(type) {
    case 'multiple_increment':
      return state * 2
    case 'multiple_decrement':
      return state / 2
    default:
      return state
  }
}
const reducer = combineReducers({
  counter,
  multiple
})

const store = createStore(reducer)
const player = {
  firstName: 'kyrie',
  lastName: 'irving'
}
// 第一个参数是 mapStatToProps 返回的对象
// 第二个参数 是 mapDispatchToProps 对象, 上面挂载着 action creator
function mergeProps(state, a) {
  return {
    ...state,
    ...player,
    ...a
  }
}
/*
如果接受第二个参数,ownProps, 那么当store state变化 或者 父组件更新props时, 组件都会更新。
第二个参数通常 是组件自身接受的 props。
*/
const mapStateToProps = (state, ownProps) => state
/*
The return of the mapStateToProps determine whether the connected component will re-render
*/
const mapStateToDispatch = {
  increment() {
    return {
      type: 'single_increment'
    }
  },
  decrement() {
    return {
      type: 'single_decrement'
    }
  }
}

const Counter = connect(mapStateToProps, mapStateToDispatch)((props) => {
  console.log(props)
  return (
    <window.React.Fragment>
      <button onClick={props.increment}>+</button>
      {props.counter}
      <button onClick={props.decrement}>-</button>
    </window.React.Fragment>
  )
})

const root = createRoot(document.getElementById('mapState-app'))

function App() {
  const [ count, setCount ] = useState(0)
  const [ name, setName] = useState('kyrie')
  const dispatch = useDispatch()
  const multiple = useSelector(state => state.multiple)
  const handleClick = () => {
    setCount(count + 1)
    dispatch({
      type: 'multiple_increment'
    })
    if(count % 2 === 0) {
      setName('lebron')
    } else {
      setName('irving')
    }
  }
  return (
    <window.React.Fragment>
      <Counter name={name}/>
      <button onClick={handleClick}>click {count} times ----> {multiple}</button>
    </window.React.Fragment>
  )
}

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)

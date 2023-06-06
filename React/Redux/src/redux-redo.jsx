// --------------------- todo reducer ----------------------
const undoTodo = (reducer) => {
  const initialState = {
    past: [],
    future: []
  }
  return function (state = initialState.future, action) {
    const { past } = initialState
    switch (action.type) {
      case 'undo': // 撤销 (当前的state 列表 取出最后一个放入past)
        if (!state.length) return []
          const current = state[state.length - 1]
          past.push(current)
          initialState.past = past
          return state.slice(0, state.length - 1)
      case 'redo':
        // 将 上一次最后一个添加进当前列表, 删除past最后一个元素
        if (!past.length) return state
        const last = past[past.length - 1]
        initialState.past = past.slice(0, past.length - 1)
        return [...state, last];
      default:
        return reducer(state, action)
    }
  }
}

const todoReucer = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
    case 'increment':
      return state.concat(payload)
    default:
      return state
  }
}
// --------------------- counter reducer -----------------------
const counterRedo = (reducer) => {
  let past = []
  let futures = []
  return function (state, action) {
    switch(action.type) {
      case 'counter/redo': {
        if (!futures.length) return state
        const current = futures[futures.length - 1]
        past.push(current)
        futures = futures.slice(0, futures.length - 1)
        return current
      }
      case 'counter/undo': {
        if (!past.length) return state
        const current = past[past.length - 1]
        futures.push(current)
        past = past.slice(0, past.length - 1)
        return current
      }
      default:
        const count = reducer(state, action)
        futures.push(count)
        return count
    }
  }
}
const counterReducer = (state = 0, action) => {
  const { type } = action
  switch (type) {
    case 'counter/increment':
      return state + 1
    case 'counter/decrement':
      return state - 1
    default:
      return state
  }
}

const reducers = combineReducers({
  todo: undoTodo(todoReucer),
  counter: counterRedo(counterReducer)
})

const store = createStore(reducers)

const TodoInput = () => {
  const [todo, setTodo] = useState('')
  const dispatch = useDispatch()
  const handleTodoChanged = (event) => {
    setTodo(event.target.value.trim())
  }
  const handleSubmit = () => {
    if (!todo.trim()) return
    dispatch({
      type: 'increment',
      payload: {
        text: todo.trim(),
        id: Date.now(),
        completed: false
      }
    })
    setTodo('')
  }
  const handleCancel = () => {
    dispatch({
      type: 'undo'
    })
  }
  const handleRedo = () => {
    dispatch({
      type: 'redo'
    })
  }
  return (
    <>
      <input
        type="text"
        value={todo}
        onChange={handleTodoChanged}
        placeholder='What next todo?'
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleCancel}>cancel</button>
      <button onClick={handleRedo}>redo</button>
    </>
  )
}

const TodoItem = ({text, completed}) => {
  return (
    <li>
      <input type="checkbox" defaultChecked={completed}/>
      <span>{text}</span>
    </li>
  )
}

const TodoList = () => {
  const todos = useSelector(state => state.todo)
  if (!todos.length) return []
  return (
    <ul>
      { todos.map(todo => (<TodoItem key={todo.id} {...todo}/>))}
    </ul>
  )
}

// todo-list
const TodoApp = () => {
  return (
    <>
      <TodoInput/>
      <TodoList/>
    </>
  )
}

// counter
const CounterApp = () => {
  const counter = useSelector(state => state.counter)
  const dispatch = useDispatch()
  return (
    <>
      <button onClick={() => dispatch({type: 'counter/increment'})}>increment</button>
      <button>click {counter} times</button>
      <button onClick={() => dispatch({type: 'counter/decrement'})}>decrement</button>
      <button onClick={() => dispatch({type: 'counter/redo'})}>redo</button>
      <button onClick={() => dispatch({type: 'counter/undo'})}>undo</button>
    </>
  )
}

createRoot(document.getElementById('redux-redo-app'))
.render(
  <Provider store={store}>
    <TodoApp/>
    <hr />
    <CounterApp/>
  </Provider>
)


// 其他工具 redux-form-utils /  redux-form
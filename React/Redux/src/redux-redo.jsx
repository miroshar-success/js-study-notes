// reducer增强
// [1, 2, 3, 4, 5]
// past: [1, 2, 3, 4]
// preset: 4
// future:  
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
  console.log('实际的reducer', state)
  const { type, payload } = action
  switch (type) {
    case 'increment':
      return state.concat(payload)
    default:
      return state
  }
}

const reducers = combineReducers({
  todo: undoTodo(todoReucer)
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

const TodoApp = () => {
  return (
    <>
      <TodoInput/>
      <TodoList/>
    </>
  )
}

createRoot(document.getElementById('redux-redo-app'))
.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>
)
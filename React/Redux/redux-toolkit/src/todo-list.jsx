const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo (state, action) {
      state.push(action.payload)
    },
    toggleTodo (state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    deleteTodo (state, action) {
      return state.filter(todo => todo.id !== action.payload)
    }
  }
})
const { toggleTodo, addTodo, deleteTodo } = todoSlice.actions

// ------------------ counter -------------------
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment (state, action) {
      return state + action.payload
    },
    decrement(state, action) {
      return state - action.payload
    }
  }
})
const { increment, decrement } = counterSlice.actions

const todoReducerEnhander = (reducer) => {
  const replaceReducer = (state = [], action) => {
    console.log(action)
    const list = reducer(state, action)
    return list
  }
  return replaceReducer
}

const store = configureStore({
  reducer: {
    todo: todoReducerEnhander(todoSlice.reducer),
    counter: counterSlice.reducer
  }
})

const TodoInput = () => {
  const [todo, setTodo] = useState('')
  const dispatch = useDispatch()
  const handleTodoChanged = (event) => {
    setTodo(event.target.value.trim())
  }
  const handleSubmit = () => {
    dispatch(addTodo({
      text: todo,
      id: Date.now(),
      completed: false
    }))
    setTodo('')
  }
  return (
    <div>
      <input type="text" value={todo} onChange={handleTodoChanged}/>
      <button onClick={handleSubmit}>submit</button>
    </div>
  )
}

const todoIds = createSelector(
  state => state.todo,
  todos => todos.map(todo => todo.id)
)

const TodoList = () => {
  const dispatch = useDispatch()
  const todoList = useSelector(state => state.todo)
  const ids = useSelector(todoIds) // 获取state的派生状态
  // const todoIds = useSelector(state => state.todo.map(item => item.id))
/*   const todoIds = useSelector(state => {
    return state.todo.map(item => item.id)
  }) */
  console.log('执行了吗', ids)
  // console.log(todoIds)
  const handleToggleTodo = (todo) => {
    dispatch(toggleTodo(todo.id))
  }
  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodo(todo.id))
  }
  return (
    <ul>
      { todoList.map(todo => (<li key={todo.id}>
        <input type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo)}/>
        <span>{todo.text}</span>
        <span onClick={() => handleDeleteTodo(todo)} style={{marginLeft: 10}}>X</span>
      </li>))}
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

const CounterApp = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter)
  return (
    <div>
      <button onClick={() => dispatch(increment(2))}>+2</button>
      <button>{counter}</button>
      <button onClick={() => dispatch(decrement(3))}>-3</button>
    </div>
  )
}


const App = () => (
  <Provider store={store}>
    <CounterApp/>
    <TodoApp/>
  </Provider>
)

createRoot(document.getElementById('todo-list-app'))
.render(
  <App/>
)
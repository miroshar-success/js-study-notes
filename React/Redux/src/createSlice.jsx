const { createRoot } = window.ReactDOM
const { nanoid, configureStore, createSlice, createAsyncThunk, createEntityAdapter, createAction, createReducer } = window.RTK
const { Provider, useDispatch, useSelector } = window.ReactRedux
const { useState } = window.React

const uppercase = createAction('todo/uppercase')

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    add_todo: {
      reducer: (state, action) => ([...state, action.payload]),
      prepare: text => ({
        payload: {
          text,
          id: nanoid(),
          completed: false
        }
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(uppercase, (state, action) => {
      console.log(state, action)
      return state.map(todo => ({...todo, text: todo.text.toUpperCase()}))
    })
  }
})

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
})
const { add_todo } = todoSlice.actions


function App() {
  const [todo, setTodo] = useState('')
  const dispatch = useDispatch()
  const handleChanged = (event) => {
    setTodo(event.target.value)
  }
  const handleConfirm = () => {
    dispatch(add_todo(todo.trim()))
    setTimeout(() => {
      dispatch(uppercase())
    },1000)
  }
  const todos = useSelector(state => state.todos)
  console.log(todos)
  return (
    <div>
      <input type='text' value={todo} onChange={handleChanged}/>
      <button onClick={handleConfirm}>add</button>
    </div>
  )
}


const root = createRoot(document.querySelector('#create-slice-app'))
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)

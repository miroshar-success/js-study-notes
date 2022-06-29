// ------- useSelector 依赖于 props ----------
const { Provider, useDispatch, useSelector } = window.ReactRedux
const { createStore } = window.Redux
const { useState } = window.React
const { createRoot } = window.ReactDOM

const initial_todos = {
  1: {
    text: 'Learn React',
    id: 1,
    completed: false
  },
  2: {
    text: 'Learn Vue',
    id: 2,
    completed: true
  }
}

function reducer(state = initial_todos, action) {
  const { type, payload } = action
  switch(type) {
    case 'add_todo': {
      return {
        ...state,
        [payload.id]: payload
      }
    }
    case 'delete_todo': {
      const copy_state = {...state}
      Reflect.deleteProperty(copy_state, payload)
      return copy_state
    }
    default:
      return state
  }
}
const store = createStore(reducer)

function Todo({id, delete_todo}) {
  const todo = useSelector(state => state[id].text)
  return (
    <div>{todo} <span onClick={delete_todo}>delete</span></div>
  )
}
function TodoList() {
  const todos = useSelector(state => state)
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    dispatch({
      type: 'delete_todo',
      payload: id
    })
  }
  return (
    Object.keys(todos).length > 0 && (
      Object.values(todos).map(todo => (
        <Todo key={todo.id} id={todo.id} delete_todo={handleDelete.bind(null, todo.id)}/>
      ))
    )
  )
}


const root = createRoot(document.querySelector('#todos-app'))

root.render(
  <Provider store={store}>
    <TodoList/>
  </Provider>
)

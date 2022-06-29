const { useDispatch, useSelector, Provider } = window.ReactRedux
const { createStore, applyMiddleware } = window.Redux
const { createRoot } = window.ReactDOM

function createThunkMiddleware() {
  const middleware = function middleware(_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState)
        }
        return next(action)
      }
    }
  }
  return middleware
}
const thunk = createThunkMiddleware()

const reducer = (state = 0, action) => {
  switch(action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1
    default:
      return state
  }
}
const increment = () => ({type: 'increment'})
const decrement = () => ({type: 'decrement'})

const increment_async = () => {
  return (dispatch, getState) => {
    console.log(getState())
    setTimeout(() => {
      dispatch(increment())
    }, 1000)
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

function ThunkCounter() {
  const dispatch = useDispatch()
  const count = useSelector(state => state)
  const handleIncrement = () => {
    dispatch(increment())
    dispatch(increment_async())
  }
  const handleDecrement = () => {
    dispatch(decrement())
  }
  return (
    <div>
      <button onClick={handleIncrement}>increment</button>
      <span>{count}</span>
      <button onClick={handleDecrement}>decrement</button>
    </div>
  )
}
const root = createRoot(document.querySelector('#thunk-app'))
root.render(
  <Provider store={store}>
    <ThunkCounter/>
  </Provider>
)

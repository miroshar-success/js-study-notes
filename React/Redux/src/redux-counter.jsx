const reducer = (state = 0, action) => {
  const { type, payload } = action
  switch (type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

const mapStateToProps = (state) => ({ count: state })
const mapDispatchToProps = {
  increment: () => ({ type: 'increment' }),
  decrement: () => ({ type: 'decrement' }),
  incrementAsync: () => (dispatch) => {
    setTimeout(() => {
      dispatch({ type: 'increment' })
    }, 2000)
  }
}
class Counter extends React.Component {
  constructor(props) {
    super(props)
  }
  handleIncrement = () => {
    this.props.increment()
    this.props.incrementAsync()
  }
  handleDecrement = () => {
    this.props.decrement()
  }
  render() {
    return (
      <>
        <button onClick={this.handleIncrement}>+1</button>
        <button>{this.props.count}</button>
        <button onClick={this.handleDecrement}>-1</button>
      </>
    )
  }
}
const ReduxCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)

const App = () => (
  <Provider store={store}>
    <ReduxCounter/>
  </Provider>
)

createRoot(document.getElementById('redux-counter-app')).render(<App/>)
const {compose,createStore,applyMiddleware} = window.Redux;
const {Provider,connect} = window.ReactRedux;
const ReduxThunk = window.ReduxThunk.default;

function reducer(state = 0, action){
  switch(action.type){
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

const increment = () => (
  {
    type:"INCREMENT"
  }
)
const incrementAsync = () => {
  return (dispatch,getState) => {
    setTimeout(() => {
      dispatch(increment())
    },1000)
  }
}

function incrementIfOdd(){
  return (dispatch,getState) => {
    const counter = getState();
    if(counter %2 === 0) return;
    dispatch(increment());
  }
}

const decrement = () => (
  {
    type:"DECREMENT"
  }
)

const store = createStore(
  reducer,
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

class Counter extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <p>This counter is {this.props.counter}</p>
        <button onClick={this.props.increment}>add</button>
        <button onClick={this.props.incrementAsync}>addAsync</button>
        <button onClick={this.props.decrement}>reduce</button>
        <button onClick={this.props.incrementIfOdd}>ifodd</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {counter:state}
}
const mapDispatchToProps = {
  increment,
  decrement,
  incrementAsync,
  incrementIfOdd
}
Counter = connect(mapStateToProps,mapDispatchToProps)(Counter);

ReactDOM.render(
  <Provider store={store}>
    <Counter/>
  </Provider>,
  document.getElementById("app")
)
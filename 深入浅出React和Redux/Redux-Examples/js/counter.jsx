const {createStore,applyMiddleware,compose} = window.Redux;
const {connect,Provider} = window.ReactRedux;
const ReduxThunk = window.ReduxThunk.default;

const INCREMENT = 'INCREMENT', DECREMENT = 'DECREMENT';

function reducer(state = 0,action){
  switch(action.type){
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
const increment = () => ({type:INCREMENT})
const decrement = () => ({type:DECREMENT})
const incrementOdd = () => {
  return (dispatch,getState) => {
    let counter = getState();
    console.log(counter);
    if(counter % 2 !== 0){
      dispatch(increment())
    }
  }
}
const incrementAsync = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    },1000);
  }
}

const store = createStore(
  reducer,
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__() && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

class Counter extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let {increment,decrement,incrementOdd,incrementAsync} = this.props;
    return (
      <div>
        <span style={{paddingRight:'20px'}}>Click {this.props.counter} times</span>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={incrementOdd}>Increment if odd</button>
        <button onClick={incrementAsync}>Increment async</button>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    counter:state
  }
}
const mapDispatchToProps = {
  increment,decrement,incrementOdd,incrementAsync
}
Counter = connect(mapStateToProps,mapDispatchToProps)(Counter);

ReactDOM.render(
  <Provider store={store}>
    <Counter/>
  </Provider>,
  document.getElementById("counter")
)
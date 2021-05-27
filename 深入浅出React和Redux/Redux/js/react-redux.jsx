const {createStore} = window.Redux;
const {connect,Provider} = window.ReactRedux;

function reducer(state = 0,action){
  let {type} = action;
  switch(type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
function increment(){
  return {
    type:"INCREMENT"
  }
}
function decrement(){
  return {
    type:"DECREMENT"
  }
}
// redux代码组织方式,按角色组织和按功能组织
const store = createStore(reducer);
console.log('store:',store);  // store是一个包含dispatch subscribe getState replaceReducer函数的对象

class Counter extends React.Component{
  constructor(props){
    super(props);
  }
  onIncrement = () => {
    this.props.increment()
  }
  onDecrement = () => {
    store.dispatch({
      type:"DECREMENT"
    })
  }
  render(){
    return (
      <div>
        <button onClick={this.onIncrement}>+</button>
        <button onClick={this.onDecrement}>-</button>
        <span>{this.props.counter}</span>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    counter:state
  }
}
const mapDispatchToProps = {increment, decrement} 

Counter = connect(mapStateToProps,mapDispatchToProps)(Counter); 

ReactDOM.render(
  <Provider store={store}>
    <Counter/>
  </Provider>,
  document.getElementById("demo")
)
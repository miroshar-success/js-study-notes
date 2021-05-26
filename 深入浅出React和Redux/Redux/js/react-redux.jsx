const {createStore} = window.Redux;
const {connect,Provider} = window.ReactRedux;

class Counter extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {onIncrement,onDecrement,caption,value} = this.props;
    return (
      <div>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <span>{caption} ------ {value}</span>
      </div>
    )
  }
}

class CounterGroup extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Counter 
        caption={this.props.caption} 
        onIncrement={this.onIncrement} 
        onDecrement={this.onDecrement}
        value={this.state.value}
      />
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <CounterGroup/>
  </Provider>,
  document.getElementById("demo")
)
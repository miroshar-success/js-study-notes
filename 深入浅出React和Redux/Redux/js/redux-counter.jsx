const {createStore} = window.Redux;

function counterReducer(state = 0, action){
  let {type,payload} = action;
  switch(type){
    case 'INCREMENT':
      return state + payload;
    case "DECREMENT":
      return state - payload;
    default:
      return state;
  }
}

let store = createStore(counterReducer);

class Counter extends React.Component {
  constructor(props){
    super(props);
  }
  handleIncrement = () => {
    store.dispatch({
      type:"INCREMENT",
      payload:3
    })
  }
  handleDecrement = () => {
    store.dispatch({
      type:"DECREMENT",
      payload:2
    })
  }
  render(){
    return (
      <div>
        <p>{store.getState()}</p>
        <button onClick={this.handleIncrement}>increment+3</button>
        <button onClick={this.handleDecrement}>decrement-2</button>
      </div>
    )
  }
}

store.subscribe( () => {console.log(store.getState())});
store.dispatch({type:"INCREMENT",payload:2});
store.dispatch({type:"DECREMENT",payload:1});

store.subscribe(() => {
  ReactDOM.render(
    <Counter/>,
    document.getElementById("app")
  )
})
ReactDOM.render(
  <Counter/>,
  document.getElementById("app")
)
const {createStore} = window.Redux;

function counterReducer(state = 0, action){
  let {type,payload} = action;
  switch(type){
    case 'INCREMENT':
      return state += payload;
    case "DECREMENT":
      return state -= payload;
    default:
      return state;
  }
}

let store = createStore(counterReducer);

class Counter extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <p>{}</p>
        <button onClick={this.handleIncrement}>increment</button>
        <button onClick={this.handleDecrement}>decrement</button>
      </div>
    )
  }
}

store.subscribe( () => {store.getState()});
store.dispatch({type:"INCREMENT",payload:2});
store.dispatch({type:"DECREMENT",payload:1});

ReactDOM.render(
  <Counter/>,
  document.getElementById("app")
)
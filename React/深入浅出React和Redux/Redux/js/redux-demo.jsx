const {createStore} = window.Redux;

const initialValue = {
  'First':0,
  "Second":10,
  "Third":20
}

function reducer(state,action){
  const {caption,type} = action;
  switch(type){
    case 'INCREMENT':
      return {...state,[caption]:state[caption]+1};
    case 'DECREMENT':
      return {...state,[caption]:state[caption]-1};   // 扩展操作符不是ES6语法的一部分
    default:
      return state;
  }
}

const store = createStore(reducer,initialValue);

class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      counter:0
    }
  }
  handleIncrement = () => {
    store.dispatch({
      type:"INCREMENT",
      caption:this.props.caption
    })
  }
  handleDecrement = () => {
    store.dispatch({
      type:"DECREMENT",
      caption:this.props.caption
    })
  }
  componentDidMount(){
    let initialValue = store.getState()[this.props.caption];
    this.setState({
      counter:initialValue
    })
    store.subscribe(() => {
      let counter = store.getState()[this.props.caption];
      this.setState({
        counter
      })
    })
  }
  render(){
    return (
      <div>
        <button onClick={this.handleIncrement}>add</button>
        <button onClick={this.handleDecrement}>reduce</button>
        <span style={{paddingLeft:'20px'}}>{this.state.counter}</span>
      </div>
    )
  }
}

class Summary extends React.Component {
  constructor(props){
    super(props);
    this.state = this.getOwnState()
  }
  getOwnState = () => {
    let sum = 0;
    let sum_object = store.getState();
    for(let key in sum_object){
      sum += sum_object[key];
    }
    return {sum}
  }
  componentDidMount(){
    store.subscribe(() => {
      let {sum} = this.getOwnState();
      this.setState({sum})
    })
  }
  render(){
    return (
      <div>Sum--{this.state.sum}</div>
    )
  }
}

class CounterControl extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <Counter caption="First"/>
        <Counter caption="Second"/>
        <Counter caption="Third"/>
        <hr/>
        <Summary/>
      </div>
    )
  }
}

ReactDOM.render(
  <CounterControl/>,
  document.getElementById("root")
)


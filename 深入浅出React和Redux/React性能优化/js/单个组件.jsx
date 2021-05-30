// 组件的数据来自于父亲组件   class组件
class Counter extends React.Component {
  constructor(){
    super(...arguments);
  }
  shouldComponentUpdate(nextProps){
    // if(nextProps['counter'] === this.props['counter']){
    //   return false;
    // }
    // return true;
    return nextProps['counter'] !== this.props['counter'];
  }
  render(){
    console.log('子组件渲染了');
    return (
      <div>
        子组件的数据 {this.props.counter}
      </div>
    )
  }
}

// 数据来源于父组件, 函数组件
const SingleCounter = React.memo(function ({counter}){
  console.log("子组件渲染了");
  return (
    <div>子组件的数据 {counter}</div>
  )
})

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      counter:0,
      count:0
    }
  }
  handleClick = () => {
    this.setState(state => ({
      counter:state.counter+1
    }))
  }
  handleIncrement = () => {
    this.setState(state => ({
      count:state.count + 1
    }))
  }
  render(){
    return (
      <div>
        {/* <Counter counter={this.state.counter}/> */}
        <SingleCounter counter={this.state.counter}/>
        <p>父组件的数据: {this.state.count}</p>
        <button onClick={this.handleClick}>更新子组件数据</button>
        <button onClick={this.handleIncrement}>更新父组件数据</button>
      </div>
    )
  }
}
ReactDOM.render(
  <App/>,
  document.getElementById("app")
)


// 组件数据来源于 store
const {createStore,combineReducers} = window.Redux;
const {Provider,connect} = window.ReactRedux;
const INCREMENT = 'INCREMENT', DECREMENT = 'DECREMENT', ADD = 'ADD';
function counter(state = 0, action){
  switch(action.type){
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
function number(state = [],action){
  let {type,payload} = action;
  switch(type){
    case ADD:
      return [payload,...state];
    default:
      return state;
  }
}

function increment(){
  return {
    type:INCREMENT
  }
}
function decrement(){
  return {
    type:DECREMENT
  }
}

function add(payload){
  return {
    type:ADD,
    payload
  }
}

const reducer = combineReducers({
  counter,
  number
});

const store = createStore(reducer,
  window.__REDUX_EXTENSION_DEVTOOLS && window.__REDUX_EXTENSION__DEVTOOLS__()  
)


// 当子组件数据来源于store,只有子组件的数据更新了才会更新,否则更新父组件的数据不会更新子组件。
// 如果子组件不需要 store里的其他数据,则不要写在mapState里,否则也会造成子组件数据的更新
class Child extends React.Component {
  constructor(){
    super(...arguments);
  }
  render(){
    let array = this.props.number;
    return (
      <div>
        子组件的数据
        {array.length > 0 && array.map((item,index) => {
          return <div key={'item-'+index}>{item}</div>
        })}
      </div>
    )
  }
}
const mapChildState = store => {
  return {
    number:store.number,
  }
}
Child = connect(mapChildState,null)(Child);


class Parent extends React.Component {
  constructor(props){
    super(props);
  }
  handleAdd = () => {
    let number = Math.floor(Math.random() * 10);
    this.props.add(number);
  }
  render(){
    return (
      <div>
        <p>父组件的数据: {this.props.counter}</p>
        <button onClick={this.props.increment}>+</button>
        <button onClick={this.props.decrement}>-</button>
        <div>
          <button onClick={this.handleAdd}>更新子组件的数据</button>
        </div>
        <Child/>
      </div>
    )
  }
}
const mapParentState = store => {
  return {
    counter:store.counter
  }
}
Parent = connect(mapParentState,{increment,decrement,add})(Parent);

ReactDOM.render(
  <Provider store={store}>
    <Parent/>
  </Provider>,
  document.getElementById("parent")
)


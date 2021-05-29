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
        <p>父组件数据: {this.state.count}</p>
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



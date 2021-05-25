class Child extends React.Component{
  constructor(props){
    super(props);
  }
  // 当父组件render函数调用后,子组件的componentWillReceiveProps 会被调用
  componentWillReceiveProps(props){
    console.log('componentWillReceiveProps',props);
  }
  render(){ 
    console.log("子组件render");
    return (
      <div>我是子组件</div>
    )
  }
}
// 组件的生命周期函数 
class LifeCycleComponent extends React.Component {
  constructor(props){
    super(props);
    console.log("constructor");
    this.state = {
      counter:0
    }
  }
  handleClick = () => {
    this.setState(state => ({
      counter:state.counter + 1
    }))
  }
  componentWillMount(){
    console.log('componentWillMount');
  }
  componentDidMount(){
    console.log('componentDidMount');
    let button = document.querySelector(".button");
    console.log('button:',button);
  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
  }
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
    return true;
  }
  render(){
    console.log('render');
    return (
      <div>
        <Child counter={this.state.counter}/>
        <button onClick={this.handleClick} className="button">{this.state.counter}</button>
        <button onClick={() => this.forceUpdate()}>forceUpdate</button>
      </div>
    )
  }
}

ReactDOM.render(
  <LifeCycleComponent/>,
  document.getElementById("lifecycle")
)
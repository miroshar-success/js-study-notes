// class组件传递props给子组件
class Parent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      counter:0
    }
  }
  handleClick = () => {
    this.setState(state => ({
      counter:state.counter+1
    }))
  }
  render(){
    return (
      <div>
        <p>父组件的counter: {this.state.counter}</p>
        <button onClick={this.handleClick}>click me</button>
        <Child counter={this.state.counter}/>
      </div>
    )
  }
}

class Child extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      counter:props.counter
    }
  }
  componentWillReceiveProps(props){
    this.setState({
      counter:props.counter
    })
  }
  render(){
    console.log("render");
    return (
      <div>
        <p>子组件的counter:通过state接收props: {this.state.counter}</p>
        {/* <div>直接使用counter: {this.props.counter}</div> */}
      </div>
    )
  }
}

ReactDOM.render(
  <Parent/>,
  document.getElementById("demo")
)


// 函数组件传递参数给子组件
function Father(){
  let [counter,setCounter] = React.useState(0);
  function handleClick(){
    setCounter(counter+1);
  }
  return (
    <div>
      <p>父组件的counter :{counter}</p>
      <Son counter={counter}/>
      <button onClick={handleClick}>click me</button>
    </div>
  )
}

function Son(props){
  return (
    <div>
      <p>子组件的counter:{props.counter}</p>
    </div>
  )
}

ReactDOM.render(
  <Father/>,
  document.getElementById("app")
)
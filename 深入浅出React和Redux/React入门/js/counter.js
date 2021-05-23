class Counter extends React.Component{
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
        <p>class组件 {this.state.counter}</p>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Counter/>,
  document.getElementById("root")
);



function Counter1(){
  let [count,setCount] = React.useState(0);
  function handleClick(){
    setCount(count => count+1);
  }
  return(
    <div>
      函数组件: {count}
      <button onClick={handleClick}>click me {count}</button>
    </div>
  )
}

ReactDOM.render(
  <Counter1/>,
  document.getElementById("app")
)
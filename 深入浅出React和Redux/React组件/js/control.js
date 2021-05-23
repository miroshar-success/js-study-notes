class Counter extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <button>+</button> 
        <button>-</button>
        <span style={{paddingLeft:'15px'}}>{this.props.caption} -- {this.props.initialValue}</span>
      </div>
    )
  }
}

class ControlPanle extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <Counter caption="First" initialValue={0}/>
        <Counter caption="Second" initialValue={10}/> 
        <Counter caption="Third" initialValue={20}/> 
      </div>
    )
  }
}

ReactDOM.render(
  <ControlPanle/>,
  document.getElementById("root")
)
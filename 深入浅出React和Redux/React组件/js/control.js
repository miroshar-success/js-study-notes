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
// babel-react-optimize   打包时删除代码类型检测
Counter.propTypes = {
  caption:PropTypes.string.isRequired,
  initialValue:PropTypes.number
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
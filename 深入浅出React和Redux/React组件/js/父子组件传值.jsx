// 子组件给父组件传递参数
class CounterControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      array:[0,10,20],
      sum:0
    }
  }
  handleUpdate = (newValue,oldValue) => {
    let delValue = newValue - oldValue;
    this.setState(state => ({
      sum:state.sum + delValue
    }))
  }
  componentDidMount(){
    let array = this.state.array;
    let sum = array.reduce((prev,next) => prev + next,0);
    this.setState({sum});
  }
  render(){
    let array = this.state.array;
    return (
      <div>
        <SingleCounter caption="First" initialValue={array[0]} onUpdate={this.handleUpdate}/>
        <SingleCounter caption="Second" initialValue={array[1]} onUpdate={this.handleUpdate}/>
        <SingleCounter caption="Third" initialValue={array[2]} onUpdate={this.handleUpdate}/>
        <div>total : {this.state.sum}</div>
      </div>
    )
  }
}

class SingleCounter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      counter:props['initialValue']
    }
  }
  handleIncrement = () => {
    this.updateCount(true);
  }
  handleDecrement = () => {
    this.updateCount(false);
  }
  updateCount = (flag) => {
    let previousValue = this.state.counter;
    const newValue = flag ? previousValue + 1 : previousValue - 1;
    this.setState({
      counter:newValue
    })
    this.props.onUpdate(newValue,previousValue);
  }
  render(){
    return (
      <div>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
        <span style={{paddingLeft:'20px'}}>{this.state.counter}</span>  
      </div>
    )
  }
}

ReactDOM.render(
  <CounterControl/>,
  document.getElementById("my-app")
)
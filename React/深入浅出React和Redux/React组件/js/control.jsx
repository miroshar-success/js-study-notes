// 传递 增减函数 到子组件,在父亲组件里修改数据 子组件更新
class Counter extends React.Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps){
    if(this.props.initialValue === nextProps['initialValue']){
      return false;
    }
    return true;
  }
  render(){
    return (
      <div>
        <button onClick={this.props.Increment}>+</button> 
        <button onClick={this.props.Decrement}>-</button>
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
    this.state = {
      firstInitialValue:0,
      secondInitialValue:10,
      thirdInitialValue:20
    }
  }
  handleIncrement(type){
    switch(type){
      case 'first':
        this.setState(state => ({
          firstInitialValue:state.firstInitialValue + 1
        }));
      break;
      case 'second':
        this.setState(state => ({
          secondInitialValue:state.secondInitialValue + 1
        }));
      break;
      case 'third':
        this.setState(state => ({
          thirdInitialValue:state.thirdInitialValue + 1
        }))
      break;
    }
  }
  handleDecrease(type){
    switch(type){
      case 'first':
        this.setState(state => ({
          firstInitialValue:state.firstInitialValue - 1
        }));
      break;
      case 'second':
        this.setState(state => ({
          secondInitialValue:state.secondInitialValue - 1
        }));
      break;
      case 'third':
        this.setState(state => ({
          thirdInitialValue:state.thirdInitialValue - 1
        }))
      break;
    }
  }
  render(){
    return (
      <div>
        <Counter 
          caption="First" 
          initialValue={this.state.firstInitialValue} 
          Increment={this.handleIncrement.bind(this,'first')}
          Decrement={this.handleDecrease.bind(this,'first')}
        />
        <Counter 
          caption="Second" 
          initialValue={this.state.secondInitialValue} 
          Increment={this.handleIncrement.bind(this,'second')}
          Decrement={this.handleDecrease.bind(this,'second')}
        /> 
        <Counter 
          caption="Third" 
          initialValue={this.state.thirdInitialValue} 
          Increment={this.handleIncrement.bind(this,'third')}
          Decrement={this.handleDecrease.bind(this,'third')}
        /> 
      </div>
    )
  }
}

ReactDOM.render(
  <ControlPanle/>,
  document.getElementById("root")
)

// 子组件接收props 作为state, 在子组件内部修改state
class MyCounter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      counter:props['initialValue']
    }
  }
  handleIncrement = () => {
    this.setState(state => ({
      counter:state.counter + 1
    }))
  }
  handleDecrement = () => {
    this.setState(state => ({
      counter:state.counter - 1
    }))
  }
  render(){
    return (
      <div>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleDecrement}>-</button>
        <span style={{paddingLeft:'10px'}}>{this.props.caption} -- {this.state.counter}</span>
      </div>
    )
  }
}

class CounterGroup extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <MyCounter caption="First" initialValue={0}/>
        <MyCounter caption="Second" initialValue={10}/>
        <MyCounter caption="Third" initialValue={20}/>
      </div>
    )
  }
}

ReactDOM.render(
  <CounterGroup/>,
  document.getElementById("counter")
)
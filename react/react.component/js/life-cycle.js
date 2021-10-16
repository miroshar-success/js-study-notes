// state更新时生命周期函数调用顺序
class HelloWorld extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count:0
    }
    console.log('constructor')
  }
  static getDerivedStateFromProps () {
    console.log('getDerivedStateFromProps')
    return null
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  componentDidUpdate(prevProps,prevState,snapshot) {
    console.log('componentDidUpdate')
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }
  getSnapshotBeforeUpdate(){
    console.log('getSnapshotBeforeUpdate')
    return 'snap'
  }
  handleClick = () => {
    this.setState(state => ({
      count:state.count + 1
    }))
  }
  render() {
    console.log('render')
    return (
      <React.Fragment>
        {true}
        <button onClick={this.handleClick}>{this.state.count}</button>
      </React.Fragment>
    )
  }
}

// ReactDOM.render(
//   <HelloWorld/>,
//   document.getElementById('root')
// )
/*
// 执行顺序
constructor -> getDerivedStateFromProps -> render -> componentDidMount
// 更新state执行顺序
getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate
*/

// 接收props时 Count组件生命周期函数调用顺序
class Count extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
    console.log('constructor')
  }
  static getDerivedStateFromProps () {
    console.log('getDerivedStateFromProps')
    return null
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }
  getSnapshotBeforeUpdate(){
    console.log('getSnapshotBeforeUpdate')
    return 'snap'
  }
  render() {
    console.log('render')
    return (
      <div>{this.props.count}</div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count: 1
    }
  }
  handleClick = () => {
    this.setState(state => ({
      count: state.count + 1
    }))
  }
  render(){
    return (
      <React.Fragment>
        <Count count={this.state.count}/>
        <button onClick={this.handleClick}>click</button>
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)


// 将props中的值传递个state对象 产生的bug

class Child extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count: props.count  // 当父组件count更新时 子组件不会更新
    }
  }
  render() {
    return (
    <p>child-count{ this.state.count}</p>
    )
  }
}

class Parent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count:0
    }
  }
  handleClick = () => {
    this.setState(state => ({
      count: state.count + 1
    }))
  }
  render() {
    return (
      <div>
        <Child count={this.state.count}/>
        <button onClick={this.handleClick}>parent-count {this.state.count}</button>
      </div>
    )
  }
}
ReactDOM.render(
  <Parent/>,
  document.getElementById('root')
)

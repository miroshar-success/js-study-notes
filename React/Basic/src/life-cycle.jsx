class Child extends React.Component {
  constructor(props) {
    super(props)
    console.log('child-constructor')
  }
  componentDidMount() {
    console.log('child-componentDidMount')
  }
  componentDidUpdate() {
    console.log('child-componentDidUpdate')
  }
  componentWillUnmount () {
    console.log('child-componentWillUnmount')
  }
  render() {
    console.log('child-render')
    return (
      <div>{this.props.count}</div>
    )
  }
}
/***
 * // ----- 初始化渲染 -------
 * parent-constructor
 * parent-render
 * child-constructor
 * child-render
 * child-componentDidMount
 * parent-componentDidMount
 * 
 * // ----- 更新 ------
 * parent-render
 * child-render
 * child-componentDidUpdate
 * parent-componentDidUpdate
 * 
 * // ----- 销毁子组件 ------
 * parent-render
 * child-componentWillUnmount
 * parent-componentDidUpdate
 */
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      visible: true
    }
    console.log('parent-constructor')
  }
  handleClick = () => {
    this.setState(state => ({
      count: state.count + 1
    }))
  }
  componentDidMount() {
    console.log('parent-componentDidMount')
  }
  componentDidUpdate() {
    console.log('parent-componentDidUpdate')
  }
  toggle = () => {
    this.setState(state => ({
      visible: !state.visible
    }))
  }
  render() {
    console.log('parent-render')
    return (
      <div>
        <button onClick={this.handleClick}>{this.state.count} times</button>
        <button onClick={this.toggle}>toggle visible</button>
        { this.state.visible ? <Child count={this.state.count}/> : null}
      </div>
    )
  }
}

// 生命周期函数
class ChildCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentWillReceiveProps(data) {
    console.log('componentWillReceiveProps', data, this.state)
  }
  componentDidMount() {
    console.log('componentDidMount', this.state.count)
  }
  componentDidUpdate() {
    console.log('componentDidUpdate', this.state.count)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextState, this.state)
    return true
  }
  handleIncrement = () => {
/*     this.setState(state => ({
      count: state.count + 2
    })) */
    this.setState({count: this.state.count + 1})
    console.log('第一次:', this.state.count)  // 0
    this.setState({count: this.state.count + 1})
    console.log('第二次:', this.state.count)  // 0
    window.setTimeout(() => {
      this.setState({count: this.state.count + 1})
      console.log('第三次:', this.state.count)  // 1

      this.setState({count: this.state.count + 1})
      console.log('第四次:', this.state.count)  // 1
    }, 0)
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleIncrement}>子组件 count {this.state.count}</button>
        <button>父组件 count {this.props.count}</button>
      </React.Fragment>
    )
  }
}
// 无状态组件
class NoStateComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    console.log('无状态组件 componentDidUpdate')
  }
  shouldComponentUpdate() {
    console.log('无状态组件 shouldComponentUpdate')
    return true
  }
  render() {
    return (<button>无状态组件 ---- {this.props.count}</button>)
  }
}
const ParentCounter = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
  }
  return (
    <>
      <button onClick={handleClick}>click {count}</button>
      <NoStateComponent count={count}/>
      <ChildCounter count={count}/>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('life-cycle-app'))
.render(
  <>
    <App/>
    <ParentCounter/>
  </>
)
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

ReactDOM.createRoot(document.getElementById('life-cycle-app')).render(<App/>)
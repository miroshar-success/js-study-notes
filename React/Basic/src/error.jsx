class CounterApplication extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      count: 0
    }
  }
  handleClick = () => {
    this.setState(state => ({
      count: state.count + 1
    }))
  }
  componentDidUpdate () {
    throw new Error('componentDidUpdate went wrong')
  }
  componentDidMount() {
    throw new Error('componentDidMount went wrong')
  }
  render() {
    if (this.state.count === 5) {
      throw new Error('I cashed!')
    }
    return (
      <button onClick={this.handleClick}>click {this.state.count} times</button>
    )
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      errorInfo: null
    }
  }
  static getDerivedStateFromError () { // 渲染一个报错后的UI组件, 需要返回一个 state
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) { // 
    console.log(error, errorInfo)
  }
  render() {
    if (this.state.hasError) return <h2>Something went wrong!</h2>
    return this.props.children
  }
}

createRoot(document.getElementById('error-app'))
.render(
  <ErrorBoundary>
    <CounterApplication/>
  </ErrorBoundary>
)
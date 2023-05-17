class Child extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'hello'
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    console.log(nextState, nextProps, this.props)
    return this.props.count !== nextProps.count
  }
  componentDidUpdate () {
    console.log('component-did-update')
  }
  render() {
    console.log('child-render')
    return (
      <div>child component</div>
    )
  }
}

const Counter = React.memo((props) => {
  console.log(props)
  return (<button>hello, {props.count}</button>)
})

const App = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count => count+1)
  }
  return (
    <>
      <button onClick={handleClick}>{count}</button>
      <Child count={count}/>
      <Counter count={count}/>
    </>
  )
}
ReactDOM.createRoot(document.getElementById('should-component-update-app')).render(<App/>)
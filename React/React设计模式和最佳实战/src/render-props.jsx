// ------------- (函数为子组件 function as child)----------------
const CounterApp = (props) => {
  const [counter, setCounter] = useState(0)
  const handleIncrement = () => {
    setCounter(counter + 1)
  }
  return (
    <>{props.children({counter, handleIncrement})}</>
  )
}
const Counter = () => {
  return (
    <CounterApp>
      {({counter, handleIncrement}) =>  (<button onClick={handleIncrement}>click {counter} times</button>)}
    </CounterApp>
  )
}

// render-props
class MousePosition extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      x: 0,
      y: 0
    }
  }
  componentDidMount() {
    document.addEventListener('mousemove', this.mousemove, false)
  }
  mousemove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove', this.mousemove, false)
  }
  render() {
    return (
      <>
        { this.props.render(this.state)}
      </>
    )
  }
}
const Position = () => {
  return <MousePosition render={({x, y}) => (
    <div>
      x: {x}
      y: {y}
    </div>
  )}/>
}

createRoot(document.getElementById('render-props-app'))
.render(
  <>
    <Counter/>
    <Position/>
  </>
)
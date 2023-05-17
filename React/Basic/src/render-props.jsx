// 接收一个render函数, 将state传递给render函数
class MouseMove extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }
  mousemove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }
  componentDidMount () {
    document.addEventListener('mousemove', this.mousemove, false)
  }
  componentWillUnmount () {
    document.removeEventListener('mousemove', this.mousemove, false)
  }
  render() {
    return (<>
      { this.props.render(this.state)}
    </>)
  }
}

const Mouse = (props) => {
  return (
    <>
      <div>x: {props.x}</div>
      <div>y: {props.y}</div>
    </>
  )
}

class App extends React.Component {
  render() {
    return (
      <>
        <MouseMove
          render={(state) => (<Mouse {...state} message={'hello world'}/>)}
        />
      </>
    )
  }
}

ReactDOM.createRoot(document.getElementById('render-props-app')).render(<App/>)
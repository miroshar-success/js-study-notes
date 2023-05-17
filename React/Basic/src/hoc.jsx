const mouseMoveFactory = (Component) => {
  return class MouseMove extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        x: 0,
        y: 0
      }
    }
    componentDidMount () {
      document.addEventListener('mousemove', this.mousemove, false)
    }
    mousemove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      })
    }
    componentWillUnMount () {
      document.removeEventListener('mousemove', this.mousemove, false)
    }
    render() {
      const data = {
        ...this.state,
        ...this.props
      }
      return (
        <Component {...data}/>
      )
    }
  }
}

const MousePosition = mouseMoveFactory((props) => {
  return (
    <>
      <div>{props.name}</div>
      <div>x: <i>{props.x}</i></div>
      <div>y: <i>{props.y}</i></div>  
    </>
  )
})

const App = () => (
  <>
    <MousePosition name={'hello'}/>
  </>
)

ReactDOM.createRoot(document.getElementById('hoc-app')).render(<App/>)
class HelloWorld extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count:0
    }
  }
  static getDerivedStateFromProps () {

  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  componentDidMount() {

  }
  shouldComponentUpdate() {

  }
  render() {
    return (
      <div>{this.state.count}</div>
    )
  }
}

ReactDOM.render(
  <HelloWorld/>,
  document.getElementById('#root')
)

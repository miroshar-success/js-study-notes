class CountDown extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count:this.props.count
    }
  }
  shouldComponentUpdate(nextProps,nextState){
    return this.state.count !== nextState['count'] || nextProps['count'] !== this.props.count;
  }
  componentDidMount(){
    this.timer = setInterval(() => {
      let count = this.state.count - 1;
      if(count >= 0){
        this.setState({count})
      }else{
        this.setState({count:0})
        window.clearInterval(this.timer);
      }
    },1000);
  }
  componentWillUnmount(){
    window.clearInterval(this.timer);
  }
  render(){
    console.log('render');
    return this.props.children(this.state.count);   // 函数组件作为组件的子元素
  }
}

function App(){
  let [count,setCount] = React.useState(10);
  function handleSetCount(){
    setCount(prevCount => prevCount+1)
  }
  return (
    <div>
      <CountDown count={count}>
        {(count) => <div>{count > 0 ? count : '新年快乐'}</div>}
      </CountDown>
      <button onClick={handleSetCount}>{count}</button>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById("count")
)
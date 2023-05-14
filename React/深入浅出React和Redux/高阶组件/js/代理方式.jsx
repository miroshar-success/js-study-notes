// 代理方式 增删props
class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <FilterComponent firstName="kyrie" lastName="kyrie" age="29"/>
        {/* <Player firstName="kyrie" lastName="irving" age="29"/> */}
      </div>
    )
  }
}

function wrap(title) {
  return function(WrappedComponent){
    return class WrappingComponent extends React.Component {
      render(){
        console.log(this.props)
        return (
          <div>
            <div>{title}</div>
            <WrappedComponent teamp={'篮网'} {...this.props}/>
          </div>
        )
      }
    }
  }
}


class Player extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <p>球员信息:</p>
        <p>firstName: {this.props.firstName}</p>
        <p>lastName:{this.props.lastName}</p>
        <p>age:{this.props.age}</p>
        <p>球队:{this.props.team}</p>
      </div>
    )
  }
}

let FilterComponent = wrap('hello')(Player);

ReactDOM.render(
  <div>
    <App/>
  </div>,
  document.getElementById("root")
)
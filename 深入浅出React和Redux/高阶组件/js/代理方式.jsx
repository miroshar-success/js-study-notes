// 代理方式 增删props
class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <Player firstName="kyrie" lastName="irving" age="29"/>
      </div>
    )
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

function WrapComponent(WrappedComponent){
  return class WrappingComponent extends React.Component {
    render(){
      return (
        <WrappedComponent team={'篮网'}/>
      )
    }
  }
}

let FilterComponent = WrapComponent(Player);

ReactDOM.render(
  <div>
    <App/>
    <FilterComponent/>
  </div>,
  document.getElementById("root")
)
 class Button extends React.Component{
   constructor(props){
     super(props);
   }
   render(){
     return (
      <button style={this.props.style}>{this.props.text}</button>
     )
   }
 }

function WrapButton(WrapComponent,style,text){
  return class WrappingComponent extends React.Component{
    constructor(props){
      super(props)
    }
    render(){
      return (
        <WrapComponent style={style} text={text}/>
      )
    }
  }
}

const PrimaryButton = WrapButton(Button,{color:'#1890ff'},'hello world');
const DangerButton = WrapButton(Button,{color:'rgb(240,20,20)'},'hello world')



// 以函数为子组件
class AddUserProp extends React.Component{
  render(){
    const user = 'kyrie irving';
    return this.props.children(user)
  }
}

function Bar({currentUser}){
  return (
    <div>currentUser: hello {currentUser}</div>
  )
}

ReactDOM.render(
  <div>
    <PrimaryButton/>
    <DangerButton/>
    <AddUserProp>
      {(user) => <div>hello {user}</div>}
    </AddUserProp>
    <AddUserProp>
      {(user) => <Bar currentUser={user}/>}
    </AddUserProp> 
  </div>,
  document.getElementById("app")
)
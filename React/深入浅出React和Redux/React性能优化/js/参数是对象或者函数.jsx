// 子组件参数是对象
const Foo = React.memo(function ({style}){
  console.log("子组件渲染了");
  return (
    <div style={style}>hello world</div>
  )
})
const style = {color:'red'}
function Parent(){
  const [count,setCount] = React.useState(0);
  function handleClick(){
    setCount(count+1);
  }
  return (
    <div>
      <Foo style={style}/>
      <button onClick={handleClick}>{count}</button>
    </div>
  )
}

ReactDOM.render(
  <Parent/>,
  document.getElementById("root")
)


// prop是函数
const playerStyle = {
  display:'flex',
  height:'32px',
  cursor:'pointer'
}
const PlayerItem = React.memo(function({player,deletePlayer,index}){
  console.log('更新了');
  return (
    <li style={playerStyle}>
      <span>{player}</span>
      <span onClick={deletePlayer.bind(null,index)}>X</span>
    </li>
  )
})

class PlayerList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playerList:['kyrie','durant','lebron','wade','kode','bosh']
    }
  }
  handleDeletePlayer = (index) => {
    console.log('index:',index);
    let a = [...this.state.playerList];
    a.splice(index,1);
    this.setState({
      playerList:a
    })
  }
  render(){
    return (
      <ul>
        {this.state.playerList.map((player,index) => (
          <PlayerItem 
            player={player} index={index} key={'player-'+index}
            deletePlayer={this.handleDeletePlayer}
          />
        ))}
      </ul>
    )
  }
}
ReactDOM.render(
  <PlayerList/>,
  document.getElementById("player")
)
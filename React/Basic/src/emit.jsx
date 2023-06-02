const Counter = (props) => {
  const handleClick = () => {
    props.click('hello')
  }
  return (<button onClick={handleClick}>click me {props.count}</button>)
}

const App = () => {
  const [count, setCount] = useState(0)
  const handleClick = (a) => {
    console.log('a', a)
    setCount(c => c + 1)
    setTimeout(() => {
      console.log(count)  // 一个state变量的值永远不会在一次渲染的内部发生变化
    }, 200)
  }
  return (
    <>
      <Counter count={count} click={handleClick}/>
    </>
  )
}

// -------------------- 兄弟组件通信 -----------------------------
class EventEmitter extends EventTarget {
  on (type, listener) {
    this.addEventListener(type, listener)
  }
  off (type, listener) {
    this.removeEventListener(type, listener)
  }
  emit (type, data) {
    this.dispatchEvent(new CustomEvent(type, {
      detail: data
    }))
  }
}

const playerList = [
  { id: 1, firstName: 'kyrie', lastName: 'irving' },
  { id: 2, firstName: 'lebron', lastName: 'james' },
  { id: 3, firstName: 'kevin', lastName: 'durant' }
]
const bus = new EventEmitter()

const PlayerList = () => {
  const handleClickPlayer = (player) => {
    bus.emit('player', player)
  }
  return (
    <ul>
      { playerList.map(player => (
        <li key={player.id} onClick={() => handleClickPlayer(player)}>{player.id} - {player.firstName} - {player.lastName}</li>
      ))}
    </ul>
  )
}

const EventApp = () => {
  useEffect(() => {
    bus.on('player', ({detail: player}) => {
      console.log('事件车触发了:', player)
    })
  }, [])
  return (
    <PlayerList/>
  )
}

createRoot(document.getElementById('emit-app')).render(
  <>
    <App/>
    <EventApp/>
  </>
)
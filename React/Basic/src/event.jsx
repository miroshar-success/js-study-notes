const Counter = () => {
  const [count, setCount] = useState(0)
  const handleIncrement = () => {
    setCount(c => c+1)
  }
  return (
    <button onClick={handleIncrement}>{count}</button>
  )
}

const players = ['kyrie', 'durant', 'james']
// 给事件传递参数
const Player = () => {
  const handleClick = (player) => {
    console.log(player)
  }
  return (
    <ul>
      { players.map(p => (<li key={p} onClick={() => handleClick(p)}>{p}</li>))}
    </ul>
  )
}

// 将事件作为props传递
const Button = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
)

// ------- 按钮 -------
const PlayerButton = () => {
  const player = () => {
    console.log('播放')
  }
  return (
    <Button onClick={player}>播放</Button>
  )
}
const UploadButton = () => {
  const upload = () => {
    console.log('上传')
  }
  return (
    <Button onClick={upload}>上传</Button>
  )
}
// ---------- 事件流 -------------
const Toolbar = () => {
  const handleToolClick = () => {
    console.log('tool-click')
  }
  const handleButtonClick = (e) => {
    console.log('button click')
    e.stopPropagation()
  }
  return (
    <div onClick={handleToolClick}>
      <button onClick={handleButtonClick}>click me</button>
    </div>
  )
}

// ---------- 阻止浏览器默认事件 ----------
const Form = () => {
  const handleSubmit = (e) => {
    console.log('hello')
    e.preventDefault()
  }
  return (
    <form>
      <input type="text" placeholder='name'/>
      <input type="text" placeholder='age'/>
      <input type="submit" onClick={handleSubmit}/>
    </form>
  )
}

const App = () => (
  <>
    <Counter/>
    <Player/>
    <PlayerButton/>
    <UploadButton/>
    <Toolbar/>
    <Form/>
  </>
)

ReactDOM.createRoot(document.getElementById('event-app')).render(<App/>)
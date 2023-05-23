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

createRoot(document.getElementById('emit-app')).render(<App/>)
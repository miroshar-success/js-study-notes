// 优化子组件更新
const Child = memo(function (props) {
  console.log('child-render')
  return (<div>我是子组件</div>)
})

const Counter = () => {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const handleClick = () => {
    setCount(count+1)
  }
  const double = useMemo(() => {
    console.log('执行了吗？')
    return count * 2
  }, [count])
  const handleToggle = () => {
    setVisible(!visible)
  }
  return (
    <>
      <button onClick={handleClick}>click {count} times</button>
      <button>double {double}</button>
      <button onClick={handleToggle}>toggle visible</button>
      <Child visible={visible}/>
    </>
  )
}

const App = () => (
  <>
    <Counter/>
  </>
)

createRoot(document.getElementById('memo-app')).render(<App/>)
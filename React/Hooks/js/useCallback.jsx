const CounterComponent = (props) => {
  console.log('callback child component render')
  return <button onClick={props.onClick}>click me</button>
}
const set = new Set()

// input组件
const Input = memo(({onChange}) => {
  console.log('input render')
  return <input type='text' onChange={onChange}/>
})


const App = () => {
  const [count, setCount] = useState(10)
  const [visible, setVisible] = useState(false)
  // 这种情况没必要使用useCallback
  const handleClick = useCallback(() => {
    setCount(count+1)
  }, [count])
  // input框
  const handleChange = useCallback((e) => {
    console.log(e.target.value)
  },[])
  set.add(handleChange)
  console.log(set.size)
  return (
    <>
      <div style={{color: 'red'}}>{count}</div>
      <CounterComponent onClick={handleClick}/>
      <button onClick={() => setVisible(!visible)}>toggle</button>
      <Input onChange={handleChange}/>
    </>
  )
}

createRoot(document.getElementById('callback-app')).render(
  <window.React.Fragment>
    <App/>
  </window.React.Fragment>
)

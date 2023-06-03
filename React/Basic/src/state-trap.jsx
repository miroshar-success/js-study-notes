const StateTrapPlayer = (props) => {
  // 父组件更新name 使用props的state不会修改
  // re-render 只恢复初始化的 name
  const [player, setPlayer] = useState(props.name)
  return (
    <>
      <div>state: {player}</div>
      <div>props: {props.name}</div>
    </>
  )
}

// useEffect中的count
const Counter = (config = {}) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    window.setTimeout(() => {
      setCount(count + 1)
    }, 1000)
  }, [])
  // 依赖不要有对象/数组引用类型, 防止死循环
  // 如果依赖为空, 不会重新执行useEffect
  return (
    <div>{count}</div>
  )
}

const TrapeApp = () => {
  const [name, setName] = useState('kyrie')
  const handleChangeName = () => {
    setName('lebron')
  }
  return (
    <>
      <StateTrapPlayer name={name}/>
      <button onClick={handleChangeName}>change name {name}</button>
    </>
  )
}

createRoot(document.getElementById('state-trap')).render(
  <>
    <Counter/>
    <TrapeApp/>
  </>
)
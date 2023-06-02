// -------- 自定义hook ----------
const useCounter = () => {
  const [count, setCount] = useState(0)
  const handleIncrement = () => {
    setCount(count => count+1)
  }
  return {
    count,
    handleIncrement
  }
}

const CounterApp1 = () => {
  const {count, handleIncrement} = useCounter()
  return (
    <button onClick={handleIncrement}>自定义hook-1 {count}</button>
  )
}

const CounterApp2 = () => {
  const {count, handleIncrement} = useCounter()
  return (
    <button onClick={handleIncrement}>自定义hook-1 {count}</button>
  )
}

// 鼠标位置
const useMousePosition = () => {
  const [position, setPosition] = useState({ x:0, y: 0 })
  const listenMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }
  useEffect(() => {
    window.addEventListener('mousemove',listenMouseMove, false)
    return () => {
      window.removeEventListener('mousemove', listenMouseMove, false)
    }
  }, [])
  return position
}
const redStyle = {color: 'red'}
const greenStyle = {color: 'green'}

const Position1 = () => {
  const {x, y} = useMousePosition()
  return <div style={redStyle}>
    <span>x: {x}</span>
    <span>y: {y}</span>
  </div>
}
const Position2 = () => {
  const {x, y} = useMousePosition()
  return <div style={greenStyle}>
    <span>x: {x}</span>
    <span>y: {y}</span>
  </div>
}

// ajax请求
const useAxios = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    setLoading(true)
    const fetch_data = () => {
      return new Promise((resolve, reject) => {
        window.setTimeout(() => {
          const number = Math.random()
          if (number > 0.4) {
            resolve(['王力宏', '周杰伦', '陶喆'])
          } else {
            reject('Something went wrong!')
          }
        }, 2000)
      })
    }
    fetch_data().then(data => {
      setData(data)
    }).catch(err => {
      setError(err)
    }).finally(() => setLoading(false))
  }, [url])
  return [loading, data, error]
}

const Singer1 = () => {
  const [loading, data, error] = useAxios('abc')
  if (loading) return <div style={{color: '#1890ff'}}>Loading...</div>
  if (error) return <div style={{color: 'red'}}>{error}</div>
  return (
    <ul>
      {data.map(singer => <li key={singer}>{singer}</li>)}
    </ul>
  )
}

const Singer2 = () => {
  const [loading, data, error] = useAxios('efd')
  if (loading) return <div style={{color: '#1890ff'}}>Loading...</div>
  if (error) return <div style={{color: 'red'}}>{error}</div>
  return (
    <ul>
      {data.map(singer => <li key={singer}>{singer}</li>)}
    </ul>
  )
}

const App = () => (
  <>
    <CounterApp1/>
    <CounterApp2/>
    <Position1/>
    <Position2/>
    <Singer1/>
    <Singer2/>
  </>
)

createRoot(document.getElementById('customize-hook-app'))
.render(<App/>)
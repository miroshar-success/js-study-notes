const Children = () => {
  const [count, setCount] = useState(0)
  const handleIncrement = () => {
    setCount(count => count+1)
  }
  useEffect(() => {
    console.log('hello counter component')
    return () => {
      console.log('counter unmounted')
    }
  },[])
  useEffect(() => {
    return () => {
      console.log('counter repeat unmounted')
    }
  }, [])
  return (
    <button onClick={handleIncrement}>click me {count} times</button>
  )
}

const Counter = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `you clicked ${count} times`;
  }, [count])
  const handleIncrement = () => {
    setCount(count+1)
  }
  return (
    <button onClick={handleIncrement}>{count}</button>
  )
}

// -------- 销毁组件 --------
const Timer = () => {
  useEffect(() => {
    let timer = window.setInterval(() => {
      console.log(Date.now())
    }, 1000)
    return () => {
      window.clearInterval(timer)
    }
  }, [])
  return (
    <div>hello world</div>
  )
}

const App = () => {
  const [visible, setVisible] = useState(true)
  const handleToggle = () => {
    setVisible(!visible)
  }
  return (
    <>
    <button onClick={handleToggle}>toggle</button>
    { visible ? <Children/> : null}
    <hr />
    <Counter/>
    {visible ? <Timer/> : null}
    </>
  )
}


createRoot(document.getElementById('hooks-app')).render(<App/>)
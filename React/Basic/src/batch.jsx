const Counter1 = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    // 只会执行一次 count+1
    setCount(count+1)
    setCount(count+1)
    setCount(count+1)
  }
  return (
    <button onClick={handleClick}>click {count} times</button>
  )
}

const Counter2 = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count+5)
    setCount(count-1)
    setCount(count+2)
    // 执行的是最后一个 count+2
  }
  return (
    <button onClick={handleClick}>click {count} times</button>
  )
}

const Counter3 = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    // 将更新函数 加入到队列, n传递给每一个更新函数的值 作为参数传入下一个更新函数, 以此类推。所以每次 count + 4
    setCount(count => count + 1)
    setCount(count => count + 1)
    setCount(count => count + 2)
  }
  return (
    <button onClick={handleClick}>click {count} times</button>
  )
}

const Counter4 = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count => count+1)
    setCount(count + 1)
    setCount(count + 2)
    // 只执行了最后一次
  }
  return (
    <button onClick={handleClick}>click {count} times</button>
  )
}

const Counter5 = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    // count+1添加到队列中, 然后再将更新函数添加到队列中
    setCount(count + 1)
    setCount(count => count + 2)
  }
  return (
    <button onClick={handleClick}>click {count} times</button>
  )
}

const Counter6 = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setTimeout(() => {
/*       setCount(count + 1)
      setCount(count + 1)
      setCount(count + 1) */
      // 只执行最后一次
/*       setCount(count+1)
      setCount(c => c + 1)
      setCount(count+2) */
      // 只执行最后一次

/*       setCount(count => count+1)
      setCount(count => count+2)
      setCount(count => count+3) */
      // 执行3次  结果为6

      setCount(count+ 2)
      setCount(count => count+3)
      // 执行2次, 结果为5
    }, 0)
  }
  return (
    <button onClick={handleClick}>click {count} times</button>
  )
}

const App = () => (
  <>
    <Counter1/>
    <Counter2/>
    <Counter3/>
    <Counter4/>
    <Counter5/>
    <Counter6/>
  </>
)

createRoot(document.getElementById('batch-app')).render(<App/>)
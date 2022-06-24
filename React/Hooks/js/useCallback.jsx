const { createRoot } = window.ReactDOM
const { useState, useCallback, memo, useMemo, useRef } = window.React

const callback_app = createRoot(document.getElementById('callback-app'))
const set = new Set()

const Child = memo((props) => {
  return (
    <button onClick={props.click}>child button</button>
  )
})

const App = () => {
  const [count, setCount] = useState(0)
  const memoizedValue1 = useMemo(() => {
    const array = []
    for(let i = 0; i <= 50; i++) {
      array.push(i)
    }
    console.log('computed1...')
    return array.reduce((prev,next) => prev + next, 0)
  }, [])
  const handleClick = () => {
    setCount(count + 1)
  }
  const memoizedValue2 = (() => {
    const array = []
    for(let i = 0; i <= 50; i++) {
      array.push(i)
    }
    console.log('computed2...')
    return array.reduce((prev,next) => prev + next, 0)
  })()
  return (
    <div>
      <div>{memoizedValue1} - {memoizedValue2}</div>
      <button onClick={handleClick}>click - {count}</button>
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div>
      <button>111111-----{count}</button>
    </div>
  )
}

function HelloWorld() {
  let timer = null
  const [count, setCount] = useState(0)
  useEffect(() => {
    timer = setInterval(() => {
      setCount(count => count+1)
    }, 1000)
    setTimeout(() => {
      console.log(count);  // 0
    }, 5000)
  }, [])
  useEffect(() => {
    if(count > 5) {
      clearInterval(timer)
    }
  }, [count])
  return (
    <div>{count}</div>
  )
}
function MeasureSize() {
  const [width, setWidth] = useState(10)
  const boxRef = useRef(null)
  const handleClick = () => {
    setWidth(width+ 10)
  }
  useEffect(() => {
    console.log(boxRef)
    console.log(boxRef.current.getBoundingClientRect().width)
  }, [])
  return (
    <div>
      <div style={{width: `${width}px`, height: '100px', backgroundColor:'pink'}} ref={boxRef}></div>
      <button onClick={handleClick}>click</button>
    </div>
  )
}


callback_app.render(
  <window.React.Fragment>
    <App/>
    <Counter/>
    <HelloWorld/>
    <MeasureSize/>
  </window.React.Fragment>
)

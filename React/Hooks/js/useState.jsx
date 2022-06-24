const { useState, useEffect } = window.React
const { createRoot } = window.ReactDOM

const state_root = createRoot(document.getElementById('state-app'))

function Counter() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count => count+1)
  }
  return (
    <button onClick={handleClick}>click {count} times</button>
  )
}

function UpdateTitle() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count])
  const listen_scroll = () => {
    console.log('scroll')
  }
  useEffect(() => {
    document.addEventListener('scroll', listen_scroll, false)
    return () => {
      document.removeEventListener('scroll', listen_scroll, false)
    }
  }, [])
  const handleClick = () => {
    setCount(count+1)
  }
  return (
    <button onClick={handleClick}>click</button>
  )
}
document.body.style.height = '100000px'
state_root.render(
  <window.React.Fragment>
    <Counter/>
    <UpdateTitle/>
  </window.React.Fragment>
)

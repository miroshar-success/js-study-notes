import React, { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count => count+1)
  }
  return (
    <button onClick={handleClick}>click {count} times</button>
  )
}

export default App
let idx = 0
const HookApp = () => {
  let count, setCount;
  let name, setName;
  idx+=1
  console.log(idx)
  if (idx % 2 === 0) {
    [count, setCount] = useState(0)
    [name, setName] = useState('Mike')
  } else {
    [name, setName] = useState('Mike')
    [count, setCount] = useState(0)
  }
  const handleClick = () => {
    setCount(count => count+1)
  }
  return (
    <button onClick={handleClick}>
      count: {count} - name: {name}
    </button>
  )
}

createRoot(document.getElementById('hook-order-app'))
.render(<HookApp/>)
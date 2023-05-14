const Greeting = ({name}) => {
  return <h4>Hello, {name}</h4>
}
const Button = () => (<button>I am a button</button>)

const Avatar = () => (<div className='avatar'>User</div>)

const user = {
  name: 'Hedy Lamarr',
  url: 'https://img2.baidu.com/it/u=2585457000,160774737&fm=253&fmt=auto&app=138&f=JPEG?w=330&h=500',
  size: 100
}

const Profile = () => (
  <React.Fragment>
    <h5>{user.name}</h5>
    <img src={user.url} alt="" style={{width: user.size}}/>
  </React.Fragment>
)

const Condition = ({login}) => (
  <div>{login ? 'Welcome Back' : 'Hello'}</div>
)

const products = [
  { title: 'Cabbage', id: 1, isFruit: false },
  { title: 'Garlic', id: 2, isFruit: false},
  { title: 'Apple', id: 3, isFruit: true }
]
const Product = () => (
  <ul>
    { products.map(product => (
      <li key={product.id} style={{
        color: product.isFruit ? 'red' : 'green'
      }}>{product.title}</li>
    ))}
  </ul>
)

const Counter = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count => {
      console.log('prev', count)
      return count+1
    })
  }
  return (
    <button onClick={handleClick}>{count}</button>
  )
}

// hook
const useMousePosition = () => {
  const [position, setPosition] = useState({x: 0, y: 0})
  const listen_mousemove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    })
  }
  useEffect(() => {
    document.addEventListener('mousemove', listen_mousemove, false)
    return () => {
      document.removeEventListener('mousemove', listen_mousemove, false)
    }
  }, [])
  return position
}

const Position = () => {
  const {x, y} = useMousePosition()
  return (<div>{x} - {y}</div>)
}

const App = () => {
  return (
    <React.Fragment>
      <Greeting name={'Kyrie'}/>
      <Button/>
      <Avatar/>
      <Profile/>
      <Condition login={true}/>
      <Condition login={false}/>
      <Product/>
      <Counter/>
      <Position/>
    </React.Fragment>
  )
}
ReactDOM.createRoot(document.getElementById('quick-start')).render(<App/>)
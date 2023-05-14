const Counter = (props) => {
  return (<button onClick={props.handleClick}>click {props.count} times</button>)
}

const Person = ({ name = 'kyrie'} = {}) => {
  return <div>Hello, {name}</div>
}

const Card = ({children}) => (
  <div className='card'>{children}</div>
)

const App = () => {
  const [count, setCount] = useState(-1)
  const handleClick = (event) => {
    console.log('event', event, event.__proto__.constructor)
    console.log(event.nativeEvent)
    setCount(count => count+1)
  }
  return (
    <>
      <Counter count={count} handleClick={handleClick}/>
      <Counter count={count} handleClick={handleClick}/>
      <Person name='irving'/>
      <Person/>
      <Card><Person></Person></Card>
    </>
  )
}

ReactDOM.createRoot(document.querySelector('#props-app')).render(<App/>)
const Input = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const firstNameChanged = (event) => {
    // console.log(event.target.value)
    setFirstName(event.target.value)
  }
  const lastNameChanged = (event) => {
    // console.log(event.target.value)
    setLastName(event.target.value)
  }
  const fullName = () => {
    if (firstName || lastName)return `${firstName}-${lastName}`
    return ''
  }
  return (
    <div>
      <div>{fullName()}</div>
      <input type='text' value={firstName} onChange={firstNameChanged}/>
      <input type='text' value={lastName} onChange={lastNameChanged}/>
    </div>
  )
}
const playerList = [
  { id: 1, name: 'lebron' },
  { id: 2, name: 'kyrie' },
  { id: 3, name: 'durant' }
]
const Select = () => {
  const [player, setPlayer] = useState(1)
  const playerChanged = (e) => {
    setPlayer(e.target.value)
  }
  return (
    <div>
      <select value={player} onChange={playerChanged}>
        <option value={0}>player</option>
        { playerList.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
      </select>
    </div>
  )
}

const sexList = [
  { id: 1, value: 1 },
  { id: 2, value: 2 }
]
const Radio = () => {
  const [sex, setSex] = useState(2)
  const handleChange = (event) => {
    setSex(event.target.value)
  }
  return (
    <div>
{/*       <input type="radio" onChange={handleChange} name='sex' value={1}/>
      <input type="radio" onChange={handleChange} name='sex' value={2}/> */}
      {
        sexList.map(s => (<input name='sex' value={s.value} key={s.value} onChange={handleChange} checked={sex}/>))
      }
    </div>
  )
}
// class组件
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  // 不可变值
/*   handleClick = () => {
    this.setState(state => ({
      count: state.count+1
    }))
    console.log(this.state.count)
  } */
/*   handleClick = () => {
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      })
      console.log(this.state.count)
    }, 0)
  } */
/*   handleClick = () => {
    // 合并
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
  } */
  // 不会合并
  handleClick = () => {
    this.setState(state => ({
      count: state.count + 1
    }))
    this.setState(state => ({
      count: state.count + 1
    }))
  }
  componentDidMount () {
/*     document.getElementById('form-app').addEventListener('click', () => {
      this.setState({
        count: this.state.count + 1
      })
      console.log(this.state.count)
    }, false) */
  }
  render() {
    return (
      <div><button onClick={this.handleClick}>{this.state.count}</button></div>
    )
  }
}

// 数组
class Color extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: ['red', 'blue', 'green'],
      count: 0
    }
  }
  addColor = () => {
/*     this.setState(state => ({
      colors: state.colors.concat('pink')
    }))
    this.setState(state => ({
      colors: state.colors.concat('pink')
    })) */
    // colors 和 count 更新合并
    this.setState({
      colors: this.state.colors.concat('pink')
    })
    this.setState({
      colors: this.state.colors.concat('pink')
    })
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <>
        <button onClick={this.addColor}>color increment</button>
        <ul>
          { this.state.colors.map((c,i) => (<li key={c + i}>{c}</li>))}
        </ul>
      </>
    )
  }
}

const App = () => (
  <>
    <Input/>
    <Select/>
    <Radio/>
    <Counter/>
    <Color/>
  </>
)
ReactDOM.createRoot(document.getElementById('form-app')).render(<App/>)
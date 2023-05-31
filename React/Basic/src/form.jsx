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

// input type='radio'
const InputRadio = () => {
  const [sex, setSex] = useState('male')
  const handleToggle = (e) => {
    console.log(e.target.value)
    setSex(e.target.value)
  }
  return (
    <>
      <label>
        男:
        <input type="radio" value='male' checked={sex === 'male'} onChange={handleToggle}/>
      </label>
      <label>
        女:
        <input type="radio" value='female' checked={sex === 'female'} onChange={handleToggle}/>
      </label>
    </>
  )
}
const playersList = [
  { id: 1, value: 'James'}, { id: 2, value: 'Durant'},
  { id: 3, value: 'Kyrie'}, { id: 4, value: 'Wade' }
]
const InputCheckbox = () => {
  const [player, setPlayer] = useState([])
  const handleToggle = (p, e) => {
    const idx = player.indexOf(p.id)
    if (idx === -1) {
      setPlayer(player.concat(p.id))
    } else {
      setPlayer([...player.slice(0, idx), ...player.slice(idx+1)])
    }
  }
  return (
    <>
    {playersList.map(p => (
      <label key={p.id}>
        {p.value}
        <input type="checkbox" value={p.id} checked={player.indexOf(p.id) !== -1} onChange={(e) => handleToggle(p, e)}/>
      </label>
    ))}
    </>
  )
}

// ------------- select -----------------
const cityList = [
  { id: 1, value: '北京' },
  { id: 2, value: '上海' },
  { id: 3, value: '深圳' }
]
const CitySelect = () => {
  const [city, setCity] = useState(1)
  const [area, setArea] = useState([])
  const handleChange = (e) => {
    setCity(e.target.value)
  }
  //多选
  const handleSelectMultiple = (e) => {
    const cityId = e.target.value
    const idx = area.indexOf(cityId)
    console.log('idx', idx)
    if (idx === -1) {
      setArea(area.concat(cityId))
    } else {
      setArea(area.filter(id => id !== cityId))
    }
  }
  return (
    <>
      <select value={city} onChange={handleChange}>
        {cityList.map(c => (<option value={c.id} key={c.id}>{c.value}</option>))}
      </select>
      <select multiple={true} value={area} onChange={handleSelectMultiple}>
        {cityList.map(c => (<option value={c.id} key={c.id}>{c.value}</option>))}
      </select>
    </>
  )
}

// ---------------------------- 非受控组件 ---------------------------------
const UnControlForm = () => {
  const handleInput = (e) => {
    console.log(e.target.value)
  }
  const handleToggleChecked = (e) => {
    console.log(e.target.checked)
  }
  return (
    <div>
      <input
        type='text'
        onChange={handleInput}
        placeholder='What next to do?'
        defaultValue={'hello world'}
      />
      <select defaultValue='lebron'>
        <option value="lebron">lebron</option>
        <option value="kyrie">kyrie</option>
        <option value="durant">durant</option>
      </select>
      <label>
        lebron:
        <input
          type="checkbox"
          value={'lebron'}
          defaultChecked={false}
          onChange={handleToggleChecked}
        />
      </label>
      <label>
        kyrie:
        <input type="checkbox" value={'kyrie'} defaultChecked={true}/>
      </label>
    </div>
  )
}
const App = () => (
  <>
    <Input/>
    <Select/>
    <Radio/>
    <Counter/>
    <Color/>
    <InputRadio/>
    <InputCheckbox/>
    <CitySelect/>
    <UnControlForm/>
  </>
)
ReactDOM.createRoot(document.getElementById('form-app')).render(<App/>)
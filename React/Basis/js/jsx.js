const { createRoot } = window.ReactDOM
const { useState, useEffect, useRef } = window.React
const jsx_app = createRoot(document.getElementById('jsx-app'))

// 事件
function Counter() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count+1)
  }
  return (
    <button onClick={handleClick}>{count}</button>
  )
}

const Toggle = () => {
  const [isToggle, setIsToggle] = useState(false)
  const handleToggle = () => {
    setIsToggle(isToggle => !isToggle)
  }
  return (
    <button onClick={handleToggle}>{isToggle ? 'On' : 'Off'}</button>
  )
}


function Player({firstName, lastName}) {
  return (
    <div>{firstName} {lastName}</div>
  )
}
// 自动展开数组
const players = ['kyrie', 'lebron', 'durant']
function PlayerList() {
  return (
    <div>{players}</div>
  )
}
// 三元运算
function ExpressComponent () {
  const [flag, setFlag] = useState(false)
  const handleClick = () => {
    setFlag(flag => !flag)
  }
  return (
    <button onClick={handleClick}>{flag ? 'hello' : 'world'}</button>
  )
}

// for循环 和向函数传递参数
function Players() {
  const players = [
    {
      firstName: 'kyrie',
      lastName: 'irving'
    },
    {
      firstName: 'lebron',
      lastName: 'james'
    },
    {
      firstName: 'kevin',
      lastName: 'durant'
    }
  ]
  const handleClick = (player) => {
    console.log(player)
  }
  return (
    <ul>
      {
        players.length > 0 && players.map(p => (
          <li key={p.firstName} onClick={handleClick.bind(null, p)}>{p.firstName} - {p.lastName}</li>
        ))
      }
    </ul>
  )
}
// key 只是在兄弟节点之间是独一无二的,不需要是全局唯一的
function Blog(props) {
  const sidebar = (
    <ul>
      {
        props.posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))
      }
    </ul>
  )
  const content = (
    <ul>
      {
        props.posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      }
    </ul>
  )
  return (
    <div>
      {sidebar}
      <hr/>
      {content}
    </div>
  )
}
const posts = [
  {
    id: 1,
    title: 'Hello World',
    content: 'Welcome to learning React'
  },
  {
    id: 2,
    title: 'Installation',
    content: 'You can install React from npm'
  }
]

function ConditionComponent(props) {
  const isLogin = props.isLogin
  if(isLogin) return (
    <div>Hello, Welcome back!</div>
  )
  return <div>Login in</div>
}
// 阻止组件渲染
function WarningBanner(props) {
  if(!props.warn) return null
  return (
    <div>Warning!</div>
  )
}

//  行内样式
const box_style = {
  width: '100px',
  height: '100px',
  textAlign: 'center',
  lineHeight: '100px',
  backgroundColor: 'skyblue'
}
function BoxComponent() {
  return (
    <div style={box_style}></div>
  )
}

// Props 以及默认值
function PropsComponent(props) {
  return (
    <div>我是传递了值: {props.username}</div>
  )
}
function DefaultPropsComponent(props) {
  return (
    <div>我是没有传递值: {props.username}</div>
  )
}
DefaultPropsComponent.defaultProps = {
  username: 'irving'
}

class ClassPropsComponent extends window.React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>{this.props.username}</div>
    )
  }
}
ClassPropsComponent.defaultProps = {
  username: 'hello, 我是默认值'
}

//  state
function FunctionClock () {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const timer = useRef(null)
  useEffect(() => {
    timer.current = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    },1000)
    return () => {
      clearInterval(timer.current)
    }
  }, [])
  return (
    <div>{time}</div>
  )
}

class ClassClock extends window.React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: new Date().toLocaleTimeString()
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(state => ({
        time: new Date().toLocaleTimeString()
      }))
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    return (
      <div>{this.state.time}</div>
    )
  }
}

//  生命周期函数
class LifeCycleComponent extends window.React.Component {
  constructor(props) {
    super(props)
    console.log('constructor')
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate',nextProps, nextState)
    return true
  }
  componentDidUpdate(prevProps, prevState, snap) {
    console.log('componentDidUpdate',prevProps, prevState, snap)
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate', prevProps, prevState)
    return 'hello' // componentDidUpdate 的第三个参数
  }
  handleClick = () => {
    this.setState(state => ({
      count: state.count + 1
    }))
  }
  render() {
    console.log('render')
    return (
      <div>
        <button onClick={this.handleClick}>{this.state.count}</button>
      </div>
    )
  }
}
/*
---- 初始渲染 ---
constructor -> render -> componentDidMount
----- 更新 -----
shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate
*/

//  表单
// ---- 受控组件 ------
class FormControlledClassComponent extends window.React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      player: 'kyrie',
      content: ''
    }
  }
  onUserChanged = (event) => {
    this.setState(state => ({
      username: event.target.value.trim()
    }))
  }
  handleSubmit = () => {
    console.log(this.state.username, this.state.player, this.state.content)
  }
  onPlayerChanged = (event) => {
    this.setState(state => ({
      player: event.target.value
    }))
  }
  onContentChanged = (event) => {
    this.setState(state => ({
      content: event.target.value.trim()
    }))
  }
  render() {
    return (
      <div>
        <input type='text' value={this.state.username} onChange={this.onUserChanged}/>
        <select value={this.state.player} onChange={this.onPlayerChanged}>
          <option value='kyrie'>kyrie</option>
          <option value='durant'>durant</option>
          <option value='lebron'>lebron</option>
        </select>
        <textarea value={this.state.content} onChange={this.onContentChanged} placeholder='content...'></textarea>
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    )
  }
}
//  非受控组件 defaultValue 作为初始值
// 在React中, input[type='file'] 始终是一个非受控组件
class UnControlledForm extends window.React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'hello'
    }
    this.inputRef = window.React.createRef()
  }
  handleSubmit = () => {
    const value = this.inputRef.current.value.trim()
    console.log('value', value)
  }
  render() {
    return (
      <div>
        <input defaultValue={this.state.value} ref={this.inputRef}/>
        <input type='submit' onClick={this.handleSubmit}/>
      </div>
    )
  }
}
jsx_app.render(
  <div>
    <h3>JSX</h3>
    <Counter/>
    <Toggle/>
    <Player {...{firstName:'kyrie', lastName:'irving'}}/>
    <PlayerList/>
    <ExpressComponent/>
    <Players/>
    <ConditionComponent isLogin={false}/>
    <ConditionComponent isLogin={true}/>
    <WarningBanner/>
    <WarningBanner warn={true}/>
    <BoxComponent/>
    <PropsComponent username={'kyrie'}/>
    <DefaultPropsComponent/>
    <ClassPropsComponent/>
    <ClassPropsComponent username={'lebron'}/>
    <FunctionClock/>
    <ClassClock/>
    <LifeCycleComponent/>
    <Blog posts={posts}/>
    <FormControlledClassComponent/>
    <UnControlledForm/>
  </div>
)

// 组件设计模式------------- 高阶组件 ------------
// 高阶组件 一般都带 with 前缀
const withCounter = (Component) => {
  return class Counter extends React.Component {
    constructor() {
      super(...arguments)
      this.state = {
        count: 0
      }
    }
    handleIncrement = () => {
      this.setState(state => ({
        count: state.count + 1
      }))
    }
    handleDecrement = () => {
      this.setState(state => ({
        count: state.count - 1
      }))
    }
    render() {
      return (
        <Component
        count={this.state.count}
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}
        />
      )
    }
  }
}

// ----------- 高阶组件避免重复产生React组件 ------------------
class Counter extends React.Component {
  render () {
    const { handleIncrement, handleDecrement, count } = this.props
    return (
      <div>
        <button onClick={handleIncrement}>+</button>
        <button>{count}</button>
        <button onClick={handleDecrement}>-</button>
      </div>
    )
  }
}

const Counter1 = withCounter(Counter)
const Counter2 = withCounter(Counter)
const Counter3 = withCounter(Counter)

const CounterApp = () => (
  <>
    <Counter1/>
    <Counter2/>
    <Counter3/>
  </>
)

// ---------------------- 高阶组件传递两个组件 -------------------------------
const withLogButton = (ComponentLogin, ComponentLogout) => {
  return class Button extends React.Component {
    render () {
      const { isLogin } = this.props
      if (isLogin) return <ComponentLogout/>
      return <ComponentLogin/>
    }
  }
}
const LoginButton = () => (<button>Login</button>)
const LogoutButton = () => (<button>Logout</button>)

const Login = withLogButton(LoginButton, LogoutButton)


// ---------- 高阶组件 不会获取 被包裹组件的 静态方法 -----------------------
const withInput = (Component) => {
  class Input extends React.Component {
    constructor() {
      super(...arguments)
      this.state = {
        value: ''
      }
    }
    handleValueChanged = (event) => {
      this.setState({
        value: event.target.value.trim()
      })
    }
    render() {
      return (
        <>
          <Component value={this.state.value} onChange={this.handleValueChanged}/>
        </>
      )
    }
  }
  /**
   * 需要明确知道复制哪个静态方法。
   * 
  */
  // Input.say = Component.say
  return Input
}

const PlayerInput = withInput(class FirstNameInput extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      message: 'hello'
    }
  }
  static say = () => {
    console.log('我是静态方法', this)
  }
  render() {
    const { value, onChange } = this.props
    return (
      <input type='text' value={value} onChange={onChange}/>
    )
  }
})
console.log(PlayerInput.say)  // undefined

createRoot(document.getElementById('high-order-app'))
.render(
  <>
    <CounterApp/>
    <Login isLogin={false}/>
    <Login isLogin={true}/>
    <PlayerInput/>
  </>
)


class Player {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  // 静态方法 this 都指向自身
  static say () {
    console.log('this', this)
  }
  static fullName = () => {
    console.log(this)
  }
  // 通过new出来的对象调用都指向 对象
  say () {
    console.log('say:', this)
    return `${this.firstName} - ${this.lastName}`
  }
  sayFullName = () => {
    console.log('sayFullName:', this)
    return `${this.firstName} - ${this.lastName}`
  }
}
const player = new Player('kyrie', 'irving')
console.log(player.say()) // kyrie - irving
console.log(player.sayFullName()) // kyrie - irving

Player.say()
Player.fullName()
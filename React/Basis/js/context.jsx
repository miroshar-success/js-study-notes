const { useEffect, useState } = window.React
const { createRoot } = window.ReactDOM
const root = createRoot(document.getElementById('context-app'))
const ThemeContext = window.React.createContext('light') // light 作为默认值

class ClassContextComponent extends window.React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ThemeContext.Provider value={'dark'}>
        <ThemeButtonComponent/>
      </ThemeContext.Provider>
    )
  }
}

class ThemeButtonComponent extends window.React.Component {
  static contextType = ThemeContext
  render() {
    return (
      <button>{this.context}</button>
    )
  }
}

const CounterContext = window.React.createContext(0)
class ContextCounter extends window.React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  handleClick = () => {
    this.setState(state => ({
      count: state.count+=1
    }))
  }
  render() {
    return (
      <CounterContext.Provider value={this.state.count}>
        <ClassCounter/>
        <FunctionCounter/>
        <button onClick={this.handleClick}>{this.state.count}</button>
      </CounterContext.Provider>
    )
  }
}
class ClassCounter extends window.React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'hello'
    }
  }
  // shouldComponent 不受限制 (此时没有执行)
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    return false
  }
  static contextType = CounterContext
  render() {
    return (
      <div>{this.state.name} - {this.context}</div>
    )
  }
}

// 函数组件
function FunctionCounter() {
  return (
    <CounterContext.Consumer>
      {value => (<div>函数组件: {value}</div>)}
    </CounterContext.Consumer>
  )
}

// 动态 context
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
}
const ButtonContext = window.React.createContext(themes.dark)
class ButtonApp extends window.React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: themes.dark
    }
  }
  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark
        ? themes.light
        : themes.dark
    }))
  }
  render() {
    return (
      <ButtonContext.Provider value={this.state.theme}>
        <ButtonComponent/>
        <button onClick={this.toggleTheme}>toggle</button>
      </ButtonContext.Provider>
    )
  }
}
class ButtonComponent extends window.React.Component {
  constructor(props) {
    super(props)
  }
  static contextType = ButtonContext
  render() {
    return (
      <div style={{
        background: this.context.background,
        color: this.context.foreground,
        width: '100px',
        height: '100px',
        textAlign: 'center'
      }}>Hello World</div>
    )
  }
}


// ------- 在子组件更新context -------
const ToggleContext = window.React.createContext({
  theme: themes.light,
  toggle: () => {}
})

class ButtonClassComponent extends window.React.Component {
  constructor() {
    super(...arguments)
    this.toggle = () => {
      this.setState(state => ({
        theme: this.state.theme == themes.light
          ? themes.dark
          : themes.light
      }))
    }
    this.state = {
      theme: themes.light,
      toggle: this.toggle
    }
  }
  render() {
    return (
      <ToggleContext.Provider value={this.state}>
        <ButtonToggleComponent/>
        <ButtonToggleFunction/>
      </ToggleContext.Provider>
    )
  }
}
class ButtonToggleComponent extends window.React.Component {
  constructor(props) {
    super(props)
  }
  static contextType = ToggleContext
  render(){
    return <button style={{
      background: this.context.theme.background,
      color: this.context.theme.foreground
    }} onClick={this.context.toggle}>click</button>
  }
}

function ButtonToggleFunction() {
  return (
    <ToggleContext.Consumer>
      {({theme, toggle}) => (
        <button onClick={toggle} style={{
          background: theme.background,
          color: theme.foreground
        }}>toggle</button>
      )}
    </ToggleContext.Consumer>
  )
}

root.render(
  <div>
    <ClassContextComponent/>
    <ContextCounter/>
    <ButtonApp/>
    <ButtonClassComponent/>
  </div>
)

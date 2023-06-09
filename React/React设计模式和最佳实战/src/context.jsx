const ThemeContext = React.createContext('light')
// class 组件
class ClassButton extends React.Component {
  constructor() {
    super(...arguments)
  }
  static contextType = ThemeContext
  render() {
    console.log('context',this.context)
    return (
      <button>class button {this.context}</button>
    )
  }
}

const FunctionButton = () => {
  return (
    <ThemeContext.Consumer>{(value) => <button>function button {value}</button>}</ThemeContext.Consumer>
  )
}

const HookButton = () => {
  const context = useContext(ThemeContext)
  return (
    <button>hook context {context}</button>
  )
}

class ControlButton extends React.Component {
  constructor() {
    super(...arguments)
  }
  render() {
    return (
      <ThemeContext.Provider value={'light'}>
        <ClassButton/>
        <FunctionButton/>
        <HookButton/>
      </ThemeContext.Provider>
    )
  }
}

const App = () => (
  <ControlButton/>
)

createRoot(document.getElementById('context-root'))
.render(
  <App/>
)
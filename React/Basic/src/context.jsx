const theme = {
  light: {
    backgroundColor: 'white',
    color: '#000'
  },
  dark: {
    backgroundColor: '#000',
    color: '#fff'
  }
}
const ThemeContext = React.createContext('light')

// --------- 函数组件使用 context -----------
const FunctionButton = () => (
  <ThemeContext.Consumer>
    { value => <button>theme is {value}</button>}
  </ThemeContext.Consumer>
)

// -------- class 组件使用 context --------
class ClassButton extends React.Component {
  constructor(props) {
    super(props)
  }
  static contextType = ThemeContext
  render() {
    const theme = this.context
    return (
      <button>{theme}</button>
    )
  }
}
// ClassButton.contextType = ThemeContext
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'light'
    }
  }
  handleToggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === 'light'
        ? 'dark' : 'light'
    }))
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <button onClick={this.handleToggleTheme}>toggle theme</button>
        <FunctionButton/>
        <ClassButton/>
      </ThemeContext.Provider>
    )
  }
}

// context传递事件
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  }
}

const ButtonThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {}
})
const ThemeButton = () => {
  return (
    <ButtonThemeContext.Consumer>{({theme, toggleTheme}) => (
      <button onClick={toggleTheme} style={{backgroundColor: theme.background, color: theme.foreground}}>toggle theme234</button>
    )}</ButtonThemeContext.Consumer>
  )
}

const ContextApp = () => {
  const [theme, setTheme] = useState(themes.dark)
  const toggleTheme = () => {
    setTheme(state => {
      const theme = state === themes.light ? themes.dark : themes.light
      return theme
    })
  }
  return (
    <ButtonThemeContext.Provider value={{theme, toggleTheme}}>
      <ThemeButton/>
    </ButtonThemeContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('context-app')).render(
  <>
    <App/>
    <ContextApp/>
  </>
)
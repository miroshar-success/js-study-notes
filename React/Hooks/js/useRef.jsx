// --------- ref ----------
const Counter = () => {
  const [count, setCount] = useState(0)
  const buttonRef = useRef(null)
  const handleClick = () => {
    console.log(buttonRef.current)
    setCount(count => count+1)
  }
  return (
    <button ref={buttonRef} onClick={handleClick}>click {count} times</button>
  )
}

// ------------ context -----------
const ThemeContext = React.createContext('light')

const LightButton = () => {
  return <ThemeContext.Consumer>{value => (<button>button {value}</button>)}</ThemeContext.Consumer>
}
const DarkButton = () => {
  const context = useContext(ThemeContext)
  return (
    <button>{context} button</button>
  )
}

const ThemeButton = () => {
  const [theme, setTheme] = useState('dark')
  const handleToggleTheme = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }
  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={handleToggleTheme}>toggle theme</button>
      <LightButton/>
      <DarkButton/>
    </ThemeContext.Provider>
  )
}

const App = () => (
  <>
    <Counter/>
    <hr />
    <ThemeButton/>
  </>
)

createRoot(document.getElementById('ref-app')).render(
  <App/>
)
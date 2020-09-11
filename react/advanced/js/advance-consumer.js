const ThemeContext = React.createContext('consumer');
class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value='dark'>
                <ThemeButton/>
            </ThemeContext.Provider>
        )
    }
}

function ThemeButton () {
    return (
        <div>
            <MyButton/>
        </div>
    )
}

function MyButton(){
    return (
        <ThemeContext.Consumer>
            {value => <button>我是子组件:{value}</button>}
        </ThemeContext.Consumer>
    )
}


ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
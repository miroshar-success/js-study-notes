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

const PlayerContext = React.createContext();
PlayerContext.displayName = 'player';
class Kyrie extends React.Component{
    static contextType = PlayerContext;
    render() {
        return (
            <div>
                <p>firstName:{this.context}</p>
            </div>
        )
    }
}

class Player extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName:"kyrie"
        }
        console.log('constructor-this',this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(){
        this.setState({
            firstName:'lebron'
        })
    }
    render() {
        console.log('render-this:',this);
        return (
            <PlayerContext.Provider value={this.state.firstName}>
                <Kyrie/>
                <Irving/>
                <button onClick={this.handleChange}>change-name</button>
            </PlayerContext.Provider>
        );
    }
}

function Irving(){
    return (
        <div>
            <PlayerContext.Consumer>
                {context => <p>firstName:{context}</p>}
            </PlayerContext.Consumer>
        </div>
    )
}
// 动态context
const themes = {
    light:{
        foreground:"#000000",
        background:"#eeeeee"
    },
    dark:{
        foreground:"#ffffff",
        background:"#222222"
    }
}
const ColorTheme = React.createContext( themes.dark );
ColorTheme.displayName = 'theme';
class ThemedButton extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <button onClick={this.props.changeTheme}>
                Toggle Button
            </button>
        )
    }
}
ThemedButton.contextType = ColorTheme;

class TopHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            theme:themes.light
        }
        this.toggleTheme = this.toggleTheme.bind(this);
    }
    toggleTheme(){
        this.setState(state => ({
            theme: state.theme === themes.light
                    ? themes.dark
                    : themes.light
        }))
    }
    render(){
        return (
            <ColorTheme.Provider value={this.state.theme}>
                <Banner/>
                <Menu/>
                <ThemedButton changeTheme={this.toggleTheme}/>
            </ColorTheme.Provider>
        )
    }
}

class Banner extends React.Component {
    static contextType = ColorTheme;
    render(){
        return (
            <div>
                <p style={{background:this.context.background,color:"red"}}>Hello,World</p>
            </div>
        )
    }
}

function Menu () {
    return (
        <div>
            <ColorTheme.Consumer>
                {context => <p style={{background:context.background,color:'red'}}>Hello,Context</p>}
            </ColorTheme.Consumer>
        </div>
    )
}

ReactDOM.render(
    <TopHeader/>,
    document.getElementById("root")
)
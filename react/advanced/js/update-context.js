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
/*const ThemeContext = React.createContext(themes.dark)
ThemeContext.displayName = 'theme';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            theme:themes.dark
        }
        this.toggleTheme = this.toggleTheme.bind(this);
    }
    toggleTheme(){
        console.log('点击了');
        this.setState(state => ({
            theme: state.theme === themes.light
                ? themes.dark
                : themes.light
        }))
    }
    render(){
        return (
            <ThemeContext.Provider value={this.state.theme}>
                <ThemeButton changeTheme={this.toggleTheme}/>
            </ThemeContext.Provider>
        )
    }
}

class ThemeButton extends React.Component {
    static contextType = ThemeContext;
    render() {
        console.log(this.context);
        return (
            <button
                style={{background:this.context.background,color:"red"}}
                onClick={this.props.changeTheme}
            >change theme</button>
        )
    }
}*/

// 在嵌套组件中更新context
/*const ThemeContext = React.createContext({
    theme:themes.dark,
    toggleTheme:() => {}
});

class ThemeToggleButton extends React.Component {
    static contextType = ThemeContext;
    render() {
        console.log(this.context);
        const {toggleTheme,theme} = this.context;
        return (
            <button
                onClick={toggleTheme}
                style={{background:theme.background,color:"red"}}
            >我是Button-1</button>
        )
    }
}

function ThemedButton () {
    return (
        <ThemeContext.Consumer>
            {({theme,toggleTheme}) => (<button
                onClick={toggleTheme}
                style={{background:theme.background,color:"red"}}
            >我是Button-2</button>)}
        </ThemeContext.Consumer>
    )
}

function Content(){
    return (
        <div>
            <ThemeToggleButton/>
            <ThemedButton/>
        </div>
    )
}
class UpdateContext extends React.Component {
    constructor(props){
        super(props);
        this.toggleTheme = this.toggleTheme.bind(this);
        this.state = {
            theme:themes.dark,
            toggleTheme:this.toggleTheme
        }
    }
    toggleTheme(){
        this.setState(state => ({
            theme: state.theme === themes.dark ? themes.light : themes.dark
        }))
    }
    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                <Content/>
            </ThemeContext.Provider>
        );
    }
}*/


// 消费多个context
const ThemeContext = React.createContext("light");
const UserContext = React.createContext({name:"kyrie"})
ThemeContext.displayName = 'theme';
UserContext.displayName = 'user'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            theme:"skyblue",
            signedUser:{name:'kyrie'},
            count:0
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(state =>({
            count:state.count+=1
        }))
    }
    render(){
        console.log('app rerender');
        return (
            <div>
                <UserContext.Provider value={this.state.signedUser}>
                    <Layout/>
                </UserContext.Provider>
                <button onClick={this.handleClick}>click {this.state.count} times</button>
            </div>
        )
    }
}

class Layout extends React.Component {
    render() {
        return (
            <ProfilePage/>
        )
    }
}

function ProfilePage () {
    console.log('profile-page rerender');
    return (
        <div>
            <UserContext.Consumer>
                {user => (<p>{user.name}</p>)}
            </UserContext.Consumer>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
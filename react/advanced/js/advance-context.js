const ThemeContext = React.createContext("light");
class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value='dark'>
                <Toolbar/>
            </ThemeContext.Provider>
        )
    }
}

function Toolbar(){
    return (
        <div>
            <ThemeButton/>
        </div>
    )
}

class ThemeButton extends React.Component {
    static contextType = ThemeContext;
    render(){
        return <button theme={this.context}>Hello World!</button>
    }
}

const PlayerContext = React.createContext("kyrie");
class Player extends React.Component {
    render(){
        return (
            <PlayerContext.Provider value={'kyrie'}>
                <Basketball/>
            </PlayerContext.Provider>
        )
    }
}

class Basketball extends React.Component {
    static contextType = PlayerContext;
    render(){
        return (
            <div>name : {this.context}</div>
        )
    }
};

const ParentTheme = React.createContext();

class Parent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'hello,world'
        }
        this.handleChangeText = this.handleChangeText.bind(this);
    }
    handleChangeText(){
        this.setState({
            name:"hello,react!"
        })
    }
    render() {
        return (
            <ParentTheme.Provider value={this.state.name}>
                <Son/>
                <Child/>
                <button onClick={this.handleChangeText}>change value</button>
            </ParentTheme.Provider>
        )
    }
}

class Son extends React.Component {
    componentDidMount(){
        let value = this.context;
        console.log('componentDidMount:',value);
    }
    componentDidUpdate(){
        let value = this.context;
        console.log('componentDidUpdate:',value);
    }
    componentWillUnmount(){
        let value = this.context;
        console.log('componentWillUnmount',value);
    }
    static contextType = ParentTheme;
    render(){
        console.log('render:',this.context);
        return (
            <div>
                <p>content:{this.context}</p>
            </div>
        )
    }
}

class Child extends React.Component {
    static contextType = ParentTheme;
    render() {
        console.log(this);
        return (
            <div>child:{this.context}</div>
        )
    }
}


ReactDOM.render(
    <Parent/>,
    document.getElementById("root")
)
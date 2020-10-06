const themes = {
    light:{
        foreground:"#FFFFCC",
        background:"#CCFFFF"
    },
    dark:{
        foreground:"#FFCC99",
        background:"#FFCCCC"
    }
}
const ThemeContext = React.createContext(themes.light);

class TopNav extends React.Component {
    static contextType = ThemeContext
    componentDidMount(){
        console.log('class-component:',this.context);
    }
    render(){
        console.log('render-function:',this.context);
        return (
            <div>
                <p>Top-Nav</p>
                <div style={{
                    width:"100px",
                    height:"100px",
                    backgroundColor:this.context.background
                }}>top-nav</div>
            </div>
        )
    }
}

function SlideBar(){
    const context = React.useContext(ThemeContext);
    console.log('slide-bar:',context);
    return (
        <div
            style={{
                width:'100px',
                height:'100px',
                backgroundColor:context.foreground
            }}
        >
            <p>Slide-Bar</p>
        </div>
    )
}

function ThemeButton(){
    return (
        <div>
            <ThemeContext.Consumer>
                {value => (
                    <div style={{
                        width:'100px',
                        height:'100px',
                        backgroundColor:value.background,
                        color:'red',
                        textAlign:'center',
                        fontSize:'12px',
                        lineHeight:'100px'
                    }}>
                        theme-button
                    </div>
                )}
            </ThemeContext.Consumer>
        </div>
    )
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            theme:themes.light
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle(){
        this.setState(state => ({
            theme: state.theme == themes.light
                ? themes.dark
                : themes.light
        }))
    }
    render(){
        return (
            <div>
                <ThemeContext.Provider value={this.state.theme}>
                    <TopNav/>
                    <SlideBar/>
                    <ThemeButton/>
                </ThemeContext.Provider>
                <button onClick={this.handleToggle}>toggle</button>
            </div>
        )
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
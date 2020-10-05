const {
    BrowserRouter,
    Route,
    NavLink,
    Switch
} = window.ReactRouterDOM;

function Home(){
    return (
        <p>This is Home Page</p>
    )
}

function Profile(){
    return (
        <p>This is Profile Page</p>
    )
}

class Counter extends React.Component {
    constructor(props){
        super(props)
        this.state = {count:0}
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(state => ({
            count:state.count+1
        }))
    }
    componentDidMount(){
        console.log('counter-componentDidMount');
    }
    componentWillUnmount(){
        console.log('counter-componentWillUnmount');
    }
    render(){
        console.log('counter-props:',this.props);
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.handleClick}>click</button>
            </div>
        )
    }
}

const linkStyle = {
    padding:"0 10px;"
}

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="nav">
                    <NavLink to={'/home'} >Home</NavLink>
                    <NavLink to={'/profile'}>Profile</NavLink>
                    <NavLink to={'/about'}>Counter</NavLink>
                </div>
                <Switch>
                    <Route path={'/home'} component={Home}/>
                    <Route path={'/profile'} component={Profile}/>
                    {/*<Route path={'/counter'} component={Counter}/>*/}
                    {/*<Route path={'/counter'} render={({match}) => <Counter {...match}/>}/>*/}
                    {/*<Route path={'/counter'} children={() => <Counter/>}/>*/}
                    <Route path={'/about'} render={() => {
                        return (
                            <button>+</button>
                        )
                    }}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById("root")
)

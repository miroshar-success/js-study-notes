const {BrowserRouter,Link,Route,Switch} = window.ReactRouterDOM;

function Home(){
    return (
        <div>
            <p>This is Home Page</p>
        </div>
    )
}

function Profile(){
    return (
        <div>
            <p>This is Profile Page</p>
        </div>
    )
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {fresh:false}
        this.handleRefresh = this.handleRefresh.bind(this);
    }
    handleRefresh(){
        this.setState({
            fresh:true
        })
    }
    render() {
        return (
            <BrowserRouter
                basename={'/calendar'}
                forceRefresh={this.state.fresh}
                getUserConfirmation={(message,callback) => {
                    const allowTransition = window.confirm(message);
                    console.log(allowTransition);
                    callback(callback);
                }}
            >
                <ul>
                    <li><Link to={'/home'}>Home</Link></li>
                    <li><Link to={'/profile'}>Profile</Link></li>
                </ul>
                <button onClick={this.handleRefresh}>refresh</button>
                <Switch>
                    <Route path={'/home'} component={Home}/>
                    <Route path={'/profile'} component={Profile}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)


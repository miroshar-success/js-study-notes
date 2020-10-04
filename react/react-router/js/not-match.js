const {BrowserRouter,Route,Link,Switch,Redirect,useLocation} = window.ReactRouterDOM;

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/old-match'}>Old Match,to be redirected</Link></li>
                    <li><Link to={'/will-match'}>Will Match</Link></li>
                    <li><Link to={'/will-not-match'}>Will Not Match</Link></li>
                    <li><Link to={'/also/will/not/match'}>Also Will Not Match</Link></li>
                </ul>
                <Switch>
                    <Route path={'/'} exact component={Home}/>
                    <Route path={'/old-match'}>
                        <Redirect to={'/will-match'}/>
                    </Route>
                    <Route path={'/will-match'} component={WillMatch}/>
                    <Route path={'*'} component={NotMatch}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
function Home(){
    return (
        <p>This is a home page</p>
    )
}
function NotMatch(){
    const location = useLocation();
    console.log('location:',location);
    return (
        <p>{`Sorry,not found ${location.pathname}`}</p>
    )
}

function WillMatch(){
    return (
        <p>Matched</p>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
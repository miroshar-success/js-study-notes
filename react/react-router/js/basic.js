const {BrowserRouter,Route,Link,Switch} = window.ReactRouterDOM;

function Home(){
    return (
        <p>This is home page</p>
    )
}
function About(){
    return (
        <p>This is about page</p>
    )
}
function Player(){
    return(
        <p>This is player page</p>
    )
}

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/player'>Player</Link></li>
                </ul>
                <hr/>
                <Switch>
                    <Route exact path='/'><Home/></Route>
                    <Route path='/about'><About/></Route>
                    <Route path='/player'><Player/></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
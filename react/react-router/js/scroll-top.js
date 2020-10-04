const {BrowserRouter,Route,Link,Switch,useLocation} = window.ReactRouterDOM;

function ScrollToTop(){
    const {pathname} = useLocation();
    console.log('pathname:',pathname);
    React.useEffect(() => {
        console.log('scroll-to-top');
        window.scrollTo(0,0);
    },[pathname]);
    return null;
}

function Home(){
    return (
        <div>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <li><Link to={'/profile'}>Profile</Link></li>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>
            <p>This is home page</p>

        </div>
    )
}
function Profile(){
    return (
        <div>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <li><Link to={'/home'}>Home</Link></li>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
            <p>This is Profile Page</p>
        </div>
    )
}

class App extends React.Component {
    render(){
        return (
            <div>
                <ul>
                    <li><Link to={'/home'}>Home</Link></li>
                    <li><Link to={'/profile'}>Profile</Link></li>
                </ul>
                <Switch>
                    <Route path={'/home'} component={Home}/>
                    <Route path={'/profile'} component={Profile}/>
                </Switch>
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <ScrollToTop/>
        <App/>
    </BrowserRouter>,
    document.getElementById("root")
)
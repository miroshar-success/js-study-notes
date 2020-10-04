const {
    BrowserRouter,
    Switch,
    Link,
    Route,
    useRouteMatch
} = window.ReactRouterDOM;

function Home(){
    const match = useRouteMatch();
    // console.log('home-useRouteMatch:',match);
    return (
        <p>This is a Home Page</p>
    )
}
function Profile(){
    const match = useRouteMatch();
    // console.log('profile-useRouteMatch:',match);
    return (
        <p>This is a About Page</p>
    )
}

function OldSchoolMenuLink({label,to,activeOnlyWhenExact}){
/*    let match = useRouteMatch({
        path:to,
        exact:activeOnlyWhenExact
    });*/
    const match = useRouteMatch({
        path:to,
        exact:activeOnlyWhenExact
    });
    console.log('custom-link:',match,activeOnlyWhenExact);
    return (
        <div className={match ? 'active' : ""}>
            { match && '> '}
            <Link to={to}>{label}</Link>
        </div>
    )
}

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <ul>
                    <li><OldSchoolMenuLink label={'Home'} to={'/home'} activeOnlyWhenExact={true}/></li>
                    <li><OldSchoolMenuLink label={'About'} to={'/profile'}/></li>
                </ul>
                <Switch>
                    <Route exact path={'/home'} component={Home}/>
                    <Route path={'/profile'} component={Profile}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
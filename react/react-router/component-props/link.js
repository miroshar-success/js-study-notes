const {BrowserRouter,Link,NavLink,Route,Switch,useRouteMatch} = window.ReactRouterDOM;

/*The useRouteMatch hook attempts to match the current URL in the same way tha a <Route> would.*/

function CustomLink(props){
    const match = useRouteMatch({
        path:props.to,
    });
    console.log('match:',match);
    return (
        <React.Fragment>
            {match ? '> ' : ""}
            <Link
                to={props.to}
                className={match? 'active' : ""}
            >{props.children}</Link>
        </React.Fragment>
    )
}

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                {/*                <ul>
                    <li><Link to={'/home'}>Home</Link></li>
                    <li>
                        <Link to={'/profile'}>Profile</Link>
                        <Link
                            to={{
                                pathname:'/profile',
                                search:"?sort=name",
                                hash:"#the-hash",
                                state:{fromDashboard:true}
                            }}
                            replace={true}
                        >Profile</Link>
                        <Link
                            to={location => ({...location,pathname:'/profile'})}
                            title={'profile'}
                            className={'profile'}
                        >Profile</Link>
                        <Link to={'/profile'}>Profile</Link>
                    </li>
                </ul>*/}
                <ul>
                    <li><CustomLink to={'/home'}>Home</CustomLink></li>
                    <li><CustomLink to={'/profile'}>Profile</CustomLink></li>
                </ul>
                <ul>
                    <li><NavLink to={'/home'} activeClassName={"selected"}>Home</NavLink></li>
                    <li><NavLink
                        to={'/profile'}
                        activeStyle={{
                            fontWeight:"bold",
                            color:'red'
                        }}
                        isActive={(match,location) => {
                            console.log('match:',match,'location:',location)
                        }}
                    >Profile</NavLink></li>
                </ul>
                <Switch>
                    <Route path={'/home'} component={Home}/>
                    <Route path={'/profile'} component={Profile}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

function Home(){
    return (
        <div>Home Page</div>
    )
}

function Profile(){
    return (
        <div>Profile Page</div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
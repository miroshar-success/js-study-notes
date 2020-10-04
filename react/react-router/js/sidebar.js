const {BrowserRouter,Switch,Route,Link} = window.ReactRouterDOM;

const routes = [
    {
        path:'/home',
        extract:true,
        sidebar:() => <div>This is Home Page</div>,
        main:() => <div>This is Home Page</div>
    },
    {
        path:'/profile',
        sidebar:() => <div>This is Profile Page</div>,
        main:() => <div>This is Profile Page</div>
    },
    {
        path:"/about",
        sidebar:() => <div>This is About Page</div>,
        main:() => <div>This is Main Page</div>
    }
]

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div
                    style={{display:'flex'}}
                >
                    <div
                        style={{
                            padding:'10px',
                            width:'30%',
                            backgroundColor:"#f0f0f0"
                        }}
                    >
                        <ul style={{listStyle:"none",padding:'0'}}>
                            <li><Link to={'/home'}>Home</Link></li>
                            <li><Link to={'/profile'}>Profile</Link></li>
                            <li><Link to={'/about'}>About</Link></li>
                        </ul>
                        <Switch>
                            {routes.map((route,index) =>
                                <Route
                                    key={index}
                                    component={route.sidebar}
                                    exact={route.exact}
                                    path={route.path}
                                />
                            )}
                        </Switch>
                    </div>
                    <div style={{flex:1,padding:'10px'}}>
                        <Switch>
                            {routes.map((route,index) =>
                                <Route
                                    key={index}
                                    component={route.sidebar}
                                    exact={route.exact}
                                    path={route.path}
                                />
                            )}
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)


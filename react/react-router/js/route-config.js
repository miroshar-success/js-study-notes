const {BrowserRouter,Route,Link,Switch} = window.ReactRouterDOM;

const routes = [
    {
        path:'/mac',
        component:Mac,
        routes:[
            {
                path:'/mac/mac-book',
                component:MacBook
            },
            {
                path:'/mac/mac-pro',
                component:MacAir
            }
        ]
    },
    {
        path:'/phone',
        component:Phone,
        routes:[
            {
                path:'/phone/11',
                component:iPhone11
            },
            {
                path:'/phone/pro',
                component:iPhonePro
            }
        ]
    }
]

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to={'/mac'}>Mac</Link></li>
                    <li><Link to={'/phone'}>Phone</Link></li>
                </ul>
                <Switch>
                    {routes.map((route,index) =>
                        <Route key={index} path={route.path}>
                            <route.component {...route}/>
                        </Route>
                    )}
                </Switch>
            </BrowserRouter>
        )
    }
}
function Mac({routes}){
    console.log('mac-routes:',routes);
    return (
        <div>
            <p>This is Mac Page</p>
            <ul>
                <li><Link to={'/mac/mac-book'}>Mac-Book</Link></li>
                <li><Link to={'/mac/mac-pro'}>Mac-Pro</Link></li>
            </ul>
            <Switch>
                {routes.map((route,index) =>
                    <Route key={index} path={route.path}>
                        <route.component/>
                    </Route>
                )}
            </Switch>
        </div>
    )
}
function MacBook(){
    return (
        <p>This is MacBook Page</p>
    )
}
function MacAir(){
    return (
        <p>This is MacAir Page</p>
    )
}

function Phone({routes}){
    console.log('phone-routes:',routes);
    return (
        <div>
            <p>This is Phone Page</p>
            <ul>
                <li><Link to={'/phone/11'}>iPhone11</Link></li>
                <li><Link to={'/phone/pro'}>iPhonePro</Link></li>
            </ul>
            <Switch>
                {routes.map((route,index) =>
                    <Route key={index} path={route.path}>
                        <route.component/>
                    </Route>
                )}
            </Switch>
        </div>
    )
}

function iPhone11(){
    return (
        <p>This is iPhone 11 Page</p>
    )
}

function iPhonePro(){
    return (
        <p>This is iPhonePro Page</p>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)




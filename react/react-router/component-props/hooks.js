const {
    useHistory,
    BrowserRouter,
    Route,
    Link,
    Switch,
    useLocation,
    useParams,
    useRouteMatch
} = window.ReactRouterDOM;

class App extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to={'/home'}>Home</Link></li>
                    <li><Link to={'/profile'}>Profile</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                    <li><Link to={'/blog/123'}>Blog</Link></li>
                    <li><Link to={'/blog-post/react'}>BlogPost</Link></li>
                </ul>
                <Switch>
                    <Route path={'/home'} component={Home}/>
                    <Route path={'/profile'} component={Profile}/>
                    <Route path={'/about'} component={About}/>
                    <Route path={'/blog/:id'} component={Blog}/>
                    <Route
                        component={BlogPost}
                    />
                </Switch>
            </BrowserRouter>
        )
    }
}

function Blog(){
    const {id} = useParams();
    return (
        <div>
            <p> This is Blog Page</p>
            <p>Blog id is {id}</p>
        </div>
    )
}

function BlogPost(){
    // const match = useRouteMatch('/blog-post/:title');
    const match = useRouteMatch({
        path:'/blog-post/:title'
    })
    console.log('blog-post-match:',match);
    return (
        <div>
            <p>This is Blog-Post Page</p>
        </div>
    )
}

function Home(){
    const history = useHistory();
    const location = useLocation();
    console.log('home-location:',location);
    function handleClick(){
        history.push('/profile')
    }
    return (
        <div>
            <p>This is Home Page</p>
            <button onClick={handleClick}>go to profile</button>
        </div>
    )
}

function Profile(){
    const history = useHistory();
    console.log('profile-history:',history);
    function handleClick(){
        history.push('/home');
    }
    return (
        <div>
            <p>This is Profile Page</p>
            <button onClick={handleClick}>go to home</button>
        </div>
    )
}

class About extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        console.log(this.props);
        this.props.history.push('/profile');
    }
    render(){
        return (
            <div>
                <p>This is About Page</p>
                <button onClick={this.handleClick}>go to profile</button>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
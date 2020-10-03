const {BrowserRouter,Link,Route,Switch,useParams,useRouteMatch} = window.ReactRouterDOM;

function Home(){
    return (
        <div>
            This is a Home page
        </div>
    )
}
/*function Topics(){
    const {url,path} = useRouteMatch();
    console.log('topics-url',url,'topics-path:',path)
    return (
        <div>
            <p>This is a Topics page</p>
            <ul>
                <li><Link to={`${url}/rendering`}>Rendering</Link></li>
                <li><Link to={`${url}/components`}>Components</Link></li>
                <li><Link to={`${url}/props-v-state`}>Props v. State</Link></li>
            </ul>
            <Switch>
                <Route path={`${path}/:topicId`} component={Topic}/>
            </Switch>
        </div>
    )
}*/

class Topics extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props);
        let {url,path} = this.props.match;
        return (
            <div>
                <p>This is a Topics Page</p>
                <ul>
                    <li><Link to={`${url}/rendering`}>Rendering with React</Link></li>
                    <li><Link to={`${url}/components`}>Components</Link></li>
                    <li><Link to={`${url}/props-v-state`}>Props v. State</Link></li>
                </ul>
                <Switch>
                    <Route path={`${path}/:topicId`} component={Topic}/>
                </Switch>
            </div>
        )
    }
}

function Topic(){
    const {topicId} = useParams();
    return(
        <div>
            TopicId:{topicId}
        </div>
    )
}

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to={'/home'}>Home</Link></li>
                    <li><Link to={'/topics'}>Topics</Link></li>
                </ul>
                <Switch>
                    <Route path={'/home'} component={Home}/>
                    <Route path={'/topics'} component={Topics}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)


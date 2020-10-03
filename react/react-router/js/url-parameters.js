const {BrowserRouter,Link,Route,Switch,useParams} = window.ReactRouterDOM;

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to={'/netflix'}>Netflix</Link></li>
                    <li><Link to={'/zillow-group'}>Zillow Group</Link></li>
                    <li><Link to={'/yahoo'}>Yahoo</Link></li>
                    <li><Link to={'/modus-create'}>Modus Create</Link></li>
                </ul>
                <Switch>
                    {/*<Route path={'/:id'} component={Child}/>*/}
                    {/*<Route path={'/:id'} component={WebSite}/>*/}
                    <Route path={'/:id'} component={WebSite}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
/*在函数组件里,可以通过useParams获取动态路由参数*/
function Child(props){
    console.log(props);
    let {id} = useParams();
    console.log('id:',id)
    return(
        <div>
            <h3>ID:{id}</h3>
        </div>
    )
}

class WebSite extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log('componentDidMount:',this.props);
    }
    componentDidUpdate(){
        console.log('componentDidUpdate:',this.props);
    }
    render(){
        console.log('website:',this.props);
        return (
            <div>
                ID: 
            </div>
        )
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
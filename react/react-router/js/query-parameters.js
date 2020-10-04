const {BrowserRouter,Route,Link,Switch,useLocation} = window.ReactRouterDOM;

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to={'/account?name=netflix'}>Netflix</Link></li>
                    <li><Link to={'/account?name=zillow-group'}>Zillow Group</Link></li>
                    <li><Link to={'/account?name=yahoo'}>Yahoo</Link></li>
                    <li><Link to={'/account?name=modus-create'}>Modus Create</Link></li>
                </ul>
                <Switch>
                    <Route path={'/account'} component={Child}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

/*function Child(){
    console.log(window.location);
    const location = useLocation();
    console.log('use-location:',location);
    return (
        <div>Hello,World</div>
    )
}*/

class Child extends React.Component{
    render(){
        const name = window.location.search.substring(1).split('=')[1];
        console.log('props-search:',this.props.location.search);
        return (
            <div>
                Hello,World,The <code>name</code> in the query string is {name}
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
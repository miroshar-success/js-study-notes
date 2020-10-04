const friends = [
    { id: 0, name: "Michelle", friends: [1, 2, 3] },
    { id: 1, name: "Sean", friends: [0, 3] },
    { id: 2, name: "Kim", friends: [0, 1, 3] },
    { id: 3, name: "David", friends: [1, 2] }
];
function find(id){
    return friends.find(friend => friend.id === id)
}

const {
    BrowserRouter,
    Route,
    Switch,
    Link,
    useParams,
    useRouteMatch,
    Redirect
} = window.ReactRouterDOM;

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={'/:id'} children={<Person/>}/>
                    <Route path={'/*'}>
                        <Redirect to={'/0'}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

function Person(){
    const {id} = useParams();
    const {url} = useRouteMatch();
    let person = find(id);
    return(
        <div>
            <h3>{person.name}'s Friends</h3>
            <ul>
                {person.friends.map((person,index) =>
                    <li key={index}>
                        <Link to={`${url}/${id}`}>{find(id).name}</Link>
                    </li>
                )}
            </ul>
            <Switch>
                <Route path={`${url}/:id`} children={<Person/>}/>
            </Switch>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
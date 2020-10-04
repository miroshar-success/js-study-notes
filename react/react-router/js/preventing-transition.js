const {BrowserRouter,Switch,Link,Prompt,Route} = window.ReactRouterDOM;

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:"",
            isBlocking:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        console.log('submit-text:',this.state.value);
        this.setState({
            value:"",
        })
    }
    handleChange(event){
        let value = event.target.value.trim();
        this.setState({
            value
        })
        if(value.length > 0){
            this.setState({
                isBlocking:true
            })
        }else{
            this.setState({
                isBlocking:false
            })
        }
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Prompt
                        when={this.state.isBlocking}
                        message={'Are you sure want to exit ? '}
                    />
                    <input
                        type="text"
                        placeholder={'type something to block transition'}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

function Profile(){
    return (
        <div>
            This is a Profile Page
        </div>
    )
}

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to={'/form'}>Form</Link></li>
                    <li><Link to={'/profile'}>Profile</Link></li>
                </ul>
                <Switch>
                    <Route path={'/form'} component={Form}/>
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











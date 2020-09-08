function LoginButton(props){
    console.log('login--props:',props);
    return (
        <button onClick={props.onClick}>Login</button>
    )
}
function LogoutButton(props){
    console.log('logout--props',props);
    return (
        <button onClick={props.onClick}>Logout</button>
    )
}

function UserGreeting(){
    return <h1>Welcome back!</h1>
}
function GuestGreeting(){
    return <h1>Please Sign up!</h1>
}

function Greeting(props){
    if(props.isLoggedIn){
        return <UserGreeting/>
    }else{
        return <GuestGreeting/>
    }
}

class LoginControl extends React.Component {
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            isLoggedIn:false
        }
    }
    handleLogin() {
        this.setState({
            isLoggedIn:true
        })
    }
    handleLogout() {
        this.setState({
            isLoggedIn:false
        })
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn}/>
                {isLoggedIn
                    ? <LogoutButton onClick={this.handleLogout}/>
                    : <LoginButton onClick={this.handleLogin}/>
                }
                <p>The user is <b>{isLoggedIn ? 'current' : 'not'} login </b></p>
            </div>
        )
    }
}

ReactDOM.render(
    <LoginControl/>,
    document.getElementById("root")
)

function MailBox(props){
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h2>Hello!</h2>
            {
                unreadMessages.length > 0 &&
                <h3>
                    You have {unreadMessages.length} unread messages.
                </h3>
            }
        </div>
    )
}
const messages = ['React','Redux','React-router-dom'];

ReactDOM.render(
    <MailBox unreadMessages={messages}/>,
    document.getElementById("root")
)

function WarningBanner(props){
    if(!props.warn){
        return null;
    }
    return (
        <div className={'warning'}>
            Warning!
        </div>
    )
}


class Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showWarning:true
        }
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    handleToggleClick() {
        this.setState((state) => ({
            showWarning:!state.showWarning
        }))
    }
    // 返回null不会影响组件的生命周期
    componentDidUpdate() {
        console.log('更新了');
    }
    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning}/>
                <button
                    onClick={this.handleToggleClick}
                >{this.state.showWarning ? 'hide' : 'show'}</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Page/>,
    document.getElementById("root")
)









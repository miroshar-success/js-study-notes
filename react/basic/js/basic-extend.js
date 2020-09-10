function FancyBorder(props){
    console.log(props);
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )
}

// function WelcomeDialog(){
//     return (
//         <FancyBorder color='blue'>
//             <h1 className="Dialog-title">Welcome</h1>
//             <p className="Dialog-message">Thank you for visiting our spacecraft</p>
//         </FancyBorder>
//     )
// }


class SplitPane extends React.Component{
    render() {
        console.log(this.props);
        return (
            <div className="SplitPane">
                <div className="SplitPane-left">{this.props.left}</div>
                <div className="SplitPane">{this.props.right}</div>
            </div>
        )
    }
}

class Left extends React.Component{
    render(){
        return (
            <div>Hello,Left</div>
        )
    }
}

class Right extends React.Component{
    render() {
        return (
            <div>Hello,Right</div>
        )
    }
}

function App(){
    return (
        <SplitPane
            left={<Left/>}
            right={<Right/>}
        />
    )
}

function Dialog(props){
    return (
        <FancyBorder color='blue'>
            <h1 className="Dialog-title">{props.title}</h1>
            <p className="Dialog-message">{props.message}</p>
            {props.children}
        </FancyBorder>
    )
}

function WelcomeDialog(){
    return (
        <Dialog title='welcome' message='Thank you for visiting our sacecraft!'/>
    )
}

class SignUpDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    handleChange(event){
        this.setState({
            login:event.target.value
        })
    }
    handleSignUp(){
        alert("Welcome aboard");
    }
    render(){
        return (
            <Dialog
                title='Mars Exploration Program'
                message='How should we refer to you?'
            >
                <input value={this.state.login} onChange={this.handleChange}/>
                <button onClick={this.handleSignUp}>Sign Me Up!</button>
            </Dialog>
        )
    }
}
ReactDOM.render(
    <SignUpDialog/>,
    document.getElementById("root")
)
/*
class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state = {hasError:false}
    }
    static getDerivedStateFromError(error){
        return {hasError:true}
    }
    componentDidCatch(error,errorInfo){
        logErrorToMyService(error,errorInfo);
    }
    render(){
        if(this.state.hasError){
            return <h1>Something went wrong!</h1>
        }
        return this.props.children;
    }
}*/

class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state = {error:null,errorInfo:null,hasError:false}
    }
    static getDerivedStateFromError(error){
        return {hasError:true}
    }
    componentDidCatch(error,errorInfo){
        this.setState({
            error,errorInfo
        })
        console.log(error,errorInfo);
    }
    render() {
        if(this.state.error){
            return (
                <div>
                    <h2>Something went wrong!</h2>
                    <details style={{whiteSpace:'pre-wrap'}}>
                        <p>{this.state.error && this.state.error.toString()}</p>
                        <p>{this.state.errorInfo && this.state.errorInfo.toString()}</p>
                    </details>
                </div>
            )
        }
        return (
            this.props.children
        )
    }
}

class BuggyCounter extends React.Component {
    constructor(props){
        super(props);
        this.state = {count:0}
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(state => ({
            count:state.count+1
        }))
    }
    render(){
        if(this.state.count === 5){
            throw new Error("I crashed");
        }
        return (
            <div>
                <button onClick={this.handleClick}>click me {this.state.count}times</button>
            </div>
        )
    }
}
function App(){
    return(
        <div>
            <p>These tow counters are inside the same error boundary,If one crashes,the error boundary will replace both of them.</p>
            <ErrorBoundary>
                <BuggyCounter/>
                <BuggyCounter/>
            </ErrorBoundary>
            <p>These two counters are each insidee of their own boundary,So if one crashes,the other is not affected.</p>
            <ErrorBoundary><BuggyCounter/></ErrorBoundary>
            <ErrorBoundary><BuggyCounter/></ErrorBoundary>
            <div>
                <p>no error boundary</p>
                <BuggyCounter/>
            </div>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
















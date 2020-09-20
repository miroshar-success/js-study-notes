class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {message:"hello,world!",count:0}
        console.log("create constructor"); // 1
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(state => ({
            count:state.count+1
        }))
    }
    static getDerivedStateFromProps(){
        console.log("create getDerivedStateFromProps");    // 2
        console.log('update getDerivedStateFromProps');
        return null;
    }
    componentDidMount(){
        console.log('create componentDidMount');   // 4
    }
    shouldComponentUpdate(){
        console.log('update shouldComponentUpdate');
        return true;
    }
    getSnapshotBeforeUpdate(){
        console.log('update getSnapshotBeforeUpdate');
        return null;
    }
    componentDidUpdate(){
        console.log('update componentDidUpdate');
    }
    render() {
        console.log('create render');      // 3
        console.log('update render');
        return (
            <div>
                <p>{this.state.message}</p>
                <button onClick={this.handleClick}>click {this.state.count} times</button>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)


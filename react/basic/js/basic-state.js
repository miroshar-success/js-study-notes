function tick() {
    const element = (
        <div>
            <p>Hello,World</p>
            <h3>{new Date().toLocaleTimeString()}</h3>
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById("root")
    )
}
// tick();
// setInterval(tick,1000);

/*
function Clock(props){
    return (
        <div>
            <p>Hello,World!!!!!</p>
            <h3>It is {props.date.toLocaleTimeString()}</h3>
        </div>
    )
}
function update(){
    ReactDOM.render(
        <Clock date={new Date()}/>,
        document.getElementById("root")
    )
}
update();
setInterval(update,1000);*/

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date:new Date()}
    }
    componentDidMount(){
        this.timer = setInterval(() => this.tick(),1000)
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    tick() {
        this.setState({
            date:new Date()
        })
    }
    render(){
        return (
            <div>
                <p>Hello,World!</p>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}

ReactDOM.render(
    <div>
        <Clock/>
        <Clock/>
        <Clock/>
    </div>,
    document.getElementById("root")
)
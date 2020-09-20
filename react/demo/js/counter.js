const buttonStyle = {margin:'10px'}
class Counter extends React.Component {
    constructor(props){
        super(props);
        // console.log('enter constructor:',props);
        this.state = {
            count:props.initialValue
        }
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    }
    componentDidMount(){
        // console.log('componentDidMount:',this.props.caption);
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log('nextProps:',nextProps,"this-props:",this.props);
        console.log('nextState:',nextState,'this-state:',this.state);
        return (nextProps.caption !== this.props.caption) || (nextState.count !== this.state.count);
    }
    handleIncrease(){
        console.log('before-setState:',this.state.count);
/*        this.setState({
            count:this.state.count+1
        },() => {
            console.log('update-setState:',this.state.count);
        })*/
        this.setState(state => ({
            count:state.count + 1
        }),() => {
            console.log('update-setState:',this.state.count)
        })
        console.log('after-setState:',this.state.count);
    }
    handleDecrease(){
        this.setState(state => ({
            count:state.count - 1
        }))
    }
    componentDidUpdate(){
        console.log('component-did-update enter');
    }
    componentWillUnmount(){
        console.log("component-will-unmount enter");
    }
    render() {
        console.log('render enter:',this.props.caption);
        let {caption} = this.props;
        return (
            <div>
                <button style={buttonStyle} onClick={this.handleIncrease}>+</button>
                <button style={buttonStyle} onClick={this.handleDecrease}>-</button>
                <span>{caption}: {this.state.count}</span>
            </div>
        );
    }
}
// PropTypes 提供一系列验证器，可用于确保组件接收到的数据类型是有效的。出于性能方面的考虑，propTypes 仅在开发模式下进行检查。
// propTypes类型检查发生在defaultProps赋值后。

Counter.defaultProps = {
    initialValue:0
}
Counter.propTypes = {
    caption:PropTypes.string.isRequired,
    initialValue:PropTypes.number
}

function CounterWrapper(){
    return (
        <div>
            <Counter caption='First Count' />
            <Counter caption='Second Count' initialValue={10}/>
            <Counter caption='Third Count' initialValue={20}/>
        </div>
    )
}

ReactDOM.render(
    <CounterWrapper/>,
    document.getElementById("root")
)

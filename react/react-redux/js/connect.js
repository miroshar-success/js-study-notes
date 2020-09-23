const {createStore,combineReducers} = window.Redux;
const {connect,Provider} = window.ReactRedux;

function count(state=0,action){
    switch(action.type){
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}
function checked(state=false,action){
    switch(action.type){
        case "TOGGLE":
            return !state;
        default:
            return state;
    }
}
function Toggle(){
    return {
        type:"TOGGLE"
    }
}
function Increment(){
    return {
        type:"INCREMENT"
    }
}
function Decrement(){
    return {
        type:"DECREMENT"
    }
}

const reducer =combineReducers({
    count,
    checked
})
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class Counter extends React.Component {
    constructor(props){
        super(props);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
    }
    handleIncrement(){
        this.props.Increment()
    }
    handleDecrement(){
        this.props.Decrement()
    }
    render(){
        console.log('count-changed and re-render',this.props.count);
        return (
            <div>
                <button onClick={this.handleIncrement}>+</button>
                <span style={{padding:'0 10px'}}>{this.props.count}</span>
                <button onClick={this.handleDecrement}>-</button>
            </div>
        )
    }
}

class Switch extends React.Component{
    constructor(props){
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle(){
        this.props.Toggle()
    }
    render(){
        return (
            <button onClick={this.handleToggle}>{this.props.checked ? 'off' : 'on'}</button>
        )
    }
}
const mapSwitchState = state => {
    return {
        checked:state.checked
    }
}
const mapSwitchDispatch = {Toggle}
Switch = connect(mapSwitchState,mapSwitchDispatch)(Switch);

const mapStateToProps = (state,ownProps) => {
    // console.log(ownProps);  // ownProps: {id:123,name:"counter"}
    return {count:state.count}
}
const mapDispatchToProps = {Increment,Decrement}
Counter = connect(mapStateToProps,mapDispatchToProps)(Counter);

ReactDOM.render(
    <Provider store={store}>
        <Counter id={123} name={"counter"}/>
        <Switch/>
    </Provider>,
    document.getElementById("root")
)
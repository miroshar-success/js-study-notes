const {createStore,combineReducers} = window.Redux;
const {Provider,connect} = window.ReactRedux;

function count(state=0,action){
    switch(action.type){
        case "INCREMENT":
            return state+action.payload;
        case "DECREMENT":
            return state-1;
        case "RESET":
            return 0;
        default:
            return state;
    }
}
function increment(number){
    return {type:"INCREMENT",payload:number}
}
function decrement(){
    return {type:"DECREMENT"}
}
function reset(){
    return {type:"RESET"}
}
const reducer = combineReducers({
    count
});
const store = createStore(
reducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class Counter extends React.Component {
    constructor(props){
        super(props);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleReset(){
        this.props.reset();
    }
    handleDecrement(){
        this.props.decrement()
    }
    handleIncrement(){
        this.props.increment()
    }
    render(){
        console.log(this.props);
        return (
            <div>
                <button onClick={this.handleIncrement}>+</button>
                <span>{this.props.count}</span>
                <button onClick={this.handleDecrement}>-</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {count:state.count}
}
const mapDispatchToProps = (dispatch,ownProps) => ({
    decrement:() => dispatch(decrement()),
    increment:() => dispatch(increment(ownProps.number)),
    reset:() => dispatch(reset())
});

Counter = connect(mapStateToProps,mapDispatchToProps)(Counter);
ReactDOM.render(
    <Provider store={store}>
        <Counter number={12}/>
    </Provider>,
    document.getElementById("root")
)
const {createStore} = window.Redux;
const {Provider,connect} = window.ReactRedux;
function counter(state = 0,action){
    switch(action.type){
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}
let store = createStore(
    counter,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class Counter extends React.Component {
    constructor(props){
        super(props);
        this.handleDecrease = this.handleDecrease.bind(this);
        this.handleIncrease = this.handleIncrease.bind(this);
    }
    handleDecrease(){
        store.dispatch({type:"DECREMENT"});
    }
    handleIncrease(){
        store.dispatch({type:"INCREMENT"});
    }
    render(){
        console.log(this.props.count);
        return (
            <div>
                <button onClick={this.handleIncrease}>+</button>
                <p>{this.props.count}</p>
                <button onClick={this.handleDecrease}>-</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        count:state
    }
}
Counter = connect(mapStateToProps,null)(Counter);

store.subscribe(() => {
    console.log('getState:',store.getState());
})

ReactDOM.render(
    <Provider store={store}>
        <Counter/>
    </Provider>,
    document.getElementById("root")
)


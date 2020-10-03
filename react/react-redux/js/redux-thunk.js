const {createStore,combineReducers,applyMiddleware,compose} = window.Redux;
const {Provider,connect} = window.ReactRedux;
const ReduxThunk = window.ReduxThunk.default;

const counter = (state = 0,action) => {
    switch(action.type){
        case "ADD":
            return state+1;
        case "REDUCE":
            return state-1;
        default:
            return state;
    }
}

function add(){
    return {
        type:"ADD"
    }
}
function reduce(){
    return {
        type:"REDUCE"
    }
}

function reduceAsync(){
    return (dispatch,getState) => {
        const {counter} = getState();
        console.log(counter);
        setTimeout(() => {
            dispatch(reduce())
        },1000)
    }
}

const reducer = combineReducers({
    counter
})
const store = createStore(
    reducer,
    compose(
        applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

class App extends React.Component {
    constructor(props){
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleReduce = this.handleReduce.bind(this);
        this.handleReduceAsync = this.handleReduceAsync.bind(this);
    }
    handleAdd(){
        this.props.add()
    }
    handleReduce(){
        this.props.reduce()
    }
    handleReduceAsync(){
        this.props.reduceAsync()
    }
    render() {
        return (
            <div>
                <button
                    onClick={this.handleAdd}
                >+</button>
                <span style={{padding:'0 10px'}}>{this.props.counter}</span>
                <button onClick={this.handleReduce}>-</button>
                <button onClick={this.handleReduceAsync}>reduce 1s later</button>
            </div>
        );
    }
}

console.log('dispatching',add);
store.subscribe(() => {
    console.log('next-state',store.getState())
})

const mapStateToProps = state => {
    return {counter:state.counter}
}
const mapDispatchToProps = {add,reduce,reduceAsync}

App = connect(mapStateToProps,mapDispatchToProps)(App)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
)
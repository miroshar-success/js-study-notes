function Counter(){
    const [count,setCount] = React.useState(0);
    const [age,setAge] = React.useState(42);
    const [fruit,setFruit] = React.useState('banana');
    const [todo,setTodo] = React.useState({text:'Learn Hooks'});
    function handleClick(){
        setCount(count+1)
    };
    function handleSetAge(){
        setAge(50)
    };
    function handleSetFruit(){
        setFruit('apple')
    }
    function handleSetTodo(){
        setTodo({text:"Learn Redux"})
    }
    React.useEffect(() => {
        document.title = `you clicked counter ${count} times`;
    })
    return (
        <div>
            <p>
                <span>count: {count}</span>
                <span>age: {age}</span>
                <span>fruit: {fruit}</span>
                <span>todo: {todo.text}</span>
            </p>
            <div>
                <button onClick={handleClick}>add-count</button>
                <button onClick={handleSetAge}>set-age</button>
                <button onClick={handleSetFruit}>set-fruit</button>
                <button onClick={handleSetTodo}>set-todo</button>
            </div>
        </div>
    )
}
/*等价的class组件*/
class Count extends React.Component {
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
    componentDidMount(){
        document.title = `you click count ${this.state.count} times`
    }
    componentDidUpdate(){
        document.title = `you click count ${this.state.count} times`
    }
    render(){
        return (
            <div>
                <p>you click {this.state.count} times</p>
                <button onClick={this.handleClick}>click</button>
            </div>
        )
    }
}


/*函数式更新*/

function HelloCount({initialValue}){
    const [count,setCount] = React.useState(initialValue);
    function handleReset(){
        setCount(initialValue);
    }
    function handleIncrement(){
        // setCount(prevCount => prevCount+1)
        setCount(count+1);
    }
    function handleDecrement(){
        // setCount(prevCount => prevCount-1);
        setCount(count-1);
    }
    return (
        <div>
            <p>current-count: {count}</p>
            <button onClick={handleReset}>reset</button>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </div>
    )
}

/*惰性初始state,每次更新,cal函数会再次计算*/

function cal(value){
    console.log('我执行了计算');
    return value/1000
}

function CalcCount({initialValue}){
    const [count,setCount] = React.useState(cal(initialValue));
    function add(){
        setCount(count+1);
    }
    return (
        <div>
            <p>current-count:{count}</p>
            <button onClick={add}>+</button>
        </div>
    )
}

function OnlyCalcOnceCount({initialValue}){
    const [count,setCount] = React.useState(() => {
        return cal(initialValue);
    })
    function add(){
        setCount(count+1);
    }
    return(
        <div>
            <p>current-count:{count}</p>
            <button onClick={add}>+</button>
        </div>
    )
}


ReactDOM.render(
    <OnlyCalcOnceCount initialValue={1000}/>,
    document.getElementById("root")
)
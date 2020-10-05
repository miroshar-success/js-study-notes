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

ReactDOM.render(
    <Count/>,
    document.getElementById("root")
)
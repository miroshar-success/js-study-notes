const {createStore,combineReducers} = window.Redux;
const {Provider,connect} = window.ReactRedux;

function Add(text){
    return {
        type:"ADD_TODO",
        text,
    }
}

function setFilter(filter){
    return {
        type:"SET_FILTER",
        filter
    }
}

function todos(state = [],action){
    switch(action.type){
        case "ADD_TODO":
            return [...state,{
                text:action.text,
                completed:false,
                id:Date.now()
            }]
        case "TOGGLE_TODO":
            console.log('reducer-id:',action.id);
            return state.map((todo) => {
                if(todo.id == action.id){
                    todo.completed = !todo.completed
                }
                return todo;
            })
        default:
            return state;
    }
}
function filter(state = 'all',action){
    switch(action.type){
        case "SET_FILTER":
            return action.filter;
        default:
            return state;
    }
}

const reducer = combineReducers({
    todos,
    filter
});

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class TodoApp extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="wrapper">
                <div>
                    <FooterLink filter={'all'}/>
                    <FooterLink filter={'completed'}/>
                    <FooterLink filter={'unfinished'}/>
                </div>
                <AddTodo/>
                <TodoList/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        todos:state.todos,
    }
}

TodoApp = connect(mapStateToProps,null)(TodoApp);

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text:""}
        this.handleChange = this.handleChange.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }
    handleChange(event){
        this.setState({
            text:event.target.value.trim()
        })
    }
    handleAddTodo(){
        if(!this.state.text.trim()) return;
        this.props.Add(this.state.text);
        this.setState({
            text:""
        })
    }
    render(){
        return (
            <div>
                <input type="text" value={this.state.text} onChange={this.handleChange}/>
                <button onClick={this.handleAddTodo}>add</button>
            </div>
        )
    }
}
const mapDispatchToProps = {Add};
AddTodo = connect(null,mapDispatchToProps)(AddTodo);


class TodoList extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const todos = this.props.todos;
        console.log('todos:',todos);
        return (
            <div>
                {todos.length > 0 && todos.map((todo,index) => (
                    <Todo todo={todo} key={index}/>
                ))}
            </div>
        )
    }
}
const mapTodoStateToProps = state => {
    let todos;
    if(state.filter == 'all'){
        todos = state.todos;
    }
    if(state.filter == 'completed'){
        todos = state.todos.filter(todo => todo.completed)
    }
    if(state.filter == 'unfinished'){
        todos = state.todos.filter(todo => !todo.completed);
    }
    return {todos}
}
TodoList = connect(mapTodoStateToProps,null)(TodoList);

class Todo extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(){
        console.log(this.props.todo.id);
        store.dispatch({
            type:"TOGGLE_TODO",
            id:this.props.todo.id
        })
    }
    render(){
        let {todo} = this.props;
        return (
            <li >
                <input
                    type="checkbox"
                    checked={todo.completed}
                    value={todo.text}
                    onChange={this.handleChange}
                />
                <span>{todo.text}</span>
            </li>
        )
    }
}

class FooterLink extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.setFilter(this.props.filter)
    }
    render(){
        let filter = this.props.filter;
        return (
            <button
                onClick={this.handleClick}
                className={this.props.currentFilter == filter ? 'active' : ''}
            >{filter}</button>
        )
    }
}

const mapFilterStateToProps = state => {
    return {
        currentFilter:state.filter
    }
}
const mapFilterDispatchToProps = {setFilter}
FooterLink = connect(mapFilterStateToProps,mapFilterDispatchToProps)(FooterLink)


store.subscribe(() => {
    console.log('store:',store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <TodoApp/>
    </Provider>,
    document.getElementById("root")
)
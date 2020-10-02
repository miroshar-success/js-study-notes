const wrapperStyle ={
    width:'500px',
    height:'400px',
    padding:'10px',
    border:'1px solid #ccc',
    margin:'30px auto',
    borderRadius:'5px',
    boxShadow:'1px 1px 3px 1px #eee'
}

const {createStore,combineReducers} = window.Redux;
const {connect,Provider} = window.ReactRedux;

/*action-type*/
const ADD_TODO = 'ADD_TODO',
    TOGGLE_TODO = 'TOGGLE_TODO',
    DELETE_TODO = 'DELETE_TODO';

/*reducers*/
const todos = function(state = [],action){
    switch(action.type){
        case ADD_TODO:
        return [...state,{
            text:action.payload.text,
            id:action.payload.id,
            completed:false
        }]
        case TOGGLE_TODO:
            return state.map((todo) => {
                if(todo.id == action.payload){
                    todo.completed = !todo.completed;
                }
                return todo;
            });
        case DELETE_TODO:
            let todos = [...state];
            let index = todos.findIndex((todo) => todo.id == action.payload);
            todos.splice(index,1);
            return todos;
        default:
            return state;
    }
}

/*combine-reducer*/
const reducer = combineReducers({
    todos,
})
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

/*action*/
function add(text){
    return {
        type:ADD_TODO,
        payload:{
            text,
            id:Date.now(),
        }
    }
}
function toggle(id){
    return {
        type:TOGGLE_TODO,
        payload:id
    }
}
function del(id){
    return {
        type:DELETE_TODO,
        payload:id
    }
}

class TodoList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({
            text:event.target.value
        })
    }
    handleSubmit(){
        let text = this.state.text.trim();
        if(!text){
            antd.message.info('please write something!');
            return;
        }
        this.props.add(text);
        this.setState({
            text:""
        })
    }
    toggleTodo(id){
        console.log(id)
        this.props.toggle(id);
    }
    deleteTodo(id){
        this.props.del(id);
    }
    render(){
        return (
            <div
                style={wrapperStyle}
            >
                <header style={{display:'flex'}}>
                    <antd.Input
                        placeholder={'What next to do?'}
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                    <antd.Button type='primary' style={{marginLeft:'10px'}} onClick={this.handleSubmit}>Submit</antd.Button>
                </header>
                <div className={'list'}>
                    <antd.List dataSource={this.props.todos} size={'large'} split={true}
                        renderItem={item => (
                            <antd.List.Item key={item.id} style={{'justifyContent':'flex-start'}}>
                                <antd.Checkbox checked={item.completed} onChange={this.toggleTodo.bind(this,item.id)}/>
                                <antd.Typography.Text
                                    type={item.completed ? 'success' : 'danger'}
                                    style={{paddingLeft:'10px',fontSize:'18px'}}
                                    onClick={this.deleteTodo.bind(this,item.id)}
                                >{item.text}</antd.Typography.Text>
                            </antd.List.Item>
                        )}
                    ></antd.List>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        todos:state.todos
    }
}

TodoList = connect(mapStateToProps,{add,toggle,del})(TodoList)

ReactDOM.render(
    <Provider store={store}>
        <TodoList/>
    </Provider>,
    document.getElementById("root")
)
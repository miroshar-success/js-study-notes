const {createStore,combineReducers} = window.Redux;
const {Provider,connect} = window.ReactRedux;
const ADD = 'TODO/ADD', TOGGLE = 'TODO/TOGGLE', REMOVE = 'TODO/REMOVE';
const SET_FILTER = 'SET_FILTER';
const ALL = 'all', FINISHED = 'finished', UNFINISHED = 'unfinished'
function todolist(state = [],action){
  let {type,payload} = action;
  switch(type){
    case ADD:
      return [payload,...state];
    case TOGGLE:
      return state.map((todo) => {
        if(todo['id'] === payload){
          return {...todo,completed:!todo['completed']}
        }else{
          return todo;
        }
      })
    case REMOVE:
      return state.filter(todo => todo['id'] !== payload);
    default :
      return state;
  }
}
function filter(state = ALL, action){
  let {type,payload} = action;
  switch(type){
    case SET_FILTER:
      return payload;
    default:
      return state;
  }
}
const add_todo =(payload) => ({
    type:ADD,
    payload
})
const toggle_todo = (id) => ({
  type:TOGGLE,
  payload:id
})
const remove_todo = (id) =>({
  type:REMOVE,
  payload:id
})

const set_filter = (filter) =>({
  type:SET_FILTER,
  payload:filter
})

const reducer = combineReducers({
  todolist,
  filter
})
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class TodoItem extends React.Component {
  constructor(props){
    super(props)
    console.log("enter-todoItem constructor");
  }
  render(){
    let {completed,text,id} = this.props;
    console.log("todo-item-render");
    return (
      <li className="todo-item">
        <div>
          <input type="checkbox" checked={completed} onChange={this.props.toggle_todo.bind(this,id)}/>
          <span className="completed">{completed ?  "✅": "❌"}</span>
          <span>{text}</span>
        </div>
        <span className="delete-text" onClick={this.props.remove_todo.bind(this,id)}>删除</span>
      </li>
    )
  }
}
const mapTodoItemDispatch = {toggle_todo,remove_todo};
TodoItem = connect(null,mapTodoItemDispatch)(TodoItem);

class TodoList extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    console.log("todo-list-render");
    const todolist = this.props.todolist;
    // 迫不得已的时候,key 使用index
    return (
      <ul>
        {todolist.length > 0 && todolist.map((todo,index) => (
          <TodoItem 
            key={todo['id']}  
            text={todo['text']}
            completed={todo['completed']}
            id={todo['id']}
          />
        ))}
      </ul>
    )
  }
}

function filter_todolist(list,filter){
  if(filter === ALL){
    return list;
  }
  let completed = filter === FINISHED ? true : false;
  return list.filter(todo => todo['completed'] === completed);
}

const mapTodoListState = state => {
  return {
    todolist:filter_todolist(state.todolist,state.filter)
  }
}
TodoList = connect(mapTodoListState,null)(TodoList);

const tabs = [{
    label:'all',
    value:ALL
  },
  {
    label:"finished",
    value:FINISHED
  },
  {
    label:'unfinished',
    value:UNFINISHED
  }
]
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      text:""
    }
  }
  handleEditTodo = (event) => {
    this.setState({
      text:event.target.value.trim()
    })
  }
  handleAddTodo = () => {
    if(!this.state.text) return;
    this.props.add_todo({
      text:this.state.text,
      completed:false,
      id:Date.now()
    })
    this.setState({text:""})
  }
  handleFilter(filter){
    this.props.set_filter(filter);
  }
  render(){
    let filter = this.props.filter;
    return (
      <div className="container">
        <input type="text" value={this.state.text} onChange={this.handleEditTodo} className="todo-input"/>
        <button className="add-button" onClick={this.handleAddTodo}>add</button>
        <div>
          {tabs.length > 0 && tabs.map((tab,index) => (
            <span 
              key={'tab-'+index} 
              className={['tab-item',tab['value'] === filter ? 'active' : ''].join(" ")}
              onClick={this.handleFilter.bind(this,tab['value'])}
            >{tab['label']}</span>
          ))}
        </div>
        <TodoList/>
      </div>
    )
  }
}
// 优化渲染过程,和数据获取
const mapAppDispatch = {add_todo,set_filter};
const mapAppState = state => {
  return {
    filter:state.filter
  }
}
App = connect(mapAppState,mapAppDispatch)(App);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
)


const ALL = 'all', FINISHED = 'finished', UNFINISHED = 'unfinished';
const {createStore,combineReducers} = window.Redux;
const {connect,Provider} = window.ReactRedux;
const ADD_TODO = 'TODO/ADD', TOGGLE_TODO = 'TODO/TOGGLE', DELETE_TODO = 'TODO/DELETE'
const SET_FILTER = 'FILTER/SET';

// reducer必须是一个纯函数,不能修改对象 或者 数组本身,需要返回一个新的数组或者对象
function todo_reducer(state = [],action){
  let {type,payload} = action;
  switch(type){
    case ADD_TODO:
      return [payload,...state]
    case TOGGLE_TODO:
      return state.map((todo) => {
        if(todo['id'] === payload){
          return {...todo,completed:!todo['completed']}
        }else{
          return todo
        }
      });
    case DELETE_TODO:
      return state.filter(todo => todo['id'] !== payload);
    default:
      return state;
  }
}

function filiter_reducer(state = ALL,action){
  let {type,payload} = action;
  switch(type){
    case SET_FILTER:
      return payload;
    default:
      return state;
  }
}
let id = 0;

const add_todo = (text) => ({
  type:ADD_TODO,
  payload:{
    id:id++,
    text,
    completed:false
  }
})

const toggle_todo = (id) =>({
  type:TOGGLE_TODO,
  payload:id
})

const delete_todo = (id) =>({
  type:DELETE_TODO,
  payload:id
})


const set_filter = (filter) =>({
  type:SET_FILTER,
  payload:filter
})

const reducer = combineReducers({
  todo_list:todo_reducer,
  filter:filiter_reducer
})
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class TodoList extends React.Component{
  constructor(){
    super(...arguments);
  }
  toggleTodo(id){
    store.dispatch({
      type:TOGGLE_TODO,
      payload:id
    })
  }
  handleDeleteTodo(id){
    store.dispatch({
      type:DELETE_TODO,
      payload:id
    })
  }
  render(){
    let {list} = this.props;
    return (
      <ul>
        {
        list.length 
          ? list.map((todo,index) => (
            <li key={'todo-'+index} className="todo-item">
              <div>
                <input type="checkbox" checked={todo['completed']} onChange={this.toggleTodo.bind(this,todo['id'])}/>
                <span>{todo['completed'] ? '✅' : '❌'}</span><span style={{paddingLeft:'10px'}}>{todo['text']}</span>
              </div>
              <span className="delete" onClick={this.handleDeleteTodo.bind(this,todo['id'])}>delete</span>
            </li>
          ))
          : null
        }
      </ul>
    )
  }
}

class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text:"",
      tab_list:[ALL,FINISHED,UNFINISHED]
    }
    this.filter_todo_list = this.filter_todo_list.bind(this);
    this.inputRef = React.createRef();
  }
  handleAddTodo = (event) => {
    let text = event.target.value.trim();
    this.setState({
      text
    });
  }
  handleAdd = () => {
    if(!this.state.text) return;
    this.props.add_todo(this.state.text);
    this.inputRef.current.value = "";
  }
  handleSetFilter(filter){
    this.props.set_filter(filter);
  }
  filter_todo_list(){
    let todo_list = this.props.todo_list;
    let current_filter = this.props.current_filter;
    if(current_filter === ALL){
      return todo_list
    }
    let flag = current_filter === FINISHED ? true : false;
    return todo_list.filter(todo => todo['completed'] === flag);
  }
  render(){
    let {current_filter} = this.props;
    let todo_list = this.filter_todo_list();
    return (
      <div>
        <div style={{padding:'10px 0 10px 0',fontWeight:'bold',color:''}}>TodoList</div>
        <div>
          {this.state.tab_list.map((tab,index) => (
            <span 
              key={'tab-'+index} className={['tab',current_filter === tab ? 'active' : ''].join(" ")}
              onClick={this.handleSetFilter.bind(this,tab)}
            >{tab}</span>
          ))}
        </div>
        <input type="text" value={this.state.todo} onChange={this.handleAddTodo} ref={this.inputRef}/>
        <button onClick={this.handleAdd}>add</button>
        <TodoList list={todo_list}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    todo_list:state.todo_list,
    current_filter:state.filter
  }
}
const mapDispatchToProps = {add_todo,set_filter}

TodoApp = connect(mapStateToProps,mapDispatchToProps)(TodoApp);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById("todo")
)
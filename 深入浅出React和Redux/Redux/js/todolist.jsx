const ALL = 'all', FINISHED = 'finished', UNFINISHED = 'unfinished';
const {createStore,combineReducers} = window.Redux;
const {connect,Provider} = window.ReactRedux;

function todo_reducer(state = [],action){
  let {type,payload} = action;
  switch(type){
    case 'INCREMENT':
      return [...state,payload]
    default:
      return state;
  }
}

function filiter_reducer(state = ALL,action){
  let {type,payload} = action;
  switch(type){
    case 'SET_FILTER':
      return payload;
    default:
      return state;
  }
}

function add_todo(text){
  return {
    type:"INCREMENT",
    payload:{
      id:Date.now(),
      text,
      completed:UNFINISHED
    }
  }
}

function set_filter(filter){
  return {
    type:"SET_FILTER",
    payload:filter
  }
}

const reducer = combineReducers({
  todo_list:todo_reducer,
  filter:set_filter
})
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class TodoList extends React.Component{
  constructor(){
    super(...arguments);
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
                <input type="checkbox" value={todo['completed']}/>
                <span>{todo['completed'] ? '✅' : '❌'}</span><span style={{paddingLeft:'10px'}}>{todo['text']}</span>
              </div>
              <span className="delete">delete</span>
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
      text:""
    }
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
    this.setState({
      text:"",
      tab_list:[ALL,FINISHED,UNFINISHED]
    })
  }
  render(){
    let todo_list = this.props.todo_list;
    return (
      <div>
        {this.state.tab_list.map((tab,index) => (
          <span>{tab}</span>
        ))}
        <input type="text" value={this.state.todo} onChange={this.handleAddTodo}/>
        <button onClick={this.handleAdd}>add</button>
        <TodoList list={todo_list}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    todo_list:state.todo_list
  }
}
const mapDispatchToProps = {add_todo}

TodoApp = connect(mapStateToProps,mapDispatchToProps)(TodoApp);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById("todo")
)
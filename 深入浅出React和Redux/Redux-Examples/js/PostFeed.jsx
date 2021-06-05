const {createStore,combineReducers} = window.Redux;
const {Provider,connect} = window.ReactRedux;

let initial_posts = [
  {id:1,title:"First Post!",content:"Hello"},
  {id:2,title:"Second Post",content:"More text"}
]

function posts (state = initial_posts,action){
  return state
}

const reducer = combineReducers({
  posts
})
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class PostList extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {this.props.posts.length > 0 && this.props.posts.map((post) => (
            <li key={post['id']} className="post-item">
              <h3>{post['title']}</h3>
              <p>{post['content']}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    posts:state.posts
  }
}
PostList = connect(mapStateToProps,null)(PostList);

ReactDOM.render(
  <Provider store={store}>
    <PostList/>
  </Provider>,
  document.getElementById("post-feed")
)
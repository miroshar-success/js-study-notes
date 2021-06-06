const {createStore,combineReducers} = window.Redux;
const {Provider,connect} = window.ReactRedux;

let initial_posts = [
  {id:1,title:"First Post!",content:"Hello"},
  {id:2,title:"Second Post",content:"More text"}
]

function posts (state = initial_posts,action){
  switch(action.type){
    case 'post/ADD_POST':
      let id = state.length > 0 ? state[state.length-1]['id'] + 1 : 1;
      return [...state,{id,...action.payload}]
  }
  return state
}

const addPost = (payload) => (
  {
    type:"post/ADD_POST",
    payload
  }
)


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
    console.log(this.props.posts);
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

function AddPostForm(props){
  const [title,setPostTitle] = React.useState("");
  const [content,setContent] = React.useState("")
  function handleSubmit(){
    if(!title){
      window.alert("标题不能为空");
      return;
    }
    if(!content){
      window.alert("内容不能为空")
      return;
    }
    props.addPost({
      title,
      content
    })
    setPostTitle("");
    setContent("");
  }
  function onTitleChanged(event){
    let title = event.target.value.trim();
    setPostTitle(title);
  }
  function onContentChanged(event){
    let content = event.target.value.trim();
    setContent(content);
  }
  return (
    <section>
      <div className="block">
        <label htmlFor="postTitle">Post Title: </label>
        <input type="text" name="postTitle" value={title} onChange={onTitleChanged}/>
      </div>
      <div className="block">
        <label htmlFor="postContent">Content:</label>
        <textarea value={content} onChange={onContentChanged}></textarea>
      </div>
      <input type="submit" value="提交" className="submit-button" onClick={handleSubmit}/>
    </section>
  )
}
AddPostForm = connect(null,{addPost})(AddPostForm);

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <PostList/>
      <AddPostForm/>
    </React.Fragment>
  </Provider>,
  document.getElementById("post-feed")
)
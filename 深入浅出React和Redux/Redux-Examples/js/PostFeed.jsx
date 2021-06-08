const {createStore,combineReducers} = window.Redux;
const {Provider,connect} = window.ReactRedux;
const {BrowserRouter,Link,Route,Switch,useParams} = window.ReactRouterDOM;

let initial_posts = [
  {id:1,title:"First Post!",content:"Hello",userId:1},
  {id:2,title:"Second Post",content:"More text",userId:2}
]
let initial_users = [
  {id:0,name:"Tianna Jenkins"},
  {id:1,name:"Kevin Grant"},
  {id:2,name:"Madison Price"}
]

function users(state = initial_users,action){
  return state;
}

function posts (state = initial_posts,action){
  switch(action.type){
    case 'post/ADD_POST':
      let id = state.length > 0 ? state[state.length-1]['id'] + 1 : 1;
      return [...state,{id,...action.payload}];
    case 'post/UPDATE_POST':
      let {payload} = action;
      return state.map((post) => {
        if(post['id'] == payload.id){
          return Object.assign({},post,payload);
        }else{
          return post;
        }
      })
    default:
      return state;
  }
}

const addPost = (payload) => (
  {
    type:"post/ADD_POST",
    payload
  }
)
// Reducers should never calculate random values
const updatePost = (payload) => ({
  type:"post/UPDATE_POST",
  payload
})

const reducer = combineReducers({
  posts,
  users
})
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

let SinglePostPage = (props) => {
  let {id} = useParams();
  let find_post = props.posts.find(post => post['id'] === id*1);
  if(!find_post) return null;
  return (
    <div>
      <div className="title">{find_post['title']}</div>
      <div className="content">{find_post['content']}</div>
    </div>
  )
}
const mapStateToPostState = state => {
  return {
    posts:state.posts
  }
}
SinglePostPage = connect(mapStateToPostState,null)(SinglePostPage);

class PostList extends React.Component {
  constructor(props){
    super(props);
  }
  get_user = (id) => {
    let users = this.props.users;
    let find_user = users.find(user => user['id'] == id);
    return find_user['name']
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
              <div style={{color:'red'}}>Author: {this.get_user(post['userId'])}</div>
              <Link to={`/post/${post['id']}`}>
                <span style={{position:'absolute',right:'5px',bottom:'5px',cursor:'pointer'}}>
                  view post
                </span>
              </Link>
              <Link to={`/update/${post['id']}`}>
                <span>edit post</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    posts:state.posts,
    users:state.users
  }
}
PostList = connect(mapStateToProps,null)(PostList);

function AddPostForm(props){
  const [title,setPostTitle] = React.useState("");
  const [content,setContent] = React.useState("");
  const [user,setUser] = React.useState(0);
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
      content,
      userId:user
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
  function onUserChanged(event){
    let userId = event.target.value;
    setUser(userId);
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
      <div className="block">
        <select value={user} style={{width:'100%',height:'30px'}} onChange={onUserChanged}>
          {props.users.length > 0 && props.users.map((user) => (
            <option value={user['id']} key={user['id']}>{user['name']}</option>
          ))}
        </select>
      </div>
      <input type="submit" value="提交" className="submit-button" onClick={handleSubmit}/>
    </section>
  )
}
const mapStateToAddPost = state => {
  return {
    users:state.users
  }
}
AddPostForm = connect(mapStateToAddPost,{addPost})(AddPostForm);

function EditPostForm(props){
  let {id} = useParams();
  let find_post = props.posts.find(post => post['id'] == id);
  let [title,setTitle] = React.useState(find_post['title']);
  let [content,setContent] = React.useState(find_post['content']);
  function onTitleChanged(event){
    let title = event.target.value;
    setTitle(title);
  }
  function onContentChanged(event){
    let content = event.target.value;
    setContent(content);
  }
  function onConfirmUpdate(){
    props.updatePost({
      id,
      title,
      content
    })
  }
  return (
    <div>
      <div className="title">Edit Post</div>
      <Link to="/深入浅出React和Redux/Redux-Examples">返回</Link>
      <input type="text" className="edit-input" value={title} onChange={onTitleChanged}/>
      <textarea className="edit-textarea" value={content} onChange={onContentChanged}></textarea>
      <button className="update-button" onClick={onConfirmUpdate}>提交</button>
    </div>
  )
}
const mapStateToEdit = state => {
  return {
    posts:state.posts
  }
}
const mapDispatchToEdit = {updatePost}
EditPostForm = connect(mapStateToEdit,mapDispatchToEdit)(EditPostForm);

function PostPage(){
  return (
    <React.Fragment>
      <PostList/>
      <AddPostForm/>
    </React.Fragment>
  )
}

function App(){
  return (
    <div>
      <Switch>
        <Route path="/深入浅出React和Redux/Redux-Examples/" children={<PostPage/>} exact/>
        <Route path="/post/:id" children={<SinglePostPage/>}/>
        <Route path="/update/:id" children={<EditPostForm/>}/>
      </Switch>
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById("post-feed")
)
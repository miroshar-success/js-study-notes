const {createStore,combineReducers} = window.Redux;
const {Provider,connect} = window.ReactRedux;
const {BrowserRouter,Link,Route,Switch,useParams} = window.ReactRouterDOM;

let initial_posts = [
  {id:1,title:"First Post!",content:"Hello",userId:1,date:1621242220796,reactions:{thumbsUp:10,hooray:3,heart:3,rocket:100,eyes:7}},
  {id:2,title:"Second Post",content:"More text",userId:2,date:1621261220796,reactions:{thumbsUp:7,hooray:3,heart:13,rocket:20,eyes:9}}
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
      });
    case 'post/REACTION_ADD':
      let find_post = state.find(post => post['id'] == action.payload.id)
      let obj = find_post['reactions']; 
      let {name} = action.payload
      obj[name] += 1;
      return state.map((post) => {
        if(post['id'] === action.payload.id){
          return Object.assign({},post,{reactions:obj})
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

function reactionAdd(payload){
  console.log('payload:',payload);
  return {
    type:"post/REACTION_ADD",
    payload
  }
}

const reducer = combineReducers({
  posts,
  users
})
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function TimeAgo({date}){
  let time = new Date(date).toLocaleDateString();
  return <span style={{paddingLeft:'20px'}}>{time}</span>
}

let SinglePostPage = (props) => {
  let {id} = useParams();
  let find_post = props.posts.find(post => post['id'] === id*1);
  if(!find_post) return null;
  return (
    <div>
      <div className="title">{find_post['title']} </div>
      <TimeAgo date={find_post['date']}/>
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

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

function ReactiveButton(props){
  function handleClick(name){
    props.reactionAdd({
      id:props.post['id'],
      name
    })
  }
  const reactButtons = Object.entries(reactionEmoji).map(([name,emoji]) => (
    <button key={'button-'+name} onClick={handleClick.bind(null,name)}>{emoji} {props.post.reactions[name]}</button>
  ))
  return (reactButtons)
}
ReactiveButton = connect(null,{reactionAdd})(ReactiveButton)


class PostList extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props.posts);
    let orderedPosts = this.props.posts.slice().sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime() )
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {orderedPosts.length > 0 && orderedPosts.map((post,index) => (
            <li key={'post-'+index} className="post-item">
              <h3>{post['title']} ---- <TimeAgo date={post['date']}/></h3>
              <p>{post['content']}</p>
              <PostAuthor userId={post['userId']}/>
              <Link to={`/post/${post['id']}`}>
                <span style={{position:'absolute',right:'5px',bottom:'5px',cursor:'pointer'}}>
                  view post
                </span>
              </Link>
              <Link to={`/update/${post['id']}`}>
                <span>edit post</span>
              </Link>
              <ReactiveButton post={post}/>
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
  }
}
PostList = connect(mapStateToProps,null)(PostList);


function PostAuthor(props){
  let {users,userId} = props;
  let find_users = users.find(user => user['id'] == userId);
  if(!find_users){
    return <div>Unknown author</div>
  }
  return (
    <div style={{color:'red'}}>
      Author : {find_users['name']}
    </div>
  )
}
const mapStateToAuthor = state => {
  return {
    users:state.users
  }
}
PostAuthor = connect(mapStateToAuthor,null)(PostAuthor);


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
      userId:user,
      date:new Date().getTime()
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
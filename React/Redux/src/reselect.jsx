// 对redux缓存
const blogReducer = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
    case 'post/create':
      return state.concat(payload)
    case 'post/delete':
      return state.filter(post => post.id !== payload)
    default:
      return state
  }
}
// counter
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'counter/add':
      return state + 1
    case 'counter/reduce':
      return state - 1
    default:
      return state
  }
}

const reducers = combineReducers({
  blog: blogReducer,
  counter: counterReducer
})

const store = createStore(reducers)

const BlogInput = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const handleBlogChanged = (type, event) => {
    const text = event.target.value.trim()
    switch (type) {
      case 'title':
        setTitle(text)
        break
      case 'content':
        setContent(text)
        break
    }
  }
  const handleSubmit = () => {
    const id = Date.now()
    dispatch({
      type: 'post/create',
      payload: {
        id,
        timestamp: id,
        content,
        title
      }
    })
    setTitle('')
    setContent('')
  }
  return (
    <>
      <div>
        <input
          type="text" value={title}
          onChange={(e) => handleBlogChanged('title', e)}
          style={{width: 500, height: 24, outline: 'none', border:'1px solid #e8e8e8', marginBottom: 5 }}
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => handleBlogChanged('content', e)}
        style={{width: 300, height: 300, outline: 'none', resize: 'none', borderColor:'#e8e8e8' }}
      ></textarea>
      <button onClick={handleSubmit}>submit</button>
    </>
  )
}

const BlogItem = ({content, title, timestamp }) => {
  return (
    <li>
      <div>{title}</div>
      <p>{content}</p>
      <div style={{textAlign: 'right'}}>{timestamp}</div>
    </li>
  )
}
// 传入多个input, 返回的参数 依次传递给 最后一个output 函数作为参数
const selectBlogIds = createSelector(
  state => state.blog,
  (blog) => {
    return blog.map(item => item.id)
  }
)

const BlogList = () => {
  const blogList = useSelector(state => state.blog)
  const blogIds = useSelector(selectBlogIds)
  console.log('重新渲染:', blogIds) // 在新增counter的时候 未更新
  return (
    <>
      <ul>
        { blogList.map(blog => (<BlogItem {...blog} key={blog.id}/>))}
      </ul>
    </>
  )
}

const BlogApp = () => {
  return (
    <>
      <BlogInput/>
      <BlogList/>
    </>
  )
}

const doubleCounter = createSelector(
  state => state.counter,
  counter => counter * 2
)

// counter-app
const CounterApp = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter) // 仅仅返回当前组件需要的数据 防止重新渲染
  const double = useSelector(state => state.counter * 2)
  return (
    <>
      <button onClick={() => dispatch({type: 'counter/add'})}>add</button>
      <button>{counter} - double: {double}</button>
      <button onClick={() => dispatch({type: 'counter/reduce'})}>reduce</button>
    </>
  )
}

createRoot(document.getElementById('reselect-app'))
.render(
  <Provider store={store}>
    <BlogApp/>
    <CounterApp/>
  </Provider>
)
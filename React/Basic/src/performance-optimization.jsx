const todoList = [
  {id: 1, text: '学习React'},
  {id: 2, text: '学习Redux'},
  {id: 3, text: '学习React Redux'}
]


class TodoItem extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('render')
    return (<li style={this.props.style}>{this.props.text}</li>)
  }
}
// 将style 提取出来   防止子组件重复渲染
const todoStyle = { color: 'red' }
const TodoList = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count => count + 1)
  }
  return (
    <>
      <button onClick={handleClick}>click {count} times</button>
      <ul>
        {/* 传递一个style对象 */}
        { todoList.map(todo => (<TodoItem style={todoStyle} {...todo} key={todo.id}/>))}
      </ul>
    </>
  )
}

const App = () => (
  <>
    <TodoList/>
  </>
)

createRoot(document.getElementById('performance-optimization-app'))
.render(<App/>)

// react-addons-perf  性能优化插件
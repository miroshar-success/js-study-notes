// 将子组件作为props传递
const Layout = (props) => {
  return (
    <div className='layout-page'>
      <div className="left">{props.left}</div>
      <div className="content">{props.content}</div>
    </div>
  )
}

const LeftNav = () => (
  <ul>
    <li>首页</li>
    <li>天气</li>
  </ul>
)
const Content = () => (
  <>
    Hello World
  </>
)

const App = () => (
  <Layout
    left={<LeftNav/>}
    content={<Content/>}
  />
)

createRoot(
  document.getElementById('combination-pattern-app')
).render(
  <App/>
)
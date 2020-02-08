# React-Router-Dom
    
    使用:
    npm install --save react-router-dom
    
    import { BrowserRouter, Route, Link } from "react-router-dom";    

## Router Component

    BrowserRouter and HashRouter
    
    tips:
        to use a router,just make sure it rendered at the root of your element hierarchy.
        Typically,you will wrap your top-level <App> element in a router;
```jsx harmony
import {BrowserRouter} from 'react-router-dom';
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById("app")
)
```
### props

    1. basename:
```jsx harmony
<BrowserRouter basename="/calendar" />
// <Link to="/today"/>  renders <a href="/calendar/today">
```
    2. foreRefresh
        当浏览器不支持HTML5的history API时强制刷新页面
    
    3.  getUserConfirmation:
        导航到页面前需要执行到函数，默认使用window.confirm
        
    4. keyLength:number
        设置路由的location.key的长度。默认时6


## Switch Component
    
    Renders the first child <Route> or <Redirect> that matches the location.
```jsx harmony
function App() {
  return (
    <div>
      <Switch>
        {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}
        <Route path="/about">
          <About />
        </Route>

        {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
        <Route path="/contact/:id">
          <Contact />
        </Route>
        <Route path="/contact">
          <AllContacts />
        </Route>

        {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
```
## Link and NavLink
    
    Link标签只会渲染为一个 a 标签
        <Link to="/">Home</Link>
        // <a href="/">Home</a>
        
    NavLink 可以给匹配的 导航标签 设置一个类名,默认是active,如果需要自定义 可以设置为 activeClassName="active"
    
        <NavLink to="/react" activeClassName="hurray">
          React
        </NavLink>
        
        // When the URL is /react, this renders:
        // <a href="/react" className="hurray">React</a>

### props
       
    Link的属性:
    
    to: String
        <Link to="/about">About</Link>
        <Link to="/courses?sort=name" />
    
    to: Object
        1. pathname: A string representing the path to link to.
        2. search: A string representation of query parameters.
        3. hash: A hash to put in the URL, e.g. #a-hash.
        4. state: State to persist to the location.
```jsx harmony
<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>
```

    replace: Boolean
        When true,clicking the link will replace the current entry in the history stack instead of 
        adding a new one.
        
    <Link to="/" replace/>


    NavLink的属性:
        
        activeClassName:string
        activeStyle:object
        exact:boolean

## Redirect

    将导航到一个新位置。新的位置将覆盖历史堆栈中的当前位置
    
    to: String | Object
    
        <Redirect to="/somewhere/else" />
        <Redirect
          to={{
            pathname: "/login",
            search: "?utm=your+face",
            state: { referrer: currentLocation }
          }}
        />    
    
    push:
        when true,redirecting will push a new entry onto the history instead of replacing the current one.

## Route
    
    path: 
        匹配到的地址
    exact:
        是否是精准匹配
    
    Route render methods:
        1. component
        2. children
        3. render
    tips:
        The recommended method of rendering something with a <Route> is to use children elements.
    
    Route props:
        All three render methods will be passed the same three route props:
            1. match
            2. location
            3. history

## Router-Hook API
    
    只有在 Route 的渲染函数 使用component 参数时,被渲染的函数组件才可以使用 这些Hook。
```jsx harmony
<div>
<Route path="/user" component={User}/>

// 这种写法在 user函数组件里无法 无法 使用 useParams 或者 useLocation等钩子函数
<Route path="/user">
    <User/>
</Route>

// 下面两种写法都会报错
<Route path="/user" render={User}/>
<Route path="/user" children={User}/>
</div>
```
    
    1. useParams()
        useParams returns an object of key/value pairs of URL parameters.Use it to access 
        match.params of the current <Route>.
        
    如果不使用useParams，在组件了使用 match.params获取 动态路由参数
```jsx harmony
function BlogPost() {
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/blog/:slug">
        <BlogPost />
      </Route>
    </Switch>
  </Router>,
  node
);
```
    2. useHistory()
        The useHistory hook gives you access to the history instance that you may use to navigate
```jsx harmony
import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }
  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```
    3. useLocation
        The useLocation hook returns the location object that represents the current URL
        
    4. useRouteMatch
    
# Prompt

    Used to prompt the user before navigating away from a page.When your application enters 
    a state that should prevent the user from navigating away(like a form is half-filled out)
    ,render a <Prompt>。
    
    message:
        type: String | Function
        The message to promot the user with when they try to navigate away.
```jsx harmony
// 使用useLocation 判断提示当前要去的地址
<Prompt
  message={location =>
    location.pathname.startsWith("/app")
      ? true
      : `Are you sure you want to go to ${location.pathname}?`
  }
/>

// 或者直接使用字符串 提示信息
<Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>
```
    when: 
        type: Boolean

## Url Params

```jsx harmony
// demo
// 函数组件可以使用 Hook useParams() 获取 动态路由的参数
function Child(){
    let {id} = useParams();
    return (
        <div>
            <h3>account:{id}</h3>
        </div>
    )
}

// class组件可以在 this.props 里 获取 params 参数
class Children extends React.Component {
    render(){
        let {match} = this.props;
        let account = match.params.id;
        return (
            <div>
                <h3>account : {account}</h3>
            </div>
        )
    }
}
class ParamsExample extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <h2>Accounts</h2>
                    <ul>
                        <li><Link to="/netflix">NetFlix</Link></li>
                        <li><Link to="/zillow-group">Zillow Group</Link></li>
                        <li><Link to="/yahoo">Yahoo</Link></li>
                        <li><Link to="/modus-create">Modus Create</Link></li>
                    </ul>
                    <Switch>
                        <Route path="/:id" component={Children} name={'kyrie'}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}
```       
    
    
    
    
    
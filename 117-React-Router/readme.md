# React-Router-Dom
    
    使用:
    npm install --save react-router-dom
    
    import { BrowserRouter, Route, Link } from "react-router-dom";    
    
## Router-Hook API

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
    
    
    
    
    
# React-Router
    
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
        
    when: 
        type: Boolean
        
        
    
    
    
    
    
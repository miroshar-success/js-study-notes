import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch
}
from "react-router-dom"
import './App.css';
import routes from "./router/index.js"

class App extends React.Component{
    render(){
        return (
            <Router>
                <div>
                    <ul className="head-nav">
                        <li><NavLink to="/" exact>首页</NavLink></li>
                        <li><NavLink to="/article">文章</NavLink></li>
                        <li><NavLink to="/website">网站导航</NavLink></li>
                        <li><NavLink to="/about">关于我们</NavLink></li>
                    </ul>
                    <Switch>
                        {
                            routes.map((item,index) => {
                                if(item.exact){
                                    return (<Route key={index} path={item.path} exact={item.exact} component={item.component}/>)
                                }
                                return (
                                    <Route
                                        key={index}
                                        path={item.path}
                                        component={item.component}
                                    />
                                )
                            })
                        }
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;

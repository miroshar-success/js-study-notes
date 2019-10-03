import React from 'react';
import './App.css';
import Home from "./components/Home.jsx"
import Detail from "./components/Detail.jsx"
import NotFound from "./components/NotFound.jsx"
import List from "./components/List.jsx"
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    Switch
}
from "react-router-dom"
class App extends React.Component{
    render(){
        return (
            <Router>
                <div className="App">
                    <ul>
                        <li><NavLink to="/">首页</NavLink></li>
                        <li><NavLink to="/list">列表</NavLink></li>
                        <li><NavLink to="/detail">详情</NavLink></li>
                    </ul>
                    <hr/>
                    <Switch>
                        <Route path="/" component={Home} exact></Route>
                        <Route path="/list" component={List}></Route>
                        <Route path="/detail" component={Detail}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;

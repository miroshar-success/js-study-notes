import React,{Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    NavLink,
    Route
}
from "react-router-dom"
import Home from "./components/Home.jsx"
import Topics from "./components/Topics";
import About from "./components/About";
class App extends Component {
    render(){
        return (
            <Router>
                <div>
                    <ul className="list">
                        <li><NavLink to="/" exact>Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/topics">Topics</NavLink></li>
                    </ul>
                    <hr/>
                    <Route path="/" component={Home} exact></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topics" component={Topics}></Route>
                </div>
            </Router>

        );
    }
}

export default App;

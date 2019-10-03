import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch
} from "react-router-dom"
import Btn from "./components/Button.jsx"
import IconFont from "./components/Icon.jsx"
import Paragraphy from "./components/Typography.jsx"
import Index from "./components/index.jsx"
import NotFound from "./components/NotFound";
import News from "./components/News.jsx"
class App extends React.Component{
    render(){
        return (
            <Router>
                <div>
                    <ul className="nav-list">
                        <li>
                            <NavLink to="/index" exact
                            activeClassName="selected">首页</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/button"
                                activeClassName="selected"
                            >Button
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/icon"
                                activeClassName="selected"
                            >Icon</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/typography"
                                activeClassName="selected"
                            >Typography</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/news"
                                activeClassName="selected">News</NavLink>
                        </li>
                    </ul>
                    <Switch>
                        <Route path="/index" exact component={Index}></Route>
                        <Route path="/button" component={Btn}></Route>
                        <Route path="/icon" component={IconFont}></Route>
                        <Route path="/typography" component={Paragraphy}></Route>
                        <Route path="/news" component={News}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;

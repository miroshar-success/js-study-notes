import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    Redirect
}
from "react-router-dom"
import Phone from "./Phone.jsx"
class News extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <NavLink
                                to="/news?phone=apple"
                                activeClassName="active"
                            >Apple</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/news?phone=mi"
                                activeClassName="active"
                            >Mi
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/news?phone=huawei"
                                activeClassName="active"
                            >HuaWei
                            </NavLink>
                        </li>
                    </ul>
                    {/*<Route path="/phone/:name" component={Phone}></Route>*/}
                    <Route path="/news" component={Phone}></Route>
                    <Redirect to="/news?phone=apple"></Redirect>
                </div>
            </Router>
        );
    }
}

export default News;
import React, {Component} from 'react';
import {
    NavLink,
    BrowserRouter as Router, Route
}
    from "react-router-dom"
import Player from "./Player";
class List extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
{/*                        <li><NavLink to="/player/james">詹姆斯</NavLink></li>
                        <li><NavLink to="/player/kyrie">欧文</NavLink></li>
                        <li><NavLink to="/player/durant">杜兰特</NavLink></li>*/}
                        <li><NavLink to="/player?name=james">詹姆斯</NavLink></li>
                        <li><NavLink to="/player?name=kyrie">欧文</NavLink></li>
                        <li><NavLink to="/player?name=durant">杜兰特</NavLink></li>
                    </ul>
                    {/*<Route path="/player/:name" component={Player} push></Route>*/}
                    <Route path="/player" component={Player} push></Route>
                </div>
            </Router>
        );
    }
}
export default List;
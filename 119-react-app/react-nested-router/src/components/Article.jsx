import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    NavLink,
    Route
}
from "react-router-dom"
import List from "./List.jsx"
class Article extends Component {
    render() {
        let path = this.props.match.path;
        return (
            <Router>
                <div className="main">
                    <ul className="left-nav">
                        <li><NavLink to={`${path}/all`}>全部文章</NavLink></li>
                        <li><NavLink to={`${path}/hot`}>热门下载</NavLink></li>
                        <li><NavLink to={`${path}/design`}>界面设计</NavLink></li>
                        <li><NavLink to={`${path}/recommend`}>酷站推荐</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route path={`${path}/:pages`} component={List}></Route>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Article;
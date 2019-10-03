import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    NavLink
}
from "react-router-dom"
import Topic from "./topic"
class Topics extends Component {
    render() {
        console.log(this.props);
        let path = this.props.match.path;
        return (
            <Router>
                <div>
                    <h2>Topics</h2>
                    <ul>
                        <li><NavLink to={`${path}/rendering`}>Rendering with React</NavLink></li>
                        <li><NavLink to={`${path}/components`}>Components</NavLink></li>
                        <li><NavLink to={`${path}/props-v-state`}>Props v.State</NavLink></li>
                    </ul>
                </div>
                <Route path={`${path}/:topicId`} component={Topic}></Route>
                <Route
                    exact
                    path={`${path}`}
                    render={()=><h3>Please set a Topic</h3>}
                ></Route>
            </Router>
        );
    }
}

export default Topics;
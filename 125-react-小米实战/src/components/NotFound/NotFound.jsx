import React, {Component} from 'react';
import "./index.scss"
class NotFound extends Component {
    render() {
        return (
            <div className="container">
                <img src={require("../../imgs/notfound.png")} alt=""/>
                <p className="sorry">咦~页面不见了~</p>
                <a href="/">返回首页 mi.com</a>
            </div>
        );
    }
}

export default NotFound;
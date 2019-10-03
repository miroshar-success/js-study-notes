import React, {Component} from 'react';

class NotFound extends Component {
    render() {
        return (
            <div>
                <h3>你要的网页走丢了</h3>
                <img src={require("../404.jpg")} alt=""/>
            </div>
        );
    }
}
export default NotFound;
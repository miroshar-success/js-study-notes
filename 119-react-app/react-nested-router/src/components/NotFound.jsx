import React, {Component} from 'react';

class NotFound extends Component {
    render() {
        return (
            <div>
                <p>你的网页走丢了</p>
                <img src={require("../static/imgs/timg.jpg")} width="300" alt="gcj"/>
            </div>
        );
    }
}

export default NotFound;
import React, {Component} from 'react';

class NotFound extends Component {
    render() {
        return (
            <div>
                <h4>Not Found</h4>
                <img src={require("../static/imgs/timg.jpg")} width="250" alt="gcj"/>
            </div>
        );
    }
}

export default NotFound;
import React, {Component} from 'react';

class Topic extends Component {
    render() {
        console.log(this.props);
        let topicId = this.props.match.params.topicId;
        return (
            <div>
                <h2>{topicId}</h2>
            </div>
        );
    }
}

export default Topic;
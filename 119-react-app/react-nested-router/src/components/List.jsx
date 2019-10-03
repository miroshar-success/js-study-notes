import React, {Component} from 'react';
class List extends Component {
    render() {
        return (
            <div>
                <p>我是文章分类页面---{this.props.match.params.pages}</p>
            </div>
        );
    }
}

export default List;
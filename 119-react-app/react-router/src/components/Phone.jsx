import React, {Component} from 'react';
import Url from "url"
class Phone extends Component {
    render() {
        console.log(this.props.location.search);
        let name = Url.parse(this.props.location.search,true);
        console.log(name.query.phone);
        return (
            <div>
                <p>{name.query.phone}</p>
            </div>
        );
    }
}
export default Phone;
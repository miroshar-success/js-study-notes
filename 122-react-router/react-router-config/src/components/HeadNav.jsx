import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

class HeadNav extends Component {
    constructor(props){
        super(props);
        console.log(this.props.name);
    }
    render() {
        return (
            <div>
                <ul className="header-nav">
                    <li className="iconfont icon-Vue">
                        <NavLink to="/tacos">Tacos</NavLink>
                    </li>
                    <li className="iconfont icon-React">
                        <NavLink to="/sandwiches">Sandwiches</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}
// 出于性能考虑,propTypes仅在开发环境下进行检查

HeadNav.propTypes = {
    title:PropTypes.bool
}
HeadNav.defaultProps = {
    name:"Stranger"
}
export default HeadNav;
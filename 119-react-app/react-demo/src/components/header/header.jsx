import React, {Component} from 'react';
import "./header.css"
class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            city:this.props.city
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        this.setState({
            city:nextProps.city
        })
    }
    render() {
        return (
            <div>
                <p className={"title"}>我是头部</p>
                <p>我现在在--{this.state.city}</p>
                <img src={require("../../imgs/1.jpg")} alt="gcj" width={"250"}/>
            </div>
        );
    }
}

export default Header;
import React, {Component} from 'react';
import "../../css/address.scss"
import {NavLink} from "react-router-dom";
import {addAddress} from "../../actions/user.js"
import {connect} from "react-redux";
class Map extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:"",
            tel:"",
            room:"",
            city:""
        }
    }
    userName = (e) => {
        this.setState({
            name:e.target.value
        })
    }
    userNumber =  e => {
        this.setState({
            tel:e.target.value
        })
    }
    userRoom = e => {
        this.setState({
            room:e.target.value
        })
    }
    userCity = (e) => {
        this.setState({
            city:e.target.value
        })
    }
    // 点击按钮，增加收货地址
    confirmAddress = () => {
        let address = {
            name:this.state.name,
            tel:this.state.tel,
            city:this.state.city,
            room:this.state.room
        };
        // 获取客户信息后再调用action,并传递用户地址数据
        this.props.addAddress({
            address
        })
    }
    render() {
        return (
            <div className="address_wrapper">
                <h4 className="title">新增收货地址</h4>
                <div className="user_info">
                    <div className="name">
                        <p>联系人</p>
                        <input
                            type="text"
                            onChange={this.userName}
                            value={this.state.name}
                            placeholder="姓名"
                        />
                    </div>
                    <div className="tel">
                        <p>电话</p>
                        <input
                            type="text"
                            onChange={this.userNumber}
                            value={this.state.tel}
                            placeholder="手机号码"
                        />
                    </div>
                    <div className="address">
                        <p>地址</p>
                        <input
                            type="text"
                            placeholder="地址"
                            onChange={this.userCity}
                            value={this.state.city}
                        />
                    </div>
                    <div className="room">
                        <p>门牌号</p>
                        <input
                            type="text"
                            placeholder="例: 5号楼203室"
                            onChange={this.userRoom}
                            value={this.state.room}
                        />
                    </div>
                </div>
                <div className="confirm">
                    <NavLink
                        to="/cart"
                        onClick={this.confirmAddress}
                    >
                        确认地址
                    </NavLink>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        address:state
    }
}
const mapActionToProps = {addAddress}
Map = connect(mapStateToProps,mapActionToProps)(Map);
export default Map;
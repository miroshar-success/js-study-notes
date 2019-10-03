import React, {Component} from 'react';
import "../../css/detail.scss"
import {connect} from "react-redux";
import {addCart} from "../../actions/index.js"
import {NavLink} from "react-router-dom";
class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.goods_id,
            goodsDetail:{},
            number:0
        }
    }
    componentDidMount(){
        // 通过传递过来的商品id获取商品信息
        fetch(`http://47.100.98.54:9020/api/buygoods/${this.state.id}`)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                this.setState({
                    goodsDetail:data
                })
            })
    }
    // 点击增加商品数量
    handleIncrement = () => {
        let number = parseInt(this.state.number);
        number += 1;
        this.setState({
            number
        })
    }
    // 点击减少商品数量
    handleDecrement = ()=>{
        let number = parseInt(this.state.number);
        number -= 1;
        if(number < 0) return;
        this.setState({
            number
        })
    }
    // 编辑商品数量
    changeNumber = (e)=>{
        this.setState({
            number:e.target.value
        })
    }
    // 加入购物车,调用action里的 addCart,返回一个 type "ADD_CART",传入数据 商品的id和number
    // {id:number}
    addCart = ()=>{
        if(this.state.number <= 0) return;
        this.props.addCart({
            id:this.state.id,
            number:this.state.number
        })
        window.alert("加购成功");
    }
    componentWillUnmount(){
        this.setState = ()=>{
            return
        }
    }
    render() {
        const {picurl,title,des,price} = this.state.goodsDetail;
        return (
            <div className="goods_detail">
                <div className="img">
                    <img src={picurl} alt=""/>
                </div>
                <div className="info">
                    <div className="goods_name">{title}</div>
                    <p className="goods_desc">{des}</p>
                    <p className="goods_price">
                        <span>{price}</span>
                    </p>
                </div>
                <div className="control">
                    <p className="amount">购买数量</p>
                    <div className="btns">
                        <input
                            type="button"
                            defaultValue="-"
                            onClick={this.handleDecrement}
                        />
                        <input
                            type="number"
                            value={this.state.number}
                            onChange={this.changeNumber}
                        />
                        <input
                            type="button"
                            defaultValue="+"
                            onClick={this.handleIncrement}
                        />
                    </div>
                    <button
                        className="add_cart"
                        onClick={this.addCart}
                    >加入购物车</button>
                </div>
                <div className="action_box">
                    <div className="home">
                        <NavLink to="/">
                            <i className="iconfont icon-shouyex"></i>
                            <p>首页</p>
                        </NavLink>
                    </div>
                    <div className="cart">
                        <NavLink to="/cart">
                            <i className="iconfont icon-daishouhuo"></i>
                            <p>购物车</p>
                        </NavLink>
                    </div>
                    <div className="buy">
                        <NavLink to="/cart">立即抢购</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        abcd:state
    }
}
const mapActionsToProps = {addCart}
Detail = connect(mapStateToProps,mapActionsToProps)(Detail);

export default Detail;
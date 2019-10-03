import React, {Component} from 'react';
import {connect} from "react-redux";
import {addCart,deleteGoods,getAll} from "../../actions/index.js"
import {getAddress} from "../../actions/user.js"
import "../../css/cart.scss"
import {NavLink} from "react-router-dom";
class Cart extends Component {
    constructor(props){
        super(props)
        this.state = {
            goods: [],
            price:0,
            count:0,
        }
    }
    getData = ()=>{
        // 获取添加到购物车的信息,
        let goodsId = Object.keys(this.props.cartState.cart);
        let goods = this.state.goods;
        goodsId.forEach((item) => {
            fetch(`http://47.100.98.54:9020/api/buygoods/${item}`)
                .then(response => response.json() )
                .then(data=>{
                    // 将通过id获取到的数据对象添加一个Number属性,number值为存储到本地的数据{id:number}
                    data["number"] = this.props.cartState.cart[item];
                    // 然后将每条数据添加到数组里,
                    goods.push(data);
                    this.setState({
                        goods
                    })
                })
        });
        this.result();
    }
    // 增加购物车里的商品数据,并更新redux里的state {id:number}的形式
    add(index){
        let goods = this.state.goods;
        let id = goods[index].shopid;
        // 更新当前商品数量
        goods[index].number++;
        this.setState({
            goods
        })
        // 注意此处的number是1,每次调用就加1,而不是增加商品本身的
        this.props.addCart({
            id,
            number:1
        })
        this.totalPrice();
    }
    // 减少购物车里的商品数据
    reduce(index){
        let goods = this.state.goods;
        let id = goods[index].shopid;
        // 如果商品数量等于0 直接返回
        if(goods[index].number === 1) return;
        // 更新商品数量 -1
        goods[index].number--;
        this.setState({
            goods
        })
        this.props.addCart({
            id,
            number:-1
        })
        this.totalPrice();
    }
    // 删除商品,传入商品的id,并调用action的 deleteGoods
    delGoods(index){
        let goods = this.state.goods;
        let id = goods[index].shopid;
        this.props.deleteGoods(id);
        goods.splice(index,1);
        this.setState({
            goods
        })
        this.totalPrice();
    }
    // 计算总价格
    result = () => {
        let Timer = setTimeout(()=>{
            clearTimeout(Timer);
            this.totalPrice();
        },200);
    }
    totalPrice = () => {
        let goods = this.state.goods;
        let [price,count] = [0,0];
        for(let item of goods){
            price += item.number * item.price;
            count += item.number;
        }
        this.setState({
            price,
            count
        })
    }
    // 获取用户地址
    getAddress = () => {
        let address = this.props.cartState.user.address;
        const oText = document.querySelector(".address>.text");
        if(address){
            oText.innerHTML = `
                <p className='city'>
                    ${address.city} 
                    ${address.room}
                </p>
                <p className="name">
                    <span className="name">${address.name}</span>
                    <span className="tel">${address.tel}</span>
                </p>`
        }else{
            oText.innerText = "请添加收货地址"
        }
    }
    componentDidMount(){
        this.getData();
        this.getAddress();
    }
    render() {
        return (
            <div className="cart_container">
                <div className="address">
                    <div className="text">
                        请添加收货地址
                    </div>
                    <NavLink to="/address">
                        <i className="iconfont icon-arrow"></i>
                    </NavLink>
                </div>
                <ol className="cart_list">
                    {
                        this.state.goods.length > 0 && (
                            this.state.goods.map((item,index)=>{
                                return(
                                    <li className="cart_item" key={index}>
                                        <a href="/" className="goods_poster">
                                            <img src={item.picurl} alt=""/>
                                        </a>
                                        <div className="info">
                                            <p className="name">{item.title}</p>
                                            <p className="price">
                                                售价: <span>{item.price}元</span>
                                            </p>
                                            <div className="number">
                                                <div className="button">
                                                    <button
                                                        className="reduce"
                                                        onClick={this.reduce.bind(this,index)}
                                                    >-</button>
                                                    <span className="mount">{item.number}</span>
                                                    <button
                                                        className="add"
                                                        onClick={this.add.bind(this,index)}
                                                    >+</button>
                                                </div>
                                                <i className="iconfont delete icon-shanchu"
                                                    onClick={this.delGoods.bind(this,index)}
                                                >
                                                </i>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        )
                    }
                </ol>
                <div className="bottom_submit">
                    <div className="total">
                        <p>共{
                            this.state.count
                        }件 金额:</p>
                        <p className="totalPrice">
                            {this.state.price}
                        </p>
                    </div>
                    <div className="continue_shop">
                        <NavLink to="/">
                            继续购物
                        </NavLink>
                    </div>
                    <div className="pay">去结算</div>
                </div>
            </div>
        );
    }
}
const mapCartState = (state) => {
    return{
        cartState:state,
    }
}
const mapCartAction = {addCart,deleteGoods,getAll,getAddress}
Cart = connect(mapCartState,mapCartAction)(Cart);
export default Cart;
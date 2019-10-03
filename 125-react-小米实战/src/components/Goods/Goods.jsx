import React, {Component} from 'react';
import "../../css/goods.scss"
import {NavLink} from "react-router-dom";
import LazyLoad from "react-lazy-load"
class Goods extends Component {
    constructor(props){
        super(props);
        this.state = {
            goods:[]
        }
    }
    componentDidMount(){
        fetch("http://47.100.98.54:9020/api/goods")
            .then(response=>response.json())
            .then(result=>{
                this.setState({
                    goods:result.data
                })
            })
    }
    componentWillUnmount(){
        this.setState = ()=>{
            return
        }
    }
    render() {
        return (
            <section className="goods_container">
                <ul className="goods_list">
                    {
                        this.state.goods.length > 0 && (
                            this.state.goods.map((item,index)=>{
                                return (
                                    <li className="goods_item" key={index}>
                                        <NavLink to={`/detail/${item.shopid}`}>
                                            <div className="img">
                                                <LazyLoad height={200}>
                                                    <img src={item.picurl} alt=""/>
                                                </LazyLoad>
                                            </div>
                                            <div className="info">
                                                <p className="goods_title">{item.title}</p>
                                                <p className="goods_desc">{item.desc}</p>
                                                <p className="goods_price">{item.price}</p>
                                            </div>
                                        </NavLink>
                                    </li>
                                )
                            })
                        )
                    }
                </ul>
            </section>
        );
    }
}
export default Goods;
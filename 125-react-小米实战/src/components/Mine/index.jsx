import React, {Component} from 'react';
import TabBar from "../Footer/TabBar.jsx"
import "../../css/mine.scss"
class Mine extends Component {
    render() {
        return (
            <div className="mine">
                <header className="login">
                    <div className="user">
                        <div className="img">
                            <img src={require("../../imgs/avatar.png")} alt=""/>
                        </div>
                        <p className="text">登录/注册</p>
                    </div>
                </header>
                <section className="order">
                    <p className="title">
                        <span className="my">我的订单</span>
                        <span className="all">
                            全部订单
                            <i className="iconfont icon-arrow"></i>
                        </span>
                    </p>
                    <ul className="options">
                        <li className="dfk">
                            <a href="/">
                                <i className="iconfont icon-daifukuan"></i>
                                <p>待付款</p>
                            </a>
                        </li>
                        <li className="dsh">
                            <a href="/">
                                <i className="iconfont icon-daishouhuo"></i>
                                <p>待收货</p>
                            </a>
                        </li>
                        <li className="thx">
                            <a href="/">
                                <i className="iconfont icon-weixiu"></i>
                                <p>退换修</p>
                            </a>
                        </li>
                    </ul>
                </section>
                <ul className="items">
                    <li className="i_member">
                        <i className="iconfont icon-huiyuan"></i>
                        <a href="/">
                            <span>会员中心</span>
                        </a>
                    </li>
                    <li className="i_wallet">
                        <i className="iconfont icon-coupon"></i>
                        <a href="/">
                            <span>我的优惠</span>
                        </a>
                    </li>
                </ul>
                <ul className="items">
                    <li className="i_service">
                        <i className="iconfont icon-fuwuzhongxin"></i>
                        <a href="/">
                            <span>服务中心</span>
                        </a>
                    </li>
                    <li className="i_house">
                        <i className="iconfont icon-xiaomi"></i>
                        <a href="/">
                            <span>小米之家</span>
                        </a>
                    </li>
                </ul>
                <ul className="items">
                    <li className="i_setting">
                        <i className="iconfont icon-shezhi"></i>
                        <a href="/">
                            <span>设置</span>
                        </a>
                    </li>
                </ul>
                <TabBar/>
            </div>
        );
    }
}

export default Mine;
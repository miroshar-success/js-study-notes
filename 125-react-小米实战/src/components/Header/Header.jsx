import React, {Component} from 'react';
import "../../css/header.scss";
class Header extends Component {
    render() {
        return (
            <header className="header">
                <section className="header_wrapper">
                    <div className="header-left">
                        <div className="logo"></div>
                    </div>
                    <div className="header-middle">
                        <i className="iconfont search-icon icon-iconfontzhizuobiaozhun22"></i>
                        <span>搜索商品名称</span>
                    </div>
                    <div className="header-right">
                        <i className="iconfont user icon-user"></i>
                    </div>
                </section>
                <section className="top_nav">
                    <ul className="nav_list">
                        <li className="active"><span>推荐</span></li>
                        <li><span>手机</span></li>
                        <li><span>小米618</span></li>
                        <li><span>智能</span></li>
                        <li><span>电视</span></li>
                        <li><span>家电</span></li>
                        <li><span>笔记本</span></li>
                        <li><span>生活周边</span></li>
                    </ul>
                    <div className="arrow">
                        <i className="iconfont icon-arrow-down"></i>
                    </div>
                </section>
            </header>
        );
    }
}

export default Header;
import React, {Component} from 'react';
import {
    NavLink
}
from "react-router-dom"
import "../../css/tabbar.scss"
class TabBar extends Component {
    render() {
        return (
            <div className="tabbar">
                <NavLink to="/" exact className="tab_item">
                    <i className="iconfont icon-shouyex bottom_icon"></i>
                    <span>首页</span>
                </NavLink>
                <NavLink to="/category" className="tab_item">
                    <i className="iconfont icon-fenlei bottom_icon"></i>
                    <span>分类</span>
                </NavLink>
                <NavLink to="/cart" className="tab_item">
                    <i className="iconfont icon-gouwuche bottom_icon">
                    </i>
                    <span>购物车</span>
                </NavLink>
                <NavLink to="/mine" className="tab_item">
                    <i className="iconfont icon-iconfuzhi bottom_icon"></i>
                    <span>我的</span>
                </NavLink>
            </div>
        );
    }
}
export default TabBar;
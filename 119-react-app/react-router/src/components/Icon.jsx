import React, {Component} from 'react';
import {Icon} from "antd"
import "../icon.css"
class IconFont extends Component {
    render() {
        return (
            <div>
                <section className="icons">
                    <Icon type="step-backward" />
                    <Icon type="step-forward" />
                    <Icon type="left-circle" />
                    <Icon type="up-circle" theme="filled" />
                    <Icon type="left-circle" theme="filled" />
                    <Icon type="right-circle" theme="filled" />
                </section>
                <section className="website">
                    <Icon type="github" theme="filled" />
                    <Icon type="apple" theme="filled" />
                    <Icon type="facebook" theme="filled" />
                    <Icon type="alipay-circle" theme="filled" />
                    <Icon type="codepen-circle" theme="filled" />
                    <Icon type="chrome" theme="filled" />
                </section>
                <section className="loading">
                    <Icon type={"sync"} spin/>
                    <Icon type="loading"/>
                </section>
            </div>
        );
    }
}

export default IconFont;
import React, {Component} from 'react';
import {StatusBar} from "react-native";
export default class Status extends Component {
    render() {
        // 设置状态栏背景色为透明,从顶部开始布局
        return (
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={"transparent"}
                translucent={true}
            />
        );
    }
}


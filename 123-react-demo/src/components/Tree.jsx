import React, {Component} from 'react';
import echarts from "echarts"
import {option} from "../data/tree.js"
class Tree extends Component {
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(option);
    }
    render() {
        return (
            <div className="container" id="main">
            </div>
        );
    }
}
export default Tree;
import React, {Component} from 'react';
import echarts from "echarts"
import {option} from "../data/map.js"
class Progress extends Component {
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
export default Progress;
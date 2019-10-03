import React, {Component} from 'react';
import echarts from "echarts";
import {option} from "../data/rain.js"
class Bar extends Component {
    componentDidMount(){
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(option);
    }
    render() {
        return (
            <div className="container" id="main"></div>
        );
    }
}

export default Bar;
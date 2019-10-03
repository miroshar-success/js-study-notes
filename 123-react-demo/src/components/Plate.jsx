import React, {Component} from 'react';
import {option} from "../data/plate.js"
import echarts from "echarts"
class Plate extends Component {
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

export default Plate;
import React, {Component} from 'react';
import {option} from "../data/pie.js";
import echarts from "echarts";
class Pie extends Component {
    componentDidMount(){
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

export default Pie;
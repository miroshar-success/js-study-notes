import React, {Component} from 'react';
import "../css/home.css"
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            x:300,
            y:300,
            hour:new Date().getHours(),
            min:new Date().getMinutes(),
            sec:new Date().getSeconds(),
            millsec:new Date().getMilliseconds(),
            startAngle:-90*(Math.PI/180),
            date:new Date().toDateString(),
            time:new Date().toLocaleString()
        }
    }
    init = () => {
        let canvas = document.getElementById("canvas");
        canvas.width = 600;
        canvas.height = 600;
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = 20;
        ctx.strokeStyle = "#0ff";
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#0ff";
        const gradient = ctx.createRadialGradient(this.state.x,this.state.y,0,this.state.x,this.state.y,300);
        gradient.addColorStop(0,'#03303a');
        gradient.addColorStop(1,'#000');
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        let time = {
            HourAngle:(this.state.hour*15-90)*Math.PI/180,
            minAngle:(6*this.state.min-90)*Math.PI/180,
            secAngle:((this.state.sec+this.state.millsec/1000)*6-90)*Math.PI/180
        }
        ctx.arc(this.state.x,this.state.y,280,this.state.startAngle,time.HourAngle );
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.state.x,this.state.y,230,this.state.startAngle,time.minAngle);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.state.x,this.state.y,170,this.state.startAngle,time.secAngle);
        ctx.stroke();

        ctx.fillStyle = '#0ff';
        ctx.font = '24px 微软雅黑';
        ctx.fillText( new Date().toDateString(),195,280 );
        ctx.fillText( new Date().toLocaleTimeString() + ':' + this.state.millsec ,195,330 );
    }
    timeUpdate = ()=>{
        this.setState({
            hour:new Date().getHours(),
            min:new Date().getMinutes(),
            sec:new Date().getSeconds(),
            millsec:new Date().getMilliseconds(),
            date:new Date().toDateString(),
            time:new Date().toLocaleString()
        })
        this.init();
        window.requestAnimationFrame(this.timeUpdate);
    }
    componentDidMount(){
        this.timeUpdate();
    }
    componentWillUnmount(){
        this.setState = ()=>{
            return
        }
        this.init = () => {
            return
        }
    }
    render() {
        return (
            <div className="container">
                <canvas id="canvas"></canvas>
            </div>
        );
    }
}

export default Home;
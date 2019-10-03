import React, {Component} from 'react';
import "../../css/recommend.scss"
class Recommend extends Component {
    constructor(){
        super()
        this.state = {
            img:""
        }
    }
    componentDidMount(){
        fetch("http://47.100.98.54:9020/api/conference")
            .then(response=>response.json())
            .then(result=>{
                this.setState({
                    img:result.data.picurl
                })
            })
    }
    componentWillUnmount(){
        this.setState = ()=>{
            return
        }
    }
    render() {
        return (
            <section className="recommend-container">
                <div className="recommend">
                    <div className="left">
                        <img src={require("../../imgs/recommend-left.png")} alt=""/>
                    </div>
                    <div className="top">
                        <img src={require("../../imgs/recommend-top.png")} alt=""/>
                    </div>
                    <div className="bottom">
                        <img src={require("../../imgs/recommend-bottom.png")} alt=""/>
                    </div>
                </div>
                <div className="conference">
                    <a href="/">
                        <img src={this.state.img} alt=""/>
                    </a>
                </div>
            </section>

        );
    }
}

export default Recommend;
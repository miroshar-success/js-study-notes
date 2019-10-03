import React, {Component} from 'react';
import "../../css/banner.scss";
import {Carousel,WingBlank} from "antd-mobile"
import {
    NavLink
}
from "react-router-dom"
import LazyLoad from "react-lazy-load"
class Banner extends Component {
    constructor(props){
        super(props);
        this.state = {
            banner:[]
        }
    }
    componentDidMount(){
        fetch("http://47.100.98.54:9020/api/banner")
            .then(response=>response.json())
            .then(result=>{
                this.setState({
                    banner:result.data
                })
            })
    }
    render() {
        return (
            <WingBlank className="banner">
                <Carousel
                    className="banner_wrapper"
                    autoplay
                    infinite
                    dots
                    autoplayInterval={3000}
                    dotStyle={{backgroundColor:"rgba(255,255,255,0.2)"}}
                    dotActiveStyle={{backgroundColor:"#fff"}}
                >
                    {
                        this.state.banner.length > 0 && (
                            this.state.banner.map((val,index)=>{
                                return(
                                    <LazyLoad height={200} key={index}>
                                        <NavLink to={`/detail/${val.shopid}`} >
                                            <img src={val.picurl} alt={val.alt}/>
                                        </NavLink>
                                    </LazyLoad>

                                )
                            })
                        )
                    }
                </Carousel>
            </WingBlank>
        );
    }
}
export default Banner;
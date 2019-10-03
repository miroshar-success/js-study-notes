import React, {Component} from 'react';
import {View,Text,Image,StyleSheet} from "react-native";
import Swiper from "react-native-swiper";
import {scaleHeight, scaleWidth} from "../../utils/ScreenUI";
export default class HomeBanner extends Component {
    constructor(props){
        super(props);
        this.state = {
            banners:[]
        }
    }
    componentDidMount(){
        fetch('http://192.168.1.107:3000/banner')
            .then(response=>response.json())
            .then(data=>{
                this.setState({banners:data.banners})
            })
    }
    render() {
        return (
            <View style={styles.banner}>
                <Swiper
                    key={this.state.banners.length}
                    activeDotColor={"#ea473b"}
                    dotColor={"rgba(255,255,255,.6)"}
                    autoplay={true}
                    loop={true}
                    autoplayTimeout={3.5}
                    paginationStyle={{bottom:scaleHeight(12)}}
                >
                    {
                        this.state.banners.length > 0 && (
                            this.state.banners.map((item,index)=>{
                                return(
                                    <View
                                        key={index}
                                        style={styles.bannerItem}>
                                        <Image
                                            style={styles.bannerImg}
                                            source={{uri:item.imageUrl}}
                                        />
                                        <Text style={[styles.bannerTitle,{backgroundColor:item.titleColor}]}>{item.typeTitle}</Text>
                                    </View>
                                )
                            })
                        )
                    }
                </Swiper>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    banner:{
        paddingHorizontal:scaleWidth(32),
        height:scaleHeight(266),
        backgroundColor:"#ffffff",
    },
    bannerItem:{
        position:"relative",
        width:scaleWidth(686),
        height:scaleHeight(266),
        borderRadius:scaleHeight(12),
        overflow:"hidden"
    },
    bannerImg:{
        width:"100%",
        height:"100%",
    },
    bannerTitle:{
        position:"absolute",
        zIndex:100,
        bottom:0,
        right:0,
        width:scaleWidth(114),
        height:scaleHeight(34),
        textAlign:"center",
        color:"#fff",
        borderTopLeftRadius:scaleHeight(12)
    }
})

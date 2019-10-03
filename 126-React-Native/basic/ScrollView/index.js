import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
}
from "react-native"
class ScrollContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            banners:[]
        }
    }
    componentDidMount(){
        fetch("https://api.wulv5.com/music/banner?type=1")
            .then(response=>response.json())
            .then(result=>{
                this.setState({banners:result.banners})
            })
    }
    render() {
        return (
            <View>
                <ScrollView>
                    <Text>网易云音乐轮播图</Text>
                    {
                        this.state.banners.length > 0 && this.state.banners.map((item,index)=>{
                            return (
                                <View key={index}>
                                    <Image
                                        style={styles.banner}
                                        source={{uri:item.imageUrl}}
                                    />
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    banner:{
        width:"100%",
        height:200
    }
})
export default ScrollContent;
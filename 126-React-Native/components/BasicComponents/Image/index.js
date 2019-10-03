import React, {Component} from 'react';
import {Image,View,StyleSheet} from "react-native";
export default class ImageComponent extends Component {
    handleStart = ()=>{
        console.log("开始加载");
    }
    handleLoaded = () => {
        console.log("图片加载完成");
    }
    handleEnd = () => {
        console.log("加载结束");
    }
    handleProgress(e){
        console.log(e.nativeEvent)
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    onLoad={this.handleLoaded}
                    onLoadEnd={this.handleEnd}
                    onLoadStart={this.handleStart}
                    style={styles.img}
                    source={{uri:`https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1555861500,2136830952&fm=26&gp=0.jpg`}}
                />
                <View
                    style={styles.content}
                >
                    <Image
                        style={{width:300,height:300,resizeMode:"contain"}}
                        source={require("./gcj.jpg")}
                        onProgress={this.handleProgress}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    img:{
        width:250,
        height:250,
        borderTopRightRadius:8,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:8,
        borderTopLeftRadius:5,
        borderColor:"red",
        backgroundColor:"#000",
        borderWidth:2,
        opacity:0.8,
        overflow:"hidden",
        overlayColor:"red",
    },
    content:{
        width:300,
        height:300,
        borderWidth:1,
        borderColor:"#f00",
    }
})



















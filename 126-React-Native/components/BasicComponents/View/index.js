import React, {Component} from 'react';
import {View,Text,StyleSheet,Image,Dimensions,ScrollView} from "react-native";
const {width} = Dimensions.get("window");
class ViewComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            banners:[],
            loaded:false,
            current:0
        }
        this.Timer = null;
        this.scrollElement = null;
        this.bannerRef = element => {
            this.scrollElement = element;
        }
    }
    componentDidMount(){
        fetch(`http://192.168.1.107:3000/banner`)
            .then(response => response.json())
            .then(data => {
                this.setState({banners:data.banners,loaded:true});
            })
        this.AutoPlay();
    }
    renderLoading(){
        return(
            <View>
                <Text>正在加载轮播图数据......</Text>
            </View>
        )
    }
    createIndicator(){
        let dotStyle = {}
        return(
            this.state.banners.length > 0 && (
                this.state.banners.map((item,index)=>{
                    dotStyle = (index === this.state.current) ? {color:"red"} : {color:"rgba(0,0,0,.5)"}
                    return(
                        <Text
                            key={index}
                            style={[styles.dot,dotStyle]}
                        >&bull;</Text>
                    )
                })
            )
        )
    }
    AutoPlay(){
        this.Timer = setInterval(()=>{
            // 每隔2500ms, 图片的序号自动增加1,如果到了最后一张图片,则重置为0
            let current = this.state.current;
            current++;
            if (current >= this.state.banners.length) current = 0;
            this.setState({current});
            this.scrollElement.scrollTo({
                x:this.state.current * width,
                y:0,
                animated:true,
                duration:500
            })
        },3000);
    }
    handleBeginDrag = (event)=>{
        console.log("开始拖动视图",event);
        clearInterval(this.Timer);
    }
    handleEndDrag = ()=>{
        console.log("拖动结束");
        this.AutoPlay();
    }
    handleScrollBegin = ()=>{
        console.log("滚动开始");
    }
    handleScrollBanner = (event) => {
        console.log("滚动结束");
        let offsetX = event.nativeEvent.contentOffset.x;
        let current = Math.floor(offsetX/width);
        this.setState({current});
    }
    render() {
        const {banners} = this.state;
        if(!this.state.loaded){
            return this.renderLoading();
        }
        return (
            <View>
                <View style={{
                    flexDirection:"row",
                    height:100,
                    padding:20
                }}>
                    <View style={{backgroundColor:"skyblue",flex:0.3}}></View>
                    <View style={{backgroundColor:"pink",flex:0.5}}></View>
                </View>
                <View style={styles.banner}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        pagingEnabled={true}
                        style={{flex:1}}
                        decelerationRate={"fast"}
                        ref={this.bannerRef}
                        onMomentumScrollEnd={this.handleScrollBanner}
                        onMomentumScrollBegin={this.handleScrollBegin}
                        onScrollBeginDrag={this.handleBeginDrag}
                        onScrollEndDrag={this.handleEndDrag}
                    >
                        {
                            banners.length > 0 && (
                                banners.map((item,index) => {
                                    return(
                                        <View
                                            style={
                                                {width,height:150,paddingHorizontal:10}
                                            }
                                            key={index}>
                                            <Image
                                                style={{
                                                    width:"100%",
                                                    height:"100%",
                                                    borderRadius:5,
                                                }}
                                                source={{uri:item.imageUrl}}
                                            />
                                        </View>
                                    )
                                })
                            )
                        }
                    </ScrollView>
                    <View style={styles.indicator}>
                        {this.createIndicator()}
                    </View>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    indicator:{
        position:"absolute",
        bottom:5,
        zIndex:10,
        height:25,
        width:width,
        flexDirection:"row",
        justifyContent:"center",
    },
    dot:{
        marginHorizontal:3,
        fontSize:26,
        color:"rgba(0,0,0,.5)",
    },
    banner:{
        position:"relative",
        height:150,
    }
})

export default ViewComponent;


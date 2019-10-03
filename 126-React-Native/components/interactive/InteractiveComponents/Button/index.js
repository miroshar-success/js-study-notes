import React, {Component} from 'react';
import {View,Button,Text,TouchableHighlight,TouchableOpacity,TouchableNativeFeedback} from "react-native";
import BtnComponent from "./button.js";
export default class ButtonComponent extends Component {
    constructor(props){
        super(props);
        this.loadingDataEle = null;
        this.loadingDataRef = element => {
            this.loadingDataEle = element;
        }
    }
    handleLearn = () => {
        console.log("我被提交了");
    }
    fetchData = () => {
        this.loadingDataEle.dataLoading();
/*        fetch(`https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json`)
            .then(response => response.json())
            .then(data=>{
                console.log(data.movies);
            })*/
        this.timer = setTimeout(()=>{
            console.log("数据获取完成");
            this.loadingDataEle.dataEnd();
        },3000)
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={{alignItems:"center"}}>
                <Text>我是交互控件Button</Text>
                <Button
                    title={"Learn More"}
                    color={"#841584"}
                    onPress={this.handleLearn}
                />
                <Button
                    color={"#f6f6f6"}
                    disabled={true}
                    title={"我不能被点击"}
                />
                <DesignButtonHighlight/>
                <DesignButtonOpacity/>
                <BtnComponent
                    title={"取消"}
                    color={"#fff"}
                    width={120}
                    height={40}
                    backgroundColor={"green"}
                />
                <BtnComponent
                    title={"确认"}
                    color={"#fff"}
                    width={200}
                    height={50}
                    backgroundColor={"#000"}
                />
                {/* 点击按钮获取数据,获取数据后修改按钮的状态*/}
                <BtnComponent
                    title={"提交数据"}
                    color={"#fff"}
                    backgroundColor={"blue"}
                    width={150}
                    height={40}
                    onPress={this.fetchData}
                    ref={this.loadingDataRef}
                />
                <Text>TouchableNativeFeedback</Text>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                    <View style={{width:120,height:60,backgroundColor:"pink",borderRadius:10}}>
                        <Text style={{textAlign:"center",lineHeight:60,color:"#fff",fontSize:20}}>Button</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple("red",false)}
                >
                    <View
                        style={{
                            width:120,
                            height:60,
                            backgroundColor:"skyblue",
                            borderRadius:10,
                            overflow:"hidden"
                        }}
                    >
                        <Text
                            style={{
                                textAlign:"center",
                                lineHeight:60,
                                color:"#ffffff",
                                fontSize:18
                            }}
                        >涟漪状背景</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

class DesignButtonHighlight extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            count:0
        }
    }
    handleButton = () => {
        this.setState({
            count:this.state.count+1
        })
    }
    render(){
        return(
            <View>
                <TouchableHighlight
                    onPress={this.handleButton}
                    activeOpacity={0.9}
                    underlayColor={"green"}
                    style={{width:200,height:40,backgroundColor:"green",borderRadius:20}}
                >
                    <Text style={{textAlign:"center",lineHeight:40,color:"#fff"}}>我是封装的按钮组件</Text>
                </TouchableHighlight>
                <Text>{this.state.count}</Text>
            </View>

        )
    }
}

class DesignButtonOpacity extends React.Component{
    render(){
        return(
            <TouchableOpacity
                style={{width:100,height:40,borderRadius:20,backgroundColor:"red"}}
            >
                <Text style={{textAlign:"center",lineHeight:40,color:"#fff"}}>确定</Text>
            </TouchableOpacity>
        )
    }
}

























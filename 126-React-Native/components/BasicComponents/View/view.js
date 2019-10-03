import React, {Component} from 'react';
import {View,Text,StyleSheet,Button} from "react-native";
class ViewComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            flag:true,
            isClicked:true
        }
    }
    handlePress(event){
        console.log(event.nativeEvent);
    }
    handleChangeColor = (e) => {
        console.log(e.nativeEvent);
        this.setState({
            flag:!this.state.flag
        })
    }
    handleLayout = (e) =>{
        console.log(e.nativeEvent);
    }
    handleLay = (e) => {
        console.log(e.nativeEvent);
    }
    handleChangePosition = () => {
        this.setState({
            isClicked:!this.state.isClicked
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View
                    style={styles.btn}
                    onPress={()=>{this.handlePress()}}
                >
                    <Text style={{textAlign:"center",lineHeight:50,color:"white"}}>Hello World!</Text>
                </View>
                <Button
                    onPress={this.handlePress}
                    title={"点我"}
                />
                <Text selectable={true}>Hello World!</Text>
                <Text
                    onLayout={this.handleLayout}
                    onPress={this.handleChangeColor}
                    style={this.state.flag?styles.text:styles.red}
                >点击我变红色</Text>
                <View style={styles.content}>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode={"head"}
                    >头部省略:表示当 Text 组件无法全部显示需要显示的字符串时如何用省略号进行修饰</Text>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode={"middle"}
                    >
                        头部省略:表示当 Text 组件无法全部显示需要显示的字符串时如何用省略号进行修饰
                    </Text>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode={"tail"}
                    >
                        头部省略:表示当 Text 组件无法全部显示需要显示的字符串时如何用省略号进行修饰
                    </Text>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode={"clip"}
                    >
                        头部省略:表示当 Text 组件无法全部显示需要显示的字符串时如何用省略号进行修饰
                    </Text>
                </View>
                <Text
                    onPress={this.handleChangePosition}
                    onLayout={this.handleLay}
                    style={this.state.isClicked?styles.text:styles.left}
                >点我修改样式</Text>
                <Text
                    onPress={()=>{alert("我被点击了")}}
                >
                    我被点击了
                </Text>
                <Text
                    onLongPress={()=>{alert("我被长按了")}}
                >
                    我被长按了
                </Text>
                <Text
                    selectable={true}
                    selectionColor={"red"}
                >selectable</Text>
                <Text
                    style={styles.style}
                >the style of Text component Text组件的样式</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"pink",
        alignItems:"center",
        justifyContent:"center"
    },
    btn:{
        height:50,
        width:200,
        backgroundColor:"red",
        borderRadius:8
    },
    text:{
        color:"#000"
    },
    red:{
        color:"#f00"
    },
    content:{
        width:200,
        height:200,
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"#000",
        justifyContent:"space-around"
    },
    left:{
        transform:[{translateX:20}]
    },
    style:{
        color:"black",
        fontSize:20,
        fontWeight:"bold",
        lineHeight:30,
        textAlign:"left",
        textDecorationLine:"underline",
        textShadowColor:"#f00",
        fontFamily:"宋体",
        textShadowRadius:2,
        letterSpacing:3,
        textTransform:"uppercase"
    }
})

export default ViewComponent;














import React, {Component} from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ImageBackground
}
    from "react-native"

let {width, height} = Dimensions.get("window");

class ImageComponent extends Component {
    render() {
        return (
            <View>
                <View style={styles.wrapper}>
                    <Image
                        style={styles.img}
                        source={{uri: "https://facebook.github.io/react/logo-og.png"}}
                    />
                    <Image
                        style={
                            {
                                width:200,
                                height:200,
                                borderTopRightRadius:10,
                                borderBottomLeftRadius:10,
                                borderBottomRightRadius:15,
                                borderTopLeftRadius:15,
                                opacity:0.7,
                                overlayColor:"#f00",
                                blurRadius:10,
                            }
                        }
                        source={require("../../imgs/f4.jpeg")}

                    />
                    <ImageBackground
                        style={
                            {
                                width: width,
                                height: height,
                                position: "absolute",
                                left: 0,
                                top: 0,
                                zIndex: -1,
                                opacity: 0.4
                            }
                        }
                        source={require("../../imgs/timg.jpg")}
                    >
                    </ImageBackground>
                </View>
                <View style={styles.form}>
                    <TextInput
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        placeholder={"QQ号码/手机/邮箱"}
                        keyboardType={"decimal-pad"}
                    />
                    <TextInput
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        placeholder={"密码"}
                        password={true}
                        secureTextEntry={true}
                        keyboardType={"email-address"}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    img: {
        width: 180,
        height: 180
    },
    bg: {
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height,
        zIndex: -1,
        opacity: 0.4
    },
    form:{
        justifyContent:"center",
        height:300,
        backgroundColor:"rgba(0,0,0,.3)"
    },
    input:{
        marginVertical:10,
        marginHorizontal:20,
        height:40,
        borderWidth:1,
        borderColor:"#ccc",
        fontSize:16,
        color:"red",
        borderRadius:5,
    }
})
export default ImageComponent;
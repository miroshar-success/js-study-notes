import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    NativeModules,
    StatusBar,
    Platform
}
from "react-native"
const {StatusBarManager} = NativeModules;

const plat = Platform.select({
    ios:"这是苹果设备",
    android:"这是安卓设备"
})

class TopHeight extends Component {
    componentDidMount(){
        // alert(StatusBarManager.HEIGHT);
        alert(Platform.OS)
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={false}
                    backgroundColor={"red"}
                    translucent={false}
                />
                <View style={styles.topNav}>
                    <Text>首页</Text>
                    <Text>{plat}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    topNav:{
        height:50,
        backgroundColor:"pink",
        justifyContent:"center",
        alignItems:"center",
    }
})
export default TopHeight;
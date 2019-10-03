import React, {Component} from 'react';
import{
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions
}
from "react-native";
import {
    createStackNavigator,
    createAppContainer
}
from "react-navigation"

const {width} = Dimensions.get("window");
class HomeScreen extends React.Component {
    render() {
        return (
            <View style={[styles.text,styles.pink]}>
                <Text>Home</Text>
                <Button
                    title={"Go to Details"}
                    onPress={()=>{this.props.navigation.navigate("Detail",{
                        itemId:86,
                        otherParam:"anything you want hre"
                    })}}
                />
            </View>
        );
    }
}
class DetailsScreen extends React.Component{
    render(){
        const {navigation} = this.props;
        const itemId = navigation.getParam("itemId","NO-ID");
        const otherParam = navigation.getParam("otherParam","some default value");
        console.log(itemId,otherParam);
        return(
            <View
                style={[styles.text,styles.blue]}
            >
                <Text>Detail</Text>
                <Text>itemId:{JSON.stringify(itemId)}</Text>
                <Text>otherParam:{JSON.stringify(otherParam)}</Text>
                <Button
                    title={"Go to Details...again"}
                    style={styles.button}
                    onPress={()=>{
                        this.props.navigation.push("Detail",{
                            itemId:Math.floor(Math.random()*100)
                        })
                    }}
                />
                <Button
                    title={"Go to Home"}
                    style={styles.button}
                    onPress={()=>{this.props.navigation.navigate("Home")}}
                />
                <Button
                    title={"Go back"}
                    style={styles.button}
                    onPress={()=>{this.props.navigation.goBack()}}
                />
            </View>
        )
    }
}

const AppNavigator = createStackNavigator({
    Home:{screen:HomeScreen},
    Detail:{screen:DetailsScreen}
});
export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    text:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    pink:{
        backgroundColor:"pink"
    },
    blue:{
        backgroundColor:"skyblue"
    },
    button:{
        width:"100%",
        marginHorizontal:20
    }
})

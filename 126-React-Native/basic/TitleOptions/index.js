import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
}
from "react-native"
import {
    createStackNavigator,
    createAppContainer
}
from "react-navigation";

class HomeScreen extends Component {
/*    static navigationOptions = {
        title:"Home",
        headerStyle:{
            backgroundColor:"seagreen"
        },
        headerTintColor:"#fff",
        headerTitleStyle:{
            textAlign:"center",
            fontWeight:"normal",
            fontSize:18
        },
        headerRight:(
            <Button
                title={"Info"}
                color={"red"}
            />
        )
    }*/
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle:"首页",
            headerRight:(
                <Button
                    title="+1"
                    color="red"
                    onPress={navigation.getParam("increaseCount")}
                />
            )
        }
    }
    componentDidMount(){
        this.props.navigation.setParams({increaseCount:this._increaseCount})
    }
    state = {
        count:0
    }
    _increaseCount = () => {
        this.setState({count:this.state.count+1});
    }
    render() {
        return (
            <View style={styles.text}>
                <Text>Home</Text>
                <Button
                    title={"Go to Details"}
                    onPress={()=>{this.props.navigation.navigate("Detail",{
                        msg:"Details Component"
                    })}}
                />
            </View>
        );
    }
}

class DetailsScreen extends Component {
/*    static navigationOptions = {
        title:"Details"
    }*/
    static navigationOptions = ({navigation}) => {
        return {
            title:navigation.getParam("msg")
        }
    }
    render() {
        let msg = this.props.navigation.getParam("msg");
        console.log(msg);
        return (
            <View style={styles.text}>
                <Text>Detail</Text>
                <Text>msg:{msg}</Text>
                <Button
                    title={"update current title"}
                    onPress={()=>{
                        this.props.navigation.setParams({msg:"New Title"})
                    }}
                />
            </View>
        );
    }
}

const AppNavigation = createStackNavigator(
    {
        Home: {screen: HomeScreen},
        Detail: {screen: DetailsScreen}
    },
    {
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:"rgba(255,0,0,.8)"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
                fontWeight:"normal",
                textAlign:'center'
            }
        }
    }
)
export default createAppContainer(AppNavigation);

const styles = StyleSheet.create({
    text:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"pink"
    }
})

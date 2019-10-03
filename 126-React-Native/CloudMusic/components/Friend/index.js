import React, {Component} from 'react';
import {View,Text} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"
class Friend extends Component {
    static navigationOptions = {
        tabBarLabel:"朋友",
        tabBarIcon(props) {
            return (
                <Icon
                    name={"user-friends"}
                    size={20}
                    color={props.focused?props.tintColor:"#8d8c8c"}
                />
            )
        }
    }
    render() {
        return (
            <View>
                <Text>朋友</Text>
            </View>
        );
    }
}

export default Friend;

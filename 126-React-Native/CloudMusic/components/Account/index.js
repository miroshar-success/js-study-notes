import React, {Component} from 'react';
import {View,Text} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
export default class Account extends Component {
    static navigationOptions = {
        tabBarLabel:"账号",
        tabBarIcon(props){
            return(
                <Icon
                    name={"user"}
                    size={20}
                    color={props.focused?props.tintColor:"#8d8c8c"}
                />
            )
        }
    }
    render() {
        return (
            <View>
                <Text>账户</Text>
            </View>
        );
    }
}


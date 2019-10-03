import React, {Component} from 'react';
import {View,Text} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
class Mine extends Component {
    static navigationOptions = {
        tabBarLabel:"我的",
        tabBarIcon(props){
            return(
                <Icon
                    name={"music"}
                    size={20}
                    color={props.focused?props.tintColor:"#8d8c8c"}
                />
            )
        }
    }
    render() {
        return (
            <View>
                <Text>我的</Text>
            </View>
        );
    }
}

export default Mine;

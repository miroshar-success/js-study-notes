import React, {Component} from 'react';
import {View,Switch,Text} from "react-native";
export default class SwitchComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            flag:false
        }
    }
    render() {
        return (
            <View>
                <Text>Switch组件</Text>
                <Switch
                    trackColor={{false:"gray",true:"red"}}
                    thumbColor={"pink"}
                    value={this.state.flag}
                    onValueChange={()=>{this.setState({flag:!this.state.flag})}}
                />
            </View>
        );
    }
}
























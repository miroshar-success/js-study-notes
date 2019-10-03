import React, {Component} from 'react';
import {View,Text,Picker} from "react-native";

export default class PickerComponent extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            language:"JS",
            index:0,
            player:""
        }
    }
    render() {
        return (
            <View>
                <Text>picker组件</Text>
                <Picker
                    mode={"dialog"}
                    prompt={"请选择以下语言"}
                    style={{height:50,width:150}}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue,itemIndex)=>{this.setState({language:itemValue,index:itemIndex})}}
                >
                    <Picker.Item label="Java" value="Java"/>
                    <Picker.Item label="JavaScript" value="JS"/>
                </Picker>
                <Text>{this.state.index }</Text>
                <Picker
                    style={{width:150,height:30}}
                    selectedValue={this.state.player}
                    prompt={"请选择你最喜欢的球员"}
                    onValueChange={(itemValue,itemIndex)=>{this.setState({player:itemValue})}}
                >
                    <Picker.Item label="kyrie" value="kyrie"/>
                    <Picker.Item label="lebron" value="lebron"/>
                    <Picker.Item label="durant" value="durant"/>
                    <Picker.Item label="curry" value="curry"/>
                </Picker>
            </View>
        );
    }
}


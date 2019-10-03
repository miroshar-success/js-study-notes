import React, {Component} from 'react';
import {TextInput,View,Text,StyleSheet,Button} from "react-native";

class UnlessTextInput extends React.Component{
    render(){
        return(
            <TextInput
                editable={true}
                maxLength={40}
                {...this.props}
                autoFocus={true}
            />
        )
    }
}

export default class TextInputComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:"Useless Placeholder",
            msg:"",
            message:"Unless Multiline Placeholder",
            data:"default value"
        }
        this.textInputElement = null;
        this.textInputRef = (element) => {
            this.textInputElement = element;
        }
    }
/*    handleChange = (e) => {
        console.log(e.nativeEvent);
        this.setState({
            data:e.nativeEvent.text
        })
    }*/
    handleEndEdit = () => {
        console.log("编辑结束了");
    }
    handleReset = () => {
        // this.textInputElement.clear();
        this.setState({message:""})
    }
    render() {
        return (
            <View >
                <Text>Hello,TextInput</Text>
                <TextInput
                    value={this.state.text}
                    style={{height:40,borderColor:"gray",borderWidth:1,width:400}}
                    onChangeText={(text)=>{this.setState({text})}}
                />
                <Text>输入文本修改边框颜色</Text>
                <TextInput
                    value={this.state.msg}
                    onChangeText={(text)=>{this.setState({msg:text})}}
                    style={{borderColor:this.state.msg,borderWidth:1}}
                />
                <View
                    style={{
                        backgroundColor:this.state.message,
                        borderBottomColor:"#000000",
                        borderBottomWidth:1
                    }}
                >
                    <UnlessTextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text)=>{this.setState({message:text})}}
                        value={this.state.message}
                    />
                </View>
                <TextInput
                    width={400}
                    dataDetectorTypes={"phoneNumber"}
                    multiline={true}
                    defaultValue={"Hello,World"}
                    style={{borderWidth:1,borderColor:"pink"}}
                    keyboardType={"numeric"}
                    numberOfLines={2}
                    selectTextOnFocus={true}
                    ref={this.textInputRef}
                />
                <TextInput
                    style={{borderWidth:1,borderColor:"skyblue"}}
                    value={this.state.data}
                    onChangeText = {(text)=>{this.setState({data:text})}}
                    onEndEditing={this.handleEndEdit}
                    onFocus={({nativeEvent})=>{console.log("获得焦点了",nativeEvent)}}
                    selectionColor={"red"}
                />
                <Button
                    title={"重置"}
                    onPress={this.handleReset}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({

});





















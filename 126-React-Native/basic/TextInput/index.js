import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Image
}
from "react-native"
class InputEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:""
        }
    }
    handleChangeText = (text) => {
        this.setState({
            text
        })
    }
    submitText = ()=>{
        let str = this.state.text.split(" ").map((word) => word && "*").join(",");
        alert(str);
    }
    render() {
        return (
            <View>
                <Text>TextInput</Text>
                <TextInput
                    placeholder="Type here to translate"
                    onChangeText={this.handleChangeText}
                    onSubmitEditing={this.submitText}
                />
                <Text>输入的文字为:{this.state.text}</Text>
                <Text>翻译的文字为:{this.state.text.split(" ").map((word) => word && "🍕").join(",")}</Text>
            </View>
        );
    }
}

export default InputEditor;
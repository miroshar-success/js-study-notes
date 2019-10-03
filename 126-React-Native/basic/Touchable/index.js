import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback
}
from "react-native"
class Touchable extends Component {
    constructor(props){
        super(props);
        this.state = {
            count:0,
            number:0,
            index:0
        }
    }
    handlePress = () => {
        alert("123")
    }
    handleClick = () => {
        let count = this.state.count;
        count++;
        this.setState({count});
    }
    handleTouch = () => {
        let number = this.state.number;
        number++;
        this.setState({number})
    }
    onPressButton = () => {
        let index = this.state.index;
        index++;
        this.setState({index});
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleClick}
                    activeOpacity={0.7}
                    underlayColor={"skyblue"}
                >
                    <Text style={styles.text}>Touch here(TouchableHighlight)</Text>
                </TouchableHighlight>
                <View>
                    <Text>{this.state.count}</Text>
                </View>
                <TouchableOpacity
                    onPress={this.handleTouch}
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.text}>Touch here(TouchableOpacity)</Text>
                </TouchableOpacity>
                <View>
                    <Text>{this.state.number}</Text>
                </View>
                <TouchableNativeFeedback
                    onPress={this.onPressButton}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{width:100,height:100,backgroundColor:'skyblue'}}>
                        <Text style={
                            {textAlign:"center",lineHeight:100}
                        }>{this.state.index}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    button:{
        width:250,
        padding:10,
        backgroundColor:"#ccc",
        alignItems:"center",
    },
    text:{
        color:"#f00"
    }
})
export default Touchable;
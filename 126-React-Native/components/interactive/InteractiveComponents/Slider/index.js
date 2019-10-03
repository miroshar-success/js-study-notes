import React, {Component} from 'react';
// import Slider from "@react-native-community/slider";
import {View,Text,Slider} from "react-native";
export default class SliderComponent extends Component {
    handleChange = () => {
        console.log("我在拖动中...");
    }
    handleSlideChange = () => {
        console.log("拖动结束");
    }
    render() {
        return (
            <View>
                <Text>Slider</Text>
                <Slider
                    onSlidingComplete={this.handleSlideChange}
                    onValueChange={this.handleChange}
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="green"
                    maximumTrackTintColor="gray"
                    value={20}
                    step={5}
                />
            </View>
        );
    }
}


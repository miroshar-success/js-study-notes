import React, {Component} from 'react';
import {TouchableOpacity,Text,StyleSheet} from "react-native";
export default class Button extends Component {
    constructor(props){
        super(props);
        this.state = {
            disabled:false
        }
    }
    componentDidMount(){
        console.log(this.props);
    }
    onPress = () => {
        this.props.onPress();
    }
    dataLoading = () =>{
        this.setState({disabled:true})
    }
    dataEnd = () => {
        this.setState({disabled:false})
    }
    render() {
        const {title,backgroundColor,color,width,height} = this.props;
        return (
            <TouchableOpacity
                style={[{
                    backgroundColor,
                    width,
                    height,
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:width/2,
                    overflow:"hidden"
                },this.state.disabled && styles.loading]}
                disabled={this.state.disabled}
                onPress={this.onPress}
            >
                <Text style={{color}}>{this.state.disabled?"获取数据中...":title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    loading:{
        backgroundColor:"gray"
    }
})

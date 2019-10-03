import React, {Component} from 'react';
import {Text,StyleSheet} from "react-native";
import {setSpText} from "../../utils/ScreenUI.js";
export default class TitleText extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:""
        }
    }
    componentDidMount(){
        console.log(this.props.title);
        this.setState({
            title:this.props.title
        })
    }
    render() {
        return (
            <Text style={styles.title}>{this.state.title}</Text>
        );
    }
}
const styles = StyleSheet.create({
    title:{
        fontWeight:"bold",
        fontSize:setSpText(28),
        color:"#282828"
    }
})

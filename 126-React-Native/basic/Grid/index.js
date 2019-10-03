import React, {Component} from 'react';
import {View,Text,Image,StyleSheet,Dimensions} from "react-native"
// 获取设备尺寸
let {width} = Dimensions.get('window');
const col = 5;
const w = 70;
const marginH = (width-w*col)/(col+1);

class Grid extends Component {
    constructor(props){
        super(props)
        this.state = {
            list:[]
        }
    }
    componentDidMount(){
        fetch("http://47.100.98.54:9019/api/category")
            .then(response=>response.json())
            .then(result=>{
                this.setState({
                    list:result.data
                })
            })
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.list.length > 0 && (this.state.list.map((item,index)=>{
                        return(
                            <View style={styles.grid} key={index}>
                                <Image
                                    style={styles.icon}
                                    source={{uri:"https://facebook.github.io/react-native/docs/assets/favicon.png"}}
                                />
                                <Text style={styles.title}>{item.title}</Text>
                            </View>
                        )
                    }))
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        paddingTop:10,
        backgroundColor:"pink",
        flexDirection:"row",
        flexWrap:"wrap"
    },
    grid:{
        width:w,
        height:w,
/*        borderWidth:1,
        borderColor:"#00f",
        borderStyle:"solid",*/
        justifyContent:"space-between",
        alignItems:"center",
        marginLeft:marginH,
        marginBottom:marginH
    },
    icon:{
        width:50,
        height:50,
    },
    title:{
      color:"#f00",
        fontSize:12
    },
    edit:{
        padding:10,
        height:40,
        borderWidth:1,
        borderColor:"#f1f1f1",
        borderStyle:"solid"
    }
})
export default Grid;
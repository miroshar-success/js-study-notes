import React, {Component} from 'react';
import {View,Text,Image} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
export default class Video extends Component {
    constructor(props){
        super(props);
        this.state = {
            songs:[],
        }
    }
    componentDidMount(){
        fetch("http://192.168.1.107:3000/top/album?offset=0&limit=3")
            .then(response => response.json())
            .then(data => {
                console.log(data.albums);
                this.setState({
                    songs:data.albums
                })
            })
    }
    static navigationOptions = {
        tabBarLabel:"视频",
        tabBarIcon(props){
            return(
                <Icon
                    name={"youtube"}
                    size={20}
                    color={props.focused?props.tintColor:"#8d8c8c"}
                />
            )
        }
    }
    render() {
        return (
            <View>
                <Text>我是视频页面</Text>
                {
                    this.state.songs.length > 0 && this.state.songs.map((item,index)=>{
                        return (
                            <Image
                                key={index}
                                style={{width:100,height:100}}
                                source={{uri:item.picUrl}}
                            />
                        )
                    })
                }
            </View>
        );
    }
}


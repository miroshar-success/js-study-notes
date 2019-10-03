import React, {Component} from 'react';
import {View,Text,Image,StyleSheet} from "react-native";
import TitleText from "../common/TitleText.js";
import {scaleWidth,scaleHeight} from "../../utils/ScreenUI.js"
export default class HomeRecommendSongs extends Component {
    constructor(props){
        super(props);
        this.state = {
            personalized:[]
        }
    }
    componentDidMount(){
        fetch(`http:192.168.1.107:3000/personalized`)
            .then(response => response.json())
            .then(data => {
                const songs = data.result.splice(0,6);
                this.setState({
                    personalized:songs
                })
            })
    }
    render() {
        return (
            <View style={styles.recommendSongs}>
                <View style={styles.recommendTitle}>
                    <TitleText title={"推荐歌单"}></TitleText>
                    <View style={styles.recommendSongsBtn}>
                        <Text>歌单广场</Text>
                    </View>
                </View>
                <View style={styles.recommendSongsList}>
                    {
                        this.state.personalized.length > 0 && this.state.personalized.map((item,index)=>{
                            return(
                                <View
                                    key={index}
                                    style={styles.recommendSongsCard}
                                >
                                    <Image
                                        style={styles.poster}
                                        source={{uri:item.picUrl}}
                                    />
                                    <Text
                                        ellipsizeMode={"clip"}
                                        numberOfLines={2}
                                        style={styles.songsName}
                                    >{item.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    recommendSongs:{
        backgroundColor:"#ffffff"
    },
    recommendTitle:{
        flexDirection:"row",
        paddingHorizontal:scaleWidth(32),
        alignItems:"center",
        justifyContent:"space-between",
        height:scaleHeight(122),
    },
    recommendSongsBtn:{
        width:scaleWidth(148),
        height:scaleHeight(48),
        backgroundColor:"#ffffff",
        borderRadius:scaleHeight(24),
        borderWidth:scaleWidth(1),
        borderColor:"#e5e5e5",
        justifyContent:"center",
        alignItems:"center"
    },
    recommendSongsCard:{
        marginBottom:scaleHeight(36),
        height:scaleHeight(290),
        width:scaleWidth(216),
        backgroundColor:"#ffffff"
    },
    recommendSongsList:{
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-between",
        paddingHorizontal:scaleWidth(32),
    },
    poster:{
        width:scaleWidth(216),
        height:scaleHeight(216),
        borderRadius:scaleWidth(8)
    },
    songsName:{
        paddingTop:scaleHeight(16),
    }
})

import React, {Component} from 'react';
import {View,Text,StyleSheet,Image} from "react-native";
import {scaleWidth,scaleHeight} from "../../utils/ScreenUI.js";
export default class HomeNewSongs extends Component {
    constructor(props){
        super(props)
        this.state = {
            newSong:[],
        }
    }
    componentDidMount(){
        fetch(`http://192.168.1.107:3000/top/album?offset=0&limit=3`)
            .then(response => response.json())
            .then(data => {
                console.log(data.albums);
                this.setState({
                    newSong:data.albums,
                })
            })
    }
    render() {
        return (
            <View style={styles.newSongsContainer}>
                <View style={styles.newSongsHeader}>
                    <View style={styles.newSongsTitle}>
                        <Text
                            style={[styles.newSong]}
                        >新碟</Text>
                        <Text style={{color:"#e5e5e5"}}>|</Text>
                        <Text
                            style={[styles.newSong]}
                        >新歌</Text>
                    </View>
                    <View style={styles.newSongsBtn}>
                        <Text>更多新碟</Text>
                    </View>
                </View>
                <View style={styles.newSongsList}>
                    {
                        this.state.newSong.length > 0 && this.state.newSong.map((item,index)=>{
                            return(
                                <View
                                    key={index}
                                    style={styles.newSongCard}
                                >
                                    <Image
                                        source={{uri:item.blurPicUrl}}
                                        style={styles.poster}
                                    />
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
    newSongsContainer:{
        paddingHorizontal:scaleWidth(32)
    },
    newSongsHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:scaleHeight(120),
    },
    newSongsTitle:{
        flexDirection:"row",
        width:scaleWidth(180),
        justifyContent:"space-between",
        alignItems:"flex-end"
    },
    newSong:{
        fontSize:18,
        color:"#999999"
    },
    newSongsBtn:{
        width:scaleWidth(148),
        height:scaleHeight(48),
        borderRadius:scaleHeight(24),
        borderColor:"#e5e5e5",
        borderWidth:scaleWidth(1),
        backgroundColor:"#ffffff",
        justifyContent:"center",
        alignItems:"center"
    },
    newSongChecked:{
        fontWeight:"bold",
        fontSize:20,
        color:"#333"
    },
    newSongsList:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    newSongCard:{
        width:scaleWidth(216),
        height:scaleHeight(324),
        backgroundColor:"pink",
        borderWidth:1,
        borderColor:"red"
    },
    poster:{
        width:scaleWidth(216),
        height:scaleWidth(216),
        borderRadius:scaleWidth(8)
    }
})

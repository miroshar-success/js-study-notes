import React, {Component} from 'react';
import {View,Text,StyleSheet} from "react-native";
import SearchIcon from "react-native-vector-icons/Feather";
import MusicList from "react-native-vector-icons/Fontisto";
import Ranking from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome5";
import {scaleWidth,scaleHeight} from "../../utils/ScreenUI.js"
export default class HomeCategory extends Component {
    render() {
        return (
            <View style={styles.category}>
                <View style={styles.categoryItem}>
                    <View style={styles.categoryIcon}>
                        <SearchIcon
                            name={"calendar"}
                            size={scaleWidth(40)}
                            color={"#ffffff"}
                        />
                    </View>
                    <Text style={styles.categoryTitle}>每日推荐</Text>
                </View>
                <View style={styles.categoryItem}>
                    <View style={styles.categoryIcon}>
                        <MusicList
                            name={"applemusic"}
                            size={scaleWidth(40)}
                            color={"#ffffff"}
                        />
                    </View>
                    <Text style={styles.categoryTitle}>歌单</Text>
                </View>
                <View style={styles.categoryItem}>
                    <View style={styles.categoryIcon}>
                        <Ranking
                            name={"signal-cellular-3"}
                            size={scaleWidth(42)}
                            color={"#ffffff"}
                        />
                    </View>
                    <Text style={styles.categoryTitle}>排行榜</Text>
                </View>
                <View style={styles.categoryItem}>
                    <View style={styles.categoryIcon}>
                        <Ranking
                            name={"radio-tower"}
                            size={scaleWidth(44)}
                            color={"#ffffff"}
                        />
                    </View>
                    <Text style={styles.categoryTitle}>电台</Text>
                </View>
                <View style={styles.categoryItem}>
                    <View style={styles.categoryIcon}>
                        <Icon
                            name={"video"}
                            color={"#ffffff"}
                            size={scaleWidth(38)}
                        />
                    </View>
                    <Text style={styles.categoryTitle}>直播</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    category:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        height:scaleHeight(229),
        borderBottomWidth:scaleHeight(1),
        borderBottomColor:"#e6e6e6",
        backgroundColor:"#ffffff"
    },
    categoryItem:{
        alignItems:"center"
    },
    categoryIcon:{
        alignItems:"center",
        justifyContent:"center",
        width:scaleWidth(92),
        height:scaleWidth(92),
        borderRadius:scaleWidth(46),
        backgroundColor:"#ff3326",
    },
    categoryTitle:{
        paddingTop:scaleHeight(22),
        color:"#7a7a7b"
    }
})

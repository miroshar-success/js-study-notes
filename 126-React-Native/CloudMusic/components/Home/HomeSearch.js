import React, {Component} from 'react';
import {View,Text,StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {scaleHeight, scaleWidth} from "../../utils/ScreenUI";
import SearchIcon from "react-native-vector-icons/Feather";
export default class HomeSearch extends Component {
    render() {
        return (
            <View style={styles.topSearch}>
                <View style={styles.search}>
                    <Icon
                        name={"microphone-alt"}
                        color={"#212121"}
                        size={scaleHeight(32)}
                    />
                    <View style={styles.searchInput}>
                        <SearchIcon
                            name={"search"}
                            size={scaleWidth(28)}
                            color={"#949595"}
                        />
                        <Text style={styles.searchText}>大家都在搜 心如止水</Text>
                    </View>
                    <Icon
                        name={"signal"}
                        color={"#212121"}
                        size={scaleHeight(32)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topSearch:{
        backgroundColor:"#ffffff",
        paddingBottom:scaleHeight(8),
        paddingTop:scaleHeight(48)
    },
    search:{
        height:scaleHeight(72),
        paddingLeft:scaleWidth(36),
        paddingRight:scaleWidth(17),
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    searchInput:{
        height:scaleHeight(72),
        width:scaleWidth(526),
        backgroundColor:"#f7f7f7",
        borderRadius:scaleHeight(36),
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    searchText:{
        color:"#c7c7c7",
        fontSize:14,
        marginLeft:scaleWidth(12),
    }
})

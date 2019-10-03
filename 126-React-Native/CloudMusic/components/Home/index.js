import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5";
import Status from "../common/status.js"
import HomeBanner from "./HomeBanner.js";
import HomeSearch from "./HomeSearch.js";
import HomeCategory from "./HomeCategory.js";
import HomeRecommendSongs from "./HomeRecommendSongs.js"
import HomeNewSongs from "./HomeNewSongs.js";

export default class Home extends Component {
    static navigationOptions = {
        tabBarLabel: "发现",
        tabBarIcon(props) {
            return (
                <Icon
                    name={"home"}
                    size={20}
                    color={props.focused ? props.tintColor : "#8d8c8c"}
                />
            )
        }
    }

    render() {
        return (
                <View style={styles.container}>
                    <Status/>
                    {/*首页搜索栏开始*/}
                    <HomeSearch/>
                    {/*首页搜索栏结束*/}
                    {/*首页轮播图开始*/}
                    <ScrollView>
                        <View style={styles.homeScrollContent}>
                            <HomeBanner/>
                            {/*首页轮播图结束*/}
                            {/*首页分类开始*/}
                            <HomeCategory/>
                            {/*首页分类结束*/}
                            <HomeRecommendSongs/>
                            <HomeNewSongs/>
                        </View>
                    </ScrollView>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    homeScrollContent: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8"
    }
})

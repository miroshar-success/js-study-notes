import React, {Component} from 'react';
import {View,Text,Image,StyleSheet,FlatList} from "react-native";

// 使用FlatList渲染数据列表,只会渲染在当前屏幕上的元素,而那些已经渲染好了但移动到了屏幕之外的元素
// 则会从原生视图结构中移除。
export default class Movies extends Component {
    constructor(props){
        super(props);
        // 设置一个flag,数据加载完之前为false,当为false时,显示加载数据的
        this.state = {
            movies:null,
            loaded:false
        }
    }
    componentDidMount(){
        fetch(`https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies:data.movies,
                    // 数据加载完成后设置为true
                    loaded:true
                })
            })
    }
    renderLoading(){
        return(
            <View style={styles.container}>
                <Text>正在加载电影数据...</Text>
            </View>
        )
    }
    renderMovie({item}){
        return(
            <View style={styles.movieItem}>
                <Image
                    style={styles.poster}
                    source={{uri:item.posters.thumbnail}}
                />
                <View style={styles.rightContainer}>
                    <Text
                        numberOfLines={2}
                        style={styles.title}
                    >{item.title}</Text>
                    <Text style={styles.year}>{item.year}</Text>
                </View>
            </View>
        )
    }
    render() {
        if(!this.state.loaded) {
            return this.renderLoading();
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.movies}
                    renderItem={this.renderMovie}
                    keyExtractor={item=>item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        flex:1,
    },
    movieItem:{
        paddingHorizontal:20,
        flexDirection:"row",
    },
    poster:{
        marginRight:20,
        marginVertical:10,
        width:100,
        height:100,
        borderRadius:5
    },
    title:{
        fontSize:16,
        width:200,
        overflow:"hidden",
        color:"red"
    },
    year:{
        lineHeight:30,
        color:"skyblue"
    }
})

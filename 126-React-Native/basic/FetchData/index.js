import React, {Component} from 'react';
import {View,Text,FlatList,StyleSheet,StatusBar} from "react-native"
class FetchData extends Component {
    constructor(props){
        super(props);
        this.state = {
            source:[]
        }
    }
    componentDidMount(){
        fetch(`https://facebook.github.io/react-native/movies.json`)
            .then(response=>response.json())
            .then(source=>{
                this.setState({source})
            })
            .catch(err=>{
                console.log(err);
            })
    }
    render() {
        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="blue"
                    hidden={false}
                    translucent={true}
                />
                <View style={styles.top}>
                    <Text style={styles.text}>Movie</Text>
                </View>
                {
                    this.state.source && (
                        <View>
                            <Text style={styles.title}>Title-{this.state.source.title}</Text>
                            <Text style={styles.desc}>Description-{this.state.source.description}</Text>
                            <FlatList
                                data={this.state.source.movies}
                                renderItem={({item})=><Text style={styles.movieItem}>{item.title}——{item.releaseYear}</Text>}
                                keyExtractor={(item)=>item.id}
                            >
                            </FlatList>
                        </View>
                    )
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    top:{
        height:50,
        backgroundColor:"pink",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        color:"#f00",
        fontSize:20
    },
    title:{
        fontSize:18,
        color:"#000",
        textAlign:"center"
    },
    desc:{
        color:"#f00"
    },
    movieItem:{
        textAlign:"center",
        lineHeight:30
    }
})
export default FetchData;
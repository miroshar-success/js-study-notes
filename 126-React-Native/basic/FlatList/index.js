import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    FlatList
}
from "react-native"
class Flat extends Component {
    render() {
        return (
            <View>
                <Text>我是FlatList组件</Text>
                <FlatList
                    style={styles.container}
                    data={
                        [
                            {key: 'Devin'},
                            {key: 'Jackson'},
                            {key: 'James'},
                            {key: 'Joel'},
                            {key: 'John'},
                            {key: 'Jillian'},
                            {key: 'Jimmy'},
                            {key: 'Julie'}
                        ]
                    }
                    renderItem={(item)=><Text style={styles.item}>{item.item.key}</Text>}
                >
                </FlatList>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        height:300,
        backgroundColor:"pink"
    },
    item:{
        height:40,
        lineHeight:40,
        paddingLeft:10,
        backgroundColor:"#f1f1f1",
        color:"#f00",
    }
})
export default Flat;
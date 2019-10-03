import React, {Component} from 'react';
import {Image, StyleSheet, View, Text} from "react-native"

class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:this.props.info
        }
    }
    render() {
        let data = this.state.data;
        return (
            data.length > 0 && (
                data.map((item,index)=>{
                    return(
                        <View style={styles.container} key={index}>
                            <View style={styles.card}>
                                <Image
                                    style={styles.img}
                                    source={data[index].pic}
                                />
                            </View>
                            <View style={styles.content}>
                                <Text
                                    numberOfLines={3}
                                >
                                    {data[index].content}
                                </Text>
                                <Text style={styles.time}>{data[index].time}</Text>
                            </View>
                        </View>
                    )
                })
            )

        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "skyblue",
        marginVertical:10
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight:10,
    },
    content: {
        flex: 1
    },
    time: {
        fontSize: 14,
        color: "#f0f"
    }
})

export default Card;
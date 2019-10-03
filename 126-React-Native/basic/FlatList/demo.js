import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
}
from "react-native"
class FlatGoodList extends Component {
    constructor(props){
        super(props)
        this.state = {
            goods:[]
        }
    }
    componentDidMount(){
        fetch(`http://47.100.98.54:9020/api/goods`)
            .then(response=>response.json())
            .then(result=>{
                this.setState({
                    goods:result.data
                })
            })
    }
    render() {
        return (
            <View>
                <Text>商品列表组件</Text>
                {
                    this.state.goods.length > 0 && (
                        <FlatList
                            data={this.state.goods}
                            keyExtractor={item=>item.id}
                            renderItem={({item})=>{
                                return(
                                    <View
                                        style={styles.card}
                                    >
                                        <Image
                                            style={styles.img}
                                            source={{uri:item.picurl}}
                                        />
                                        <View style={styles.info}>
                                            <Text style={styles.title}>{item.title}</Text>
                                            <Text style={styles.desc}>{item.des}</Text>
                                            <Text style={styles.price}>￥ {item.price}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                        >
                        </FlatList>
                    )
                }

            </View>
        );
    }
}
const styles = StyleSheet.create({
    card:{
        height:100,
        flexDirection:"row",
        borderWidth:1,
        borderColor:"#f1f1f1",
        borderStyle:"solid",
        paddingHorizontal:10,
        alignItems:"center"
    },
    img:{
        width:60,
        height:60,
        marginRight:15
    },
    title:{
      color:"#212121"
    },
    price:{
        color:"#f00",
        paddingTop:5,
    }
})
export default FlatGoodList;
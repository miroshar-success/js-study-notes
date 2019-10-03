import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SectionList
}
from "react-native"
class SectionGoodList extends Component {
    render() {
        return (
            <View>
                <Text style={styles.title}>我是SectionList组件</Text>
                <SectionList
                    sections={[
                        {name:"D",data:["Devin"]},
                        {name:"J",data:["Jackson","James","Jillian","Jimmy","Joel","John","Julie"]}
                    ]}
/*                    renderItem={({item})=><Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section})=><Text style={styles.sectionHeader}>{section.name}</Text>}
                    keyExtractor={(item,index)=>index}*/
                    renderItem={(item)=><Text>{JSON.stringify(item)}</Text>}
                >
                </SectionList>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    title:{
        textAlign:"center",
        color:"#000",
        lineHeight:30,
        borderBottomWidth:1,
        borderBottomColor:"#ccc",
    },
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        color:"#f00",
        backgroundColor: 'rgba(247,247,247,1.0)',
        borderBottomColor:"#e1e1e1",
        borderTopColor:"#e1e1e1",
        borderBottomWidth:1,
        borderTopWidth:1
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
})
export default SectionGoodList;
import React, {Component} from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    FlatList
}
    from "react-native"

const {width} = Dimensions.get("window")

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            banners: [],
            current: 0,
            time: 2500
        }
        this.scrollElement = null;
        this.autoPlayRef = element => {
            this.scrollElement = element;
        }
        this.timer = null;
    }

    componentDidMount() {
        fetch(`https://api.wulv5.com/music/banner?type=1`)
            .then(response => response.json())
            .then(({banners}) => {
                this.setState({banners})
            })
        this.handleAutoPlay();
    }

    // 创建底部的小圆点
    createIndicator = () => {
        // current表示当前的小圆点,默认为0,显示第一张图片小圆点为红色
        let {banners, current} = this.state;
        let pointStyle = {}
        return (banners.length > 0 && banners.map((item, index) => {
            // 当index与current相等的时候 给其赋值为红颜色, 否则为白色
            pointStyle = (index === current) ? {color: "#f00"} : {color: "#fff"};
            return (
                <Text
                    key={index}
                    style={[styles.point, pointStyle]}
                >&bull;</Text>
            )
        }))
    }
    // 手指滚动轮播图,滚动时获取当前滚动的距离,然后判断当前滚动到第几张图片
    handleScrollBanner = (e) => {
        let offsetX = e.nativeEvent.contentOffset.x;
        let current = Math.floor(offsetX / width);
        this.setState({current});
    }
    // 自动轮播
    handleAutoPlay = () => {
        let {current, time} = this.state;
        this.timer = setInterval(() => {
            current = this.state.current + 1 >= this.state.banners.length ? 0 : this.state.current + 1;
            this.setState({current});
            //
            this.scrollElement.scrollResponderScrollTo({
                x: width * this.state.current,
                y: 0,
                animated: true
            })
        }, time);
    }
    // 开始拖动的时候暂时 定时器
    handleBeginDrag = () => {
        clearInterval(this.timer);
    }
    handleEndDrag = () => {
        this.handleAutoPlay();
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <StatusBar
                        backgroundColor={"transparent"}
                        hidden={false}
                        translucent={true}
                    />
                    <Text style={styles.title}>使用ScrollView渲染的视图</Text>
                    <View style={styles.banner}>
                        <ScrollView
                            style={styles.contentContainerStyle}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                            indicatorStyle={"black"}
                            onMomentumScrollEnd={this.handleScrollBanner}
                            ref={this.autoPlayRef}
                            onScrollBeginDrag={this.handleBeginDrag}
                            onScrollEndDrag={this.handleEndDrag}
                        >
                            {
                                this.state.banners.length > 0 && (
                                    this.state.banners.map((item, index) => {
                                        return (
                                            <View key={index}>
                                                <Image
                                                    style={{width, height: 200}}
                                                    source={{uri: item.imageUrl}}
                                                    resizeMode={"cover"}
                                                />
                                            </View>
                                        )
                                    })
                                )
                            }
                        </ScrollView>
                        <View style={styles.indicator}>
                            {this.createIndicator()}
                        </View>
                    </View>
                    <Text style={styles.title}>使用FlatList渲染的视图</Text>
                    <View style={styles.banner}>
                        <FlatList
                            style={{
                                height: 200,
                                width
                            }}
                            data={this.state.banners}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                            horizontal={true}
                            renderItem={({item}) => {
                                return (
                                    <View>
                                        <Image
                                            style={{width, height: 200}}
                                            source={{uri: item.imageUrl}}
                                        />
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => item.encodeId}
                        />
                    </View>
                </View>
                {/* 添加gif图片*/}
                <Image
                    style={{width:width,height:300}}
                    source={require("../../imgs/loading.gif")}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        marginTop: 10,
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        lineHeight: 30,
        backgroundColor: "#000"
    },
    banner: {
        position: "relative",
        height: 200,
        backgroundColor: "#f1f1f1",
        borderRadius: 5
    },
    indicator: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 25,
        backgroundColor: "rgba(0,0,0,.4)"
    },
    point: {
        fontSize: 24,
        color: "#fff",
        marginHorizontal: 2
    }
    /*    contentContainerStyle:{
            paddingVertical:20
        }*/
})

export default Banner;
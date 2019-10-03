import React from "react";
import {Dimensions,PixelRatio} from "react-native";

// 分别获取当前设置的宽高
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
// 获取当前设备的像素密度
let pixelRatio = PixelRatio.get();
// 返回字体大小缩放比例
let fontScale = PixelRatio.getFontScale();

// 以6s 750*1334 为UI设计稿

// 获取缩放比例
const _scaleW = deviceWidth*pixelRatio/750;
const _scaleH = deviceHeight*pixelRatio/1334;

export function scaleWidth(size){
    return (size*_scaleW)/pixelRatio;
}
export function scaleHeight(size){
    return (size*_scaleH)/pixelRatio;
}
export function setSpText(size){
    size = Math.round(size * _scaleW + 0.5) * pixelRatio / fontScale;
    return size / 2;
}
















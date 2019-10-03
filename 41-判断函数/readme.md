<!-- TOC -->

- [1. isNaN()](#1-isnan)
- [2. Object.is()](#2-objectis)

<!-- /TOC -->

# 1. isNaN()

    isNaN() 函数用来确定一个值是否为NaN 
    果isNaN函数的参数不是Number类型， isNaN函数会首先尝试将这个参数转换为数值，然后才会对转换后的结果是否是NaN
    进行判断。

# 2. Object.is()

    Object.is()方法判断两个值是否是相同的值,不会进行隐式类型转换。
        两个值都是 undefined
        两个值都是 null
        两个值都是 true 或者都是 false
        两个值是由相同个数的字符按照相同的顺序组成的字符串
        两个值指向同一个对象
        两个值都是数字并且
        都是正零 +0
        都是负零 -0
        都是 NaN
        都是除零和 NaN 外的其它同一个数字


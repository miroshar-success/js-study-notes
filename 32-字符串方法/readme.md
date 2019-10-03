<!-- TOC -->

- [1. tips](#1-tips)
- [slice/substring/substr方法比较](#slicesubstringsubstr方法比较)

<!-- /TOC -->

# 1. tips

    注意区分基本字符串和字符串对象。

    基本字符串:字符串字面量(通过单引号或双引号定义) 和 直接调用String方法(没有通过new生成字符串对象实例)的字符串
    都是基本字符串.JavaScript会自动将基本字符串转换为字符串对象,只有将基本字符串转化为字符串对象之后才可以使用
    字符串对象的方法.

# 2. slice/substring/substr方法比较

    slice(start,end);   
    
        1. 从start下标位置到end下标位置之间的字符串,包括start,不包括end
        2. 如果没有end下标,则一直截取到字符串的末位.

    substring(start,end);
        1. 
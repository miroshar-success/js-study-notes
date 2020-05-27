<!-- TOC -->

- [1. Number()](#1-number)
- [2. parseInt()](#2-parseint)

<!-- /TOC -->
# 原生函数

    常用的原生函数有:
        String()
        Number()
        Boolean()
        Array()
        Object()
        Function()
        RegExp()
        Date()
        Error()
        Symbol()
        
## 内部属性[[Class]]
    
    所有typeof返回值为 'object'的对象都包含一个内部属性[[Class]]。这个属性无法直接访问，一般通过
    Object.prototype.toString(...)来查看。
```js
Object.prototype.toString.call([1,2,3]) // [object Array]
Object.prototype.toString.call(/\d/g)   // [object RegExp]
Object.prototype.toString.call(undefined)   // [object Undefined]
Object.prototype.toString.call(null)    // [object Null]
Object.prototype.toString.call(123) // [object Number]
Object.prototype.toString.call('123')   // [object String]
Object.prototype.toString.call(function foo(){})    // [object Function]
```

    基本类型值没有.length 和 .toString()方法。需要通过封装对象才能访问。此时JavaScript会自动为基本类型值包装。
    
    如果想要得到封装对象中的基本类型值，可以使用valueOf()函数。
    
    原生函数作为构造函数使用时，不要求必须带new关键字。不带时，会被自动补上。
    
## Date

    获取时间戳：
        new Date().getTime()    从1970年1月1日开始计算。
        
        从ES5开始引入了一个更简单的方法。 Date.now()。
```js
if(!Date.now){
    Date.now = function(){
        return (new Date()).getTime();
    }
}
```

## 类型转换

    JavaScript中强制类型转换总是返回标量基本类型值，如字符串，数字和布尔值。不会返回对象和函数。
    
    ToString
        基本类型值的字符串化规则为: null-->'null'  undefined-->'undefined' true-->'true'
        
    数组的默认toString()方法经过了重新定义。
```js
var a = [1,2,3]
console.log(a.toString());  // 1,2,3
```
    将所有单元字符串化以后再用'，'连接起来。
    
    
### JSON.stringify()

        1. 如若对象中定义了toJSON()方法，JSON字符串化时会首先调用该方法，然后用它的返回值来进行序列化。
        2. 如果对象中遇到undefined function 和 symbol时会自动将其忽略,在数组中则会返回null.
```js
var obj = {
    a:42,
    b:30,
    c:function(){},
    toJSON:function(){
        return {b:this.b}
    }
}
console.log(JSON.stringify(obj));   // {"b":30}
```
    可以向JSON.stringify()传递一个可选参数replacer，它可以是数组或者函数，
    用来指定哪些属性应该被排除，哪些属性应该被处理。
```js
var player = {
    firstName:'kyrie',
    lastName:'irving',
    age:'27',
    team:'nets',
    position:'gurad'
}

console.log(JSON.stringify(player));    // {"firstName":"kyrie","lastName":"irving","age":"27","team":"nets","position":"gurad"}
console.log(JSON.stringify(player,['firstName','team']))    // {"firstName":"kyrie","team":"nets"}

console.log(JSON.stringify(player,function(k,v){
    if(k !== 'firstName' && k !== 'age') return v;
}));    // {"lastName":"irving","team":"nets","position":"gurad"}
```
    
    JSON.stringify() 还有一个可选参数 space,用来指定输出的缩紧格式。
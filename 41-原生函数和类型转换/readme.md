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
  
## Number
    
    toNumber()
        true转换为1， false转换为0， undefined转换为NaN, null转换为0。
    
```js
console.log(Number(false)); // 0
console.log(Number(true));  // 1
console.log(Number(undefined)); // NaN
console.log(Number(null));  // 0
console.log(Number({a:1})); // NaN
console.log(Number([1,2,3]))    // NaN
Number([]); // 0
Number(''); // 0
```
    对象或者数组会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。
    
    为了将值转换为相应的基本类型值，抽象操作会首先检查该值是否有valueOf()方法。如果有并且返回基本类型值，就使用
    该值进行强制类型转换。如果没有就使用toString()的返回值进行强制类型转换。
```js
var a = {
    valueOf:function(){return '43'}
}
var b = {
    toString:function(){return '43'}
}

var c = [4,3];
c.toString = function(){return this.join("")}

Number(a);
Number(b);
Number(c);
```

## Boolean

    以下值是假值:
        undefined
        null
        false
        +0 -0 和NaN
        ""
        
## parseInt

    parseInt(...)先将参数强制类型转化为字符串再进行解析。
    
    parseInt(0.000008)  // 0
    parseInt(0.0000008) // 8 8来自8e-7
    parseInt(false,16); // 250  'fa'来自'false'
    parseInt(parseInt,16)   15 // 'f' 来自'function...'
    
## 字符串和数字之间的隐式类型转换
    
    数字转化为字符串：
    a + "" 和 String(a) 之间有一个细微的差别:
        a + "" 会对a 调用valueOf()方法，然后通过toString()操作将返回值转换为字符串。
        而String()则是直接调用toString()方法。
```js
var obj = {
    valueOf:function(){return 42},
    toString:function(){ return 3}
}
console.log(obj + '');  // 42
console.log(String(obj));   // 3
```

    字符串转化为数字：
```js
var a = '3.14';
var b = a - 0;
console.log(b)  // 3.14

var array1 = [3];
var array2 = [1];
console.log(array1 - array2);   // 2
``` 
    为了执行减法运算，他们首先被转换为字符串(通过toString()方法)，然后再转换为数字。
    
## 隐式强制类型转换为布尔值

    下面的情况会发生隐式强制类型转换：
        1. if(...) 语句中的条件判断表达式
        2. for(..;..;)语句中的条件判断表达式
        3. while(...)和do...while(...)循环中的条件判断表达式
        4. ? : 中的条件判断表达式
        5. 逻辑运算符 || 和 && 
    
    || 和 && 
        逻辑运算符，返回的是两个操作数其中的一个。
    
    对 ||,如果条件判断结果为true,就返回第一个操作数的值，如果为false,就返回第二个操作数的值。
    对 && 相反，如果条件判断为true，就返回第二个数的值，否则返回第一个操作数的值。
    
    如果没有使用!! 和 Boolean 就会进行隐式类型转换。建议使用！！ 或者 Boolean
```js
var e = '42';
var o = {}
var arr = [];

if(e){
    console.log(e);
}
if(o){
    console.log(o);
}
if(arr){
    console.log(arr)
}
if(!!e){
    console.log(e);
}
if(!!o){
    console.log(o);
}
if(!!arr){
    console.log(arr)
}
if(Boolean(e)){
    console.log(e);
}
if(Boolean(o)){
    console.log(o);
}
if(Boolean(arr)){
    console.log(arr)
}
```
        
    
    
    
    
    
    
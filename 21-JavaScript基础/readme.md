# 内置类型
    
    null
    undefined
    boolean
    number
    string
    object
    symbol

    检测一个值为null
```js
var a = null;
console.log(!a && typeof a == 'object');
```    
    JavaScript中的变量是没有类型的，只有值才有类型。
```js
var a;
console.log(typeof a);  // undefined
console.log(typeof b);  // undefined    
```
    已在作用域中声明但还没有赋值的变量，是undefined.还没有在作用域中声明的变量,是undeclared。
    
    tips:
        1. 使用delete可以删除数组中的某项,但不会改变数组的长度.
        2. JavaScript中字符串是不可变的，而数组是可变的。字符串不可变是值字符串的成员函数不会改变其原始值，而是创建
        一个新的字符串。
        
## Number

    Number.prototype.toFixed
        指定小数部分的显示位数，返回的是字符串。
    
    Number.prototype.toPrecision
        用来指定指定有效位数的显示位数,返回的是字符串形式。
        
        
    0.1 + 0.2 == 0.3  false
    
    解决这个问题最常见的方法是设置一个误差范围值，对JavaScript的数字来说，这个值通常是2^-52。
    从es6开始，这个值定义在Number.EPSILON中。
```js
function isEqual(m,n){
    return Math.abs(m-n) < Number.EPSILON;
}

var a1 = 0.1 + 0.2;
var a2 = 0.3;
console.log(a1 == a2);  // false
console.log(a1);

console.log(isEqual(a1,a2));    // true
```
    Number.MAX_VALUE    能够呈现的最大浮点数
    Number.MIN_VALUE    能够呈现的最小浮点数
    
    Number.MAX_SAFE_INTERGE     能够被安全呈现的最大整数
    Number.MIN_SAFE_INTERGE     能够被安全呈现的最小整数
    
    
    检测一个数是否为整数:
        Number.isInteger()
```js
var b1 = 32.1;
var b2 = 32;
console.log( Number.isInteger(b1) );    // false
console.log( Number.isInteger(b2)); // true


function isInteger(number){
    return (typeof number === 'number' && number%1 === 0);
}
```
    检测一个数是否为安全的数:
        Number.isSafeInteger()
```js
console.log(Number.isSafeInteger( Math.MAX_SAFE_INTEGER ));
console.log(Number.isSafeInteger( Math.pow(2,53) ));    // false
console.log(Number.isSafeInteger( Math.pow(2,53) -1 )); // true
```

## NaN

    NaN (not a number)。 执行数学运算没有成功，失败后返回的结果。
    NaN 是 JavaScript中唯一一个不等于自身的值。
```js
if(!Number.isNaN){
    Number.isNaN = function(n){
        return typeof n === 'number' && window.isNaN(n);
    }
}

// 或者
if(!Number.isNaN){
    Number.isNaN = function(n){
        return n !== n;
    }
}   
```
    Object.is() 也可以用来判断 NaN。 能使用 === 或者 == 来判断的时候，就不要使用Object.is(...)
    因为前者的效率更高。
```js
if(!Object.is){
    Object.is = function(v1,v2){
    // 判断-0
        if(v1 === 0 && v2 === 0){
            return 1/v1 === 1/v2;
        }   
// 判断 NaN
        if(v1 !== v2){
            return v1 !== v2;
        }   
        return v1 === v2;
    }
}
```
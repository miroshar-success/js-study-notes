# 变量
	
	使用命名空间,减少全局变量的使用。
	var namespace = {
		a:function(){console.log(1)},
		b:function(){consooe.log(2)}
	}
	
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

# 值和引用

    JavaScript中没有指针，如果一个值有10个引用。这些引用指向的都是同一个值。
        简单值总是通过值复制的方式来赋值/传递。包括null undefined 字符串 数字 布尔值 和 ES6 中的 Symbol。
        复合值和函数 则总是通过引用复制的方式来赋值/传递。
        
    tips:
        由于引用指向的是值本身而非变量，所以一个引用无法更改另一个引用的指向。
```js
let a = [1,2,3];
let b = a;
console.log('a:',a);    // [1,2,3]
console.log('b:',b);    // [1,2,3]

b = [4,5,6];
console.log(a); // [1,2,3]
console.log(b); // [4,5,6]
```

```js
function foo(x){
    x.push(4);
    console.log(x); // [1,2,3,4]

    x = [4,5,6];    // 传递a给函数foo，x指向a,这里给x重新赋值只是修改了x的指向，并不会修改变量a的指向。
    x.push(7);
    console.log(x); // [4,5,6,7]
}
var c = [1,2,3];
foo(c);
console.log(c); // [1,2,3,4]
```

    如果要修改a的值，必须更改x指向的数组，而不是为x赋值一个新的数组。
```js
function bar(x){
    x.push(4);
    console.log(x); // [1,2,3,4]

    x.length = 0;
    x.push(4,5,6,7);
    console.log(x); // [4,5,6,7]
}
const d = [1,2,3];
bar(d);
console.log('d:',d);    // [4,5,6,7]
```
    我们无法自行决定使用值复制还是引用复制，一切由值的类型来决定。
    
    
    
    
    
    
    
    
    
    
    
    
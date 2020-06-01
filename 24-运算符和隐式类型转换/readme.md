# 操作符
    
    a++ 和 ++a
    
	作用： 将a的值+1，再赋值给a
	a++   （整体表达式的值） 是a +1 【之前】 的值
	++a   （整体表达式的值） 是a +1 【之后】 的值 
	
```js
var num1 = 2;
var num2 = 20;
var num3 = --num1 + num2;
var num4 = num1 + num2;
console.log(num3,num4);	// 21 21


var num1 = 2;
var num2 = 20;
var num3 = num1-- + num2;
var num4 = num1 + num2;
console.log(num3,num4);	// 22 21
```

## 运算符优先级

    用 , 来连接一系列语句的时候，它的优先级最低，其他操作数的优先级都比它高。
    
    a && b || c  执行的是 (a && b) || c  还是 a && (b || c)
```js
console.log( false && true || true )    // true
console.log( (false && true) || true ); // true
console.log( false && (true || true) ); // false

console.log( true || false && false );      // true
console.log( (true || false) && false );    // false
console.log( true || (false && false) );    // true
```
    上述结果说明 && 会先执行,然后执行 ||, 并且与 && 出现的顺序没有关系.
    
    
    a ？ b : c ? d : e
        是 1. a ? b : (c ? d : e)
      还是 2. (a ? b : c) ? d :e  答案是 第一个,右关联在这里会影响返回结果
```js
console.log(true ? false : true ? true : true); // false
console.log( (true ? false : true) ? true : true ); // true
console.log( true ? false : (true ? true : true) ); // false

var a = 42;
var b = 'foo';
var c = false;
var d = (a && b || c) ? ( (c || b) ? a : (c && b)) : a;
console.log(d); // 42;

var e = a && b || c ? c || b ? a : c && b : a;
console.log(e); // 42
```

    函数参数
```js
// 如果参数被省略或者 值为undefined, 则取该参数的默认值
function bar(a = 42, b = a + 1){
    console.log(a,b);
}
bar();  // 42   43
bar(100)    // 100  101
bar(undefined)  // 42  43
bar(null)   // null 1


function baz(a = 42, b = a + 1){
    console.log(
        arguments.length,
        a,
        b,
        arguments[0],
        arguments[1]
    )
}
baz();  // 0 42 43 undefined undefined
baz(10);    // 1 10 11 10 undefined
baz(10,undefined);  // 2 10 11 10 undefined
baz(10,null);   // 2 10 11 10 null
``` 
    虽然参数a和b都有默认值,但是函数不带参数时,arguments数组为空。ES6参数默认值会导致arguments数组和对应的命名
    参数之间出现偏差，ES5也会出现这种情况。
```js
function f1(a){
    a = 42;
    console.log(
        a,
        arguments[0],
        Object.prototype.toString.call(arguments)   
    )
}
f1(3);  // 42 42    [object Arguments]
f1()    // 42 undefined [object Arguments]
```
    tips:
        向函数传递参数时，arguments数组中的对应单元会和命名参数建立关联以得到相同的值。相反，不传递参数就不会
        建立关联。
        
        1. 在创建带有id属性的DOM元素也会创建同名属性的变量。HTML页面中的内容也会产生全局变量。
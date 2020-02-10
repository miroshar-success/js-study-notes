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

# for循环

    块语句

    for([initialization];[condition];[final-expression])
    statement

    1. initialization
    一个表达式或者变量声明。可以用var关键字声明新的变量,初始化中的变量不是该循环中的局部变量,而是与for循环处在同样的作用域中。

    2. condition 
    一个条件表达式用于确定每一次循环是否能被执行.如果该表达式为true,statement将被执行。

    3. final-expression
    每次循环的最后都要执行的表达式。执行时机是在下一次condition计算之前。
```js
// 1. 初始变量和for循环处于相同的作用域中
var i = 0;
for(; i < 3; i++){
    console.log(i); // 0 1 2
}

// 2. 条件块也是可选的
for(var i = 0; ; i++){
    console.log(i); // 0 1 2 3 4
    if(i > 3) break;    
}

// 3. 也可以忽略所有的表达式
var i = 0;
for(;;){
    if(i > 3) break;
    console.log(i);
    i++
}
````

    for(;;){}   // 这是一个死循环
1. 下述有关border:none 以及border:0 的叙述错误的是:

        A border:none 表示边框样式无
        B border:0 表示边框宽度为0
        C 当定义了border:none，即隐藏了边框的显示,实际就是边框宽度为0
        D 当定义边框时,仅设置边框宽度也可以达到显示的效果
        
   tips:
    1. border:0 浏览器对border-width border-color进行渲染,占用内存。
        border:none 浏览器不进行渲染,不占用内存
    2. 请始终把border-style属性声明到border-color属性之前,元素必须在改变颜色之前获得边框。
    
2. 下面的js程序输出的是什么?
```js
function Foo() {
    var i = 0;
    return function() {
        console.log(i++);
    }
}
 
var f1 = Foo(),
    f2 = Foo();
f1();   // 0
f1();   // 1
f2();   // 0
``` 
    i++ 整体表达式的值 是 i+1 之前的值
    
3. 找出元素item在给定数组arr中的位置
    
   输出描述: 如果数组中存在item,则返回元素在数组中的位置,否则返回-1
```js
function indexOf(arr, item) {
    if(!Array.isArray(arr)) return -1;
    if(Array.prototype.indexOf){
        return arr.indexOf(item);
    }
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === item){
            return i
        }
    }
    return -1;
}
```

4. 计算给定数组arr中所有元素的总和
    
    输入描述: 数组中的元素均为Number类型
```js
// 1. for循环
function sum(arr) {
   let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum += arr[i];        
    }
    return sum;
}

// reduce方法
function sum(arr) {
    return arr.reduce((initialValue,currentValue) => {
        return initialValue + currentValue;
    },0)
}
```

5. 移除数组arr中所有值与item相等的元素。不要直接修改数组arr,结果返回新的数组
```js
// 1. 不相等的时候 添加进数组
function remove(arr, item) {
    let [temp,len] = [[],arr.length];
    for(let i = 0; i < len; i++){
        if(arr[i] !== item){
            temp.push(arr[i]);
        }
    }
    return temp;
}

// 2. 相等的时候跳出循环
function remove(arr,item){
    let temp = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === item){
            continue;
        }
        temp.push(arr[i])
    }
    return temp;
}

// 3. filter方法
function remove(arr,item){
    return arr.filter((ele,index,array) => {
        return ele !== item
    })
}

// 4. splice方法
function remove(arr,item){
    let temp = [...arr];
    for(let i = 0; i < temp.length; i++){
        if( temp[i] === item ){
            temp.splice(i,1);
            i--;
        }
    }
    return temp;
}
```

6.    
```js
typeof null  // 'object'
null instanceof Object  // false
```
    instanceof 运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。
    
7. 隐式类型转换

```js
[]['map'] + [1,2,3]         // "function map() { [native code] }1,2,3"
[]['a'] + [1,[2,3]] // "undefined1,2,3"   多维数组在转化为字符串时会自动降维
[]['push'](1)   // 1    数组的push方法返回的是数组的长度
(![]+[])[+[]];  // f    ![]为false + [] 为'false' 
(![]+[])[+!![]];    // a 
++[[]][+[]] + [+[]];    // '10'
[1 < 2 < 3, 3 < 2 < 1]; // [true,true]
```
[demo]https://imweb.io/topic/5be2f05a21ff0e9610a6646e
    
8. parseInt

    parseInt(x,y)
    把 y 进制的x 以10进制显示。  y的取值是2-36。 如果y的值是0，就是10进制
    
    [1,2,3].map(parseInt);  // [1,NaN,NaN];
    ['10', '10', '10'].map(parseInt);   //  [10, NaN, 2]
    
    
    Array.isArray(Array.prototype) //false    因为Array.prototype 是一个数组对象
    
9. 

```js
var a = {},b = {key:'b'},c = {key:'c'}
a[b] = 123;
a[c] = 456;
console.log(a[b]);  // 456      
```
    对象或者数组的键名 会进行隐式类型转换。对象b和c进行隐士类型转换时会变成 [object Object] 
    上面的代码 实际执行 a['[object Object]'] = 123; a['object Object'] = 456;
    
10.

```js
var a = {n:1};
var b = a;
a.n = a = {m:1}
console.log(a,b);
// {m:1}  {n:{m:1}}
```
11.
```js
var x = 1;
if(function fn(){}){
    x += typeof fn;
}
console.log(x); // '1undefined'



var fn = function test(){
    console.log('hello world');
}
test(); // Reference Error
```
    函数声明 外面包一层括号会变成 函数表达式
12.
```js
var str = typeof typeof {name:'hello'};
if(str.length === 6) {
    str.prop = '这是一个字符串';
}
console.log(str.prop);

// 引用类型与基本包装类型的主要区别是对象的生存期。使用new操作符创建的引用类型的实例。在执行流离开当前作用域之前都一直
// 保存在内存中，而自动创建的基本包装类型的对象,则只存在于一行代码的执行瞬间。
```       
13.
```js
var x = 10;
function fn(){
    y = function(){
        x = 2;
    }
    console.log(this);  // window
    return function(){
        var x = 3;
        y();
        console.log(this.x);    // 2
    }.apply(this);
}
fn();   
console.log(y); // 是一个函数 function 



function f1(){
    var message = 'hello';
}
f1();
console.log(message);   // 报错


function f2(){
    message = 'world';
}
f2();
console.log(message);   // world
```
    如果在函数中使用var定义一个变量,那么这个变量在函数退出后就会销毁的。 如果省略了var操作符，message就成了全局变量。
    
14.
```js
var out = 25;
var inner = {
    out:20,
    fun:function() {var out = 30; return this.out;}
}
console.log( (inner.fun,inner.fun)() ); // 25
console.log( inner.fun() ); // 20
console.log( (inner.fun = inner.fun)() ); // 25
```
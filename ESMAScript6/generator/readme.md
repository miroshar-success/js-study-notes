
# 1. generator

    Generator函数是一个状态机,封装了多个内部状态。执行Generator函数会返回一个遍历器对象。
    返回的遍历器对象,可以依次遍历Generator函数内部的每一个状态。

    tips:
      1. function关键字与函数名之间有一个星号;
      2. 函数体内部使用yield表达式,定义不同的内部状态 
      3. generator函数的调用方法与普通函数一样,调用generator函数后,该函数并不执
      行，而是返回一个指向内部状态的指针对象(Iterator Object)
      4. generator函数是分段执行的,yield表达式是暂停执行的标记。
```js
function helloWorld(){
    yield 'Hello';
    yield 'World';
    return 'ending';
}
let hw = helloWorld();   // 返回一个对象,value就是当前yield表达式的值,done:false表示遍历没结束
hw.next();  // {value:'Hello',done:false}
hw.next();  // {value:'World',done:false}
hw.next();  // {value:'ending',done:true}
```

## 1.1. yield与return区别

    1. 都是返回紧跟在语句后面的那个表达式的值。
    2. 每次遇到yield,函数暂停执行,下一次再从该未知继续向后执行,而return语句不具备
    记忆的功能。
    3. yeild表达式只能用在generator函数里
    4. yield表达式如果用在另一个表达式之中,必须放在圆括号里。
```js
function* demo(){
    // console.log('Hello World' + yield);
    // console.log('Hello' + yield 123);
    console.log('Hello' + (yield));
    console.log('Hello' + (yield 123));
}
```
    5. 任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数,调用该函数会
    返回该对象的一个遍历器对象。
    6. yield表达式的返回值与next函数的返回值不同,next函数的返回值与yield之后的值有
    关,而yield表达式的值却于此无关。
```js
function* say(){
    yield 'Hello';
    yield 'World';
    return 'ok';
}
let is = say();
console.log(is.next()); //{value:'Hello',done:false}
console.log(is.next()); // {value:'World',done:false}
// 如果有return 而return后面没有语句,则此处的value是undefined.
console.log(is.next()); // {value:ok,done:true}

// 没有return 的时候
function* m1(){
    yield 'Hello';
    yield 'World';
}
let m = m1();
console.log(m.next());  // {value:'Hello',done:false}
console.log(m.next());  // {value:'World',done:false}
console.log(m.next());  // {value:undefined,done:true}
```
## 1.2. next方法

    yield表达式本身没有返回值,或者说总是返回undefined。next方法可以带一个参数,该
    参数就会被当作上一个yield表达式的返回值。
```js
function* f(){
    for(let i = 0;true;i++){
        let reset = yield i;
        if(reset){ i = -1;}
    }
}
let g = f();
g.next();   // {value:0,done:false}
g.next();   // {value:1,done:false}
g.next(true);   // {value:0,done:false}
```
    tips:
    1. 通过next方法的参数,就有办法在Generator函数开始运行之后,继续向函数体内部注入值。也就是说,可以在Generator函数运行的不同阶段,
    从外部向内部注入不同的值。
    2. 由于next方法的参数表示上一个yield表达式的返回值,所以第一个使用next方法时,传
    递参数是无效的。

## 1.3. for...of 循环

    for...of循环可以自动遍历Generator函数运行时生成的Iterator对象,且此时不需要
    调用next方法。
```js
function* foo(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for(let v of foo()){
    console.log(v); // 1 2 3 4 5
}
```
    tips:
    1. 一旦next方法的返回对象的done属性为true,for...of循环就会中止。
    2. 除了for...of,扩展运算符,解构赋值和Array.from方法内部调用的,都是遍历器接口。
```js
function* numbers(){
    yield 1;
    yield 2;
    return 3;
    yield 4;
}

// Array.from()
[...numbers()]  // [1,2]

// 解构赋值
let [x,y] = numbers();  // 1 2

// for...of
for(let n of numbers()){
    console.log(n); // 1 2
}
```

    斐波拉契数列 
```js
function f1(n){
    let [prev,cur,sum] = [1,1,0];
    for(let i = 0; i <= n; i++){
        prev = cur;
        cur = sum;
        sum = prev + cur;
    }
    return sum;
}

function* fibonacci(){
    let [prev, cur] = [0,1];
    for(;;){
        yield cur;
        [prev,cur] = [cur, prev + cur];
    }
}
for(let n of fibonacci()){
    if(n > 100) break;
    console.log(n);     // 这种方法是求出不大于某个数之前的所有数列
}
```

## 1.4. 遍历对象的方法

    原生JS没有提供对象的Iterator接口,无法用for...of遍历。
    Object.entries();   // 遍历键名和键值
    Object.values();    // 遍历键值
    Object.keys();      // 遍历键名
```js
let player = {
    first:'kyrie',
    last:'irving',
    team:'Celtic',
    position:'guard'
}
for(let [key,value] of Object.entries(player)){
    console.log(key,value);
}
for(let key of Object.keys(player)){
    console.log(key);
}
for(let value of Object.values(player)){
    console.log(value);
}
```
    2. 给Object原型上添加遍历器接口
```js
Object.prototype[Symbol.iterator] = function* (){
    for(let key in this){
        yield this[key];
    }
}
```

# 2. Generator.prototype.throw

    Generator函数返回的遍历器对象,都有一个throw方法,可以在函数体外抛出错误,然后在
    Generator函数体内捕获。
```js
let g = function* (){
    try{
        yield;
    }catch(e){
        console.log(e);
    }
}
let i = g();
i.next();
i.throw( new Error('出错了!') );


// 
function* g(){
    try{
        yield;
    }catch(e){
        console.log('内部捕获',e);
    }
}
let i = g();
i.next();
try{
    i.throw('a');
    i.throw('b');
}catch(e){
    console.log('外部捕获',e);
}
```
    tips:
    1. 建议抛出Error对象的实例。
    2. 第一个错误被Generator函数体内的catch语句捕获。i第二次抛出错误,由于Generator函数内部的catch
    语句已经执行过了,不会再捕捉到这个错误。
    3. 遍历器对象得throw方法和全局得throw方法有区别,后者只能被函数体外得catch语句捕获。
    4. throw方法抛出的错误要被内部捕获,前提是至少执行过一次next方法。

## 2.1. throw被捕获以后,会附带执行下一条yield表达式

```js
function* gen(){
    try{
        yield console.log('a');
    }catch(e){

    }
    yield console.log('b');
    yield console.log('c');
}
let g = gen();
g.next();   // a;
g.throw();  // b;
g.next();   // c;
```

## 2.2. 函数体内的错误,可以被函数体外的catch捕获

```js
function* foo(){
    let x = yield 3;
    let y = x.toUpperCase();
    yield y;
}
let it = foo();
it.next();  // {value:3,done:false}

try{
    it.next(42);
}catch(err){
    console.log(err);
}
```
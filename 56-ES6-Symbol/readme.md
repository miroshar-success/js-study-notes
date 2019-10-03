
# 1. Symbol

    ES5的对象属性名都是字符串,容易造成属性名的冲突.为了保证每个属性的名字都是独一无二的，ES6引入了Symbol。

    JavaScript语言的第7种数据类型: undefined null Number Boolean String Object Symbol

    tips: 
        1. Symbol函数前不能使用new 命令,否则会报错。生成的Symbol是一个原始类型的值,不是对象。
        2. s1 s2是两个Symbol值,加参数利于区分
        3. 如果Symbol()的参数是一个对象,就会调用该对象toString()方法
        4. 相同参数的Symbol函数的返回值是不相等的。
        5. symbol值不能与其他类型的值进行计算,会报错。
        6. symbol可以转化为布尔值,转不了数值。

```js
let s1 = Symbol('foo');
let s2 = Symbol('bar');
// s1 Symbol('foo');
// s2 Symbol('bar'); 

s1.toString();  // 'Symbol(foo)';
s2.toString();  // 'Symbol(bar)';
```

    如果标识符接收了不同类型的参数,会调用toString()方法转换为字符串。

# 2. 作为属性名的Symbol

```js
// 第一种写法
let mySymbol = Symbol();
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let mySymbol = Symbol();
let a = {
    [mySymbol]:'Hello!';
}

// 第三种写法
let a = {};
let mySymbol = Symbol();
Object.defineProperty(a,mySymbol,{value:'Hello!'});
```
    tips:
    1. symbol作为属性值时,中括号里不要加 引号,加了引号就是字符串了,
    2. 不要用 点运算符

    这种写法 mySymbol 就是字符串而不是symbol值了。
```js
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol]     // undefined
a['mySymbol']   // Hello 
```

# 3. Symbod定义常量

```js
// 例一
const log = {};
log.levels = {
    DEBUG:Symbol('debug'),
    INFO:Symbol('info'),
    WARN:Symbol('warn')
}

console.log(log.levels.DEBUG,'debug message');
console.log(log.levels.INFO,'info message');


// 例二
const color_red = Symbol();
const color_green = Symbol();

function getComplement(color){
    switch(color){
        case color_red:
        console.log('red');
        break;
        case color_green:
        console.log('green');
        break;
        default:
        throw new Error('undefined color');
    }
}
```

# 4. 消除魔术字符串

    魔术字符串指的是在代码之中多次出现,与代码形成强耦合的某一个具体的字符串或数值。

```js
function getArea(shape,options){
    // 初始化面积为0
    let area = 0;
    switch(shape){
        case 'triangle':
        area = 0.5 * options.height * options.width;
        break;
    }
    console.log(area);
}
getArea('triangle',{width:3,height:4}); 
// 上面代码中,triangle就是魔术字符串,与代码形成'强耦合',不利于维护和改善。
```

    1. 消除魔术字符串的方法之一是把它写成一个变量
```js
const shapeType = {
    triangle:'Triangle'
}

function getArea(shape,options){
    let area = 0;
    switch(shape){
        case shapeType.triangle:
        area = 0.5 * options.width * options.height;
        break;
    }
    console.log(area);
}
getArea(shapeType.triangle,{width:3,height:4}); // 6



// shapeType.triangle等于哪个值不重要,只要确保不会跟其他shapeType属性的值冲突即可。
const shapeType = {
    triangle:Symbol()
}
```

# 5. 属性名遍历

    Symbol作为属性名,该属性不会出现在for...in for...of循环中,也不会被Object.keys()
    Object.getOwnPropertyNames() JSON.stringfy()返回。

    可以通过Object.getOwnPropertySymbols方法,获取指定对象的所有Symbol属性名。


    tips: 
        1. Symbol 是数组的一项时,可通过for...in 或 for...of 遍历出来。
        2. Symbol作为对象属性时无法被for...in for...of 遍历。
        3. Object.getOwnPropertySymbols 可以遍历Symbol属性，不会输出常规属性。
        4. Reflect.ownKyes可以返回所有类型的键名。返回的是一个数组,包括常规键名和Symbol键名

```js
let kyrie = Symbol('kyrie');
let player = {
    [kyrie]:'kyrie',
    age:26,
    position:'guard',
    skill:'crossover'
}

for(let key in player){
    console.log(key);   // age position skill
}

Object.getOwnPropertySymbols(player);   // Symbol(kyrie)

Reflect.ownKeys(player);    // ['age','position','skill',Symbol(kyrie)] 
```

# 6. Symbol.for() 和 Symbol.keyFor()

    Symbol.for()  接收一个字符串作为参数,然后搜索有没有以这个参数为名称的Symbol值。如果有,就
    返回这个Symbol值,否则就新建一个并返回一个以该字符串为名称的Symbol值。

    tips:
    1. Symbol() 和 Symbol.for()都会生成一个新的Symbol。后者会被登记到全局环境中搜索,前者不会
    Symbol.for()不会每次调用就返回一个新的Symbol类型的值,而是会先检查给定的key是否已经存在,
    如果不存在才会新建一个值。
    2. Symbol()写法没有登记机制,Symbol.for()有

    Symbol.keyFor方法返回一个已登记的Symbol类型值的key。
```js
let s1 = Symbol.for('foo');
Symbol.keyFor(s1);  // foo

let s2 = Symbol('foo');
Symbol.keyFor(s2);  // undefined
```


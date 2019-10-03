
# 1. Object.prototype

    创建不具有典型原型链继承的对象
    Object.create(null);

# 2. Object.hasOwnProperty()

    返回一个布尔值,指示对象自身属性中是否具有指定的属性。

    所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象
    是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

    
# 3. Object.entries()

    Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组。其排列与使用for...in循环遍历该对象时返回的顺序一致。

    tips:
    1. 如果对象的键值是数字,则遍历顺序会按从小到大遍历出。
    2. Object.entries() 不会遍历出原型链上的属性,而for...in会遍历出。
```js
const obj = {foo:'bar',baz:42};
console.log(Object.entries(obj));   // [ ['foo', 'bar'], ['baz', 42] ]

// arrayLike
let arrayLike = {
    0:'a',
    1:'b',
    2:'c',
}
for(let [key,value] of Object.entries(arrayLike)){
    console.log(key,value);
}

// randomObj
const ranObj = {
    100:'a',
    2:'b',
    7:'c'
}
Object.entries(ranObj);    // [ ["2", "b"],["7", "c"],["100", "a"] ]

// 和for... in返回的顺序相同
for(let key in ranObj){
    console.log(key,ranObj[key]);   // 2 a  7 c  100 a
}

const obj = { a: 5, b: 7, c: 9 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
}

// 非对象强制转换为对象遍历
Object.entries('foo');  // [[0,f],[1,o],[1,o]]

// 通过forEach遍历
Object.entries(obj).forEach(([k,v]) =>{
    console.log(k,v);
});
```

# 4. Object.values()

    该方法返回一个给定对象自身的所有可枚举属性值的数组,值的顺序与使用for...in循环的顺序相同(区别在于for-in循环枚举原型链中的属性)。

```js
const obj = {foo:'bar',baz:42};
console.log(Object.values(obj));    // ['bar',42]

// array like object
let oList = document.querySelectorAll('.list>li');
console.log(Object.values(oList));  

let ranObj = {
    100:'a',
    2:'b',
    7:'c'
}
console.log(Object.values(ranObj)); // ['b','c','a'];
console.log(Object.values('foo'));  // ['f','o','o'];
```

# 5. Object.keys()

    该方法会返回一个由一个给定对象的自身可枚举属性组成的数组,数组中属性名的排列顺序和使用for-in
    循环遍历该对象时返回的顺序一致。

```js
// simple array
let arr = ['a','b','c'];
console.log( Object.keys(arr) );    // [0,1,2]

// array like object
console.log( Object.keys(oList) );  // [0,1,2]

// array like object with random key ordering
console.log( Object.keys(ranObj));  // [2,7,100]
```

# 6. Object.create()

    该方法创建一个新对象,使用现有的对象来提供新创建对象的__proto__.

    Object.create(proto,[prototiesOobject]);
    1. proto
        新创建对象的原型对象。
    2. propertiesObject
        可选,如果没有指定为undefined,则是要添加到新创建对象的可枚举属性,对象的属性描述符以及响应的属性名称。

```js
function Player(name){
    this.name = name;
    this.canTalk = true;
}
Player.prototype.greet = function(){
    if(this.canTalk){
        console.log('my name is ' + this.name);
    }
}

function Kyrie(name){
    Player.call(this,name);
}
Kyrie.prototype = Object.create(Player.prototype);
Kyrie.prototype.constructor = Kyrie;

let kyrie = new Kyrie('kyrie');
kyrie.name  // kyrie
kyrie.say();    // my name is kyrie
```

# 7. Object.is()

    判断两个值是否相同。
    如果下列任何一项成立,则两个值相同：
    1. 都是undefined
    2. 都是null
    3. 都是true或者都是false
    4. 都是由相同个数的字符按照相同的顺序组成的字符串
    5. 两个值是数字并且
        都是正0
        都是负0
        都是NaN
        都是除0和NaN外的其他同一数字
    6. 指向同一个对象

# 8. Object

    Object构造函数为给定值创建一个对象包装其。如果给定值是null或undefined,将会创建并返回
    一个空对象,否则,返回一个与给定值对应类型的对象。
    
    Object(undefined);  // 返回一个空对象
    Object(null);       // 返回一个空对象
    
# 使用toString()检测对象类型

    可以通过toString()来获取每个对象的类型。为了每个对象都能通过Object.prototype.toString()
    来检测,需要以Function.prototype.call()或Function.prototype.apply()的形式来调用,传递
    要检查的对象作为第一个参数。
    
 ```js
 var toString = Object.prototype.toString;
 
 toString.call(new Date); // [object Date]
 toString.call(new String); // [object String]
 toString.call(Math); // [object Math]
 
 //Since JavaScript 1.8.5
 toString.call(undefined); // [object Undefined]
 toString.call(null); // [object Null]
 ```

# 基本包装类型

    为了便于操作基本类型值,ECMAScript提供了3个特殊的引用类型:Boolean,Number和String。每当
    读取一个基本类型值得时候,后台就会创建一个对应的基本包装类型。
    
    tips:
    引用类型与基本包装类型的主要区别就是对象的生存期,使用new 操作符创建的引用类型的实例,在执行
    流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象,则只存在于一行代码
    的执行瞬间。

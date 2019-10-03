
# 1. Set

    Set是ES6提供的新的数据结构,本身是一个构造函数.
    tips: 
      1. 成员的值都是唯一的,没有重复的值。
      2. Set接收一个数组(或者具有iterable接口的其他数据结构)作为参数
      3. 向set加入值的时候,不会发生类型转换,set内部NaN等于NaN
      4. 两个对象总是不相等的
```js
const s = new Set();
[2,3,5,4,5,2,2].forEach(function(item){
    s.add(item);
});
console.log(s); // [2,3,5,4]

for(let item of s){
    console.log(item);  // 2 3 5 4
}


// 例一
const set = new Set([1,2,3,4,5]);
[...set]    // [1,2,3,4,5]

// 例二
const items = new Set([1,2,3,4,5,5,5,5]);
items.size // 5

// 例三 类数组
const set = new Set(document.querySelectorAll('div'));
set.size    // 5


let set = new Set();
set.add({});
set.size    // 1

set.add({});
set.size    // 2
```

## 1.1. 数组去重

```js
// 可以使用结构赋值,也可以使用Array.from
Array.from(new Set(array));
[...new Set(array)];

// 字符串去重
[...new Set(str.split(''))];
[...new Set(str)].join();
```

# 2. Set实例的属性和方法

    Set.prototype.constructor   构造函数
    Set.prototype.size          Set实例的成员总数

    操作方法:
        add(value)      添加某个值
        delete(value)   删除某个值
        has(value)      返回一个布尔值,是否为set成员
        clear()         清除所有成员

    遍历方法:
        keys()          返回键名的遍历器
        values()        返回键值的遍历器
        entries()       返回键值对的遍历器
        forEach()       使用回调函数遍历每个成员

    tips:
      1. Set的遍历顺序就是插入顺序
      2. Set结构没有键名,只有键值,所以keys方法和values方法的行为完全一致。
      3. 可以使用for...of遍历set结构

## 2.1. 遍历的应用

    数组的map和filter方法也可以间接用于Set结构。

```js
let set = new Set([1,2,3]);

set = new Set([...set].map(x => x * 2));
// Set(3){2,4,6}

set = new Set([...set].filter(x => (x % 2 == 0)));
// Set(1){2}
```
    使用Set可以很容易实现并集(Union) 交集(Intersect)和差集(Difference)
```js
let a = new Set([1,2,3]);
let b = new Set([4,3,2]);

// 并集,去除两个数据结构重复部分,利用Set本身的特性就可以了
new Set([...a,...b]);

// 交集,遍历a中的每项,如果b也有a的项,则返回
new Set([...a].filter(x => b.has(x)));

// 差集,遍历a的每项,如果a有,b没有,则返回.
new Set([...a].filter(x => !b.has(x)));
```

# 3. Map

    传统的JavaScript的对象(Object),本质上是键值对的集合，只能使用字符串当作键。

    Object结构提供了'字符串-值'的对应,Map结构提供了'值-值'的对应。是一种更完善的Hash结构。

```js
const m = new Map();
const o = {p:'Hello World'};

m.set(o,'content'); 
m.get(o);   // 'content'

m.has(o);   // true

m.delete(o);
m.has(o);   // false
``` 

    Map接收一个数组作为参数。该数组的成员是一个个表示键值对的数组。
```js
let map = new Map([
    ['name','kyrie'],
    ['title','player']
]);

map.size;   // 2
map.has('name');    // true
map.get('name');    // kyrie
map.has('title');   // true
map.get('title');   // player
```
    tips:
        1. 如果对同一键值赋值多次,后面的值将会覆盖前面的值
        2. 任何具有Iterator接口,且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。
        3. 如果读取一个未知的键,则返回undefined.
        4. 只有对同一个对象的引用,Map结构才将其视为同一个键。
        5. Map的键实际上是跟内存地址绑定的,只要内存地址不一样，就视为两个键。

# 4. Map的属性和操作方法

    size
        返回实例成员的个数

    set(key,value)
        set方法设置键名key对应的键值为value,如果key已经有值,则键值会被更新。
    set返回的是当前对象,所以可以采用链式写法.
```js
let map = new Map()
.set(1,'a')
.set(2,'b')
.set(3,'c')
```

    get(key)
        读取key对应的键值,如果找不到key,返回undefined

    has(key)
        返回一个布尔值,表示某个键是否在当前Map对象之中。

    delete(key)
        删除某个键,返回true.如果删除失败,返回false。

    clear()
        clear方法清除所有成员,没有返回值。

## 4.1. 遍历方法

    keys()      返回键名的遍历器
    values()    返回键值的遍历器
    entries()   返回所有成员的遍历器
    forEach()   遍历所有Map的所有成员

    tips:
        1. Map的遍历顺序就是插入顺序。

```js
let map = new Map([
    ['F','false'],
    ['T','true']
]);

for(let [key,value] of map.entries()){
    console.log(key,value);
    // F    false
    // T    true
}

// 等同于使用 map.entries()    
for(let [key,value] of map){
    console.log(key,value);
    // F    false
    // T    true
}
```
    上面的例子表示Map结构的默认遍历器接口(Symbol.iterator属性),就是entries方法。
        
        map[Symbol.iterator] === map.entries

## 4.2. Map转化为数组

    最快速的方法是使用扩展运算符.
```js
let map = new Map([
    [1,'one'],
    [2,'two'],
    [3,'three'],
]);

[...map.keys()];    
[...map.values()];
[...map.entries()];
```
    结合数组的map方法,filter方法,可以实现Map的遍历和过滤。(map本身没有filter和map方法)。
```js
let map0 = new Map()
.set(1,'a')
.set(2,'b')
.set(3,'c');

// 返回键值小于3的map结构
new Map([...map0].filter(function([key,value]){
    return key < 3
}));

new Map([...map0].map(function([key,value]){
    return [key * 2 , '_' + value];
}));
```

# 5. Map与其他结构的互相转化

    1. Map转数组
```js
用扩展运算符

let map = new Map()
.set('name','kyrie')
.set('title','player')
.set('age','26');

console.log( [...map] );    // [['name','kyrie'],['title','player'],['age','26']];
```

    2. 数组结构转Map
```js
将数组传入Map,就可以转为Map。

new Map([
    [true,7],
    [{foo:3},['abc']]
])
```
    3. Map转为对象
```js
如果所有Map的键都是字符串,它可以无损地转为对象。

function MapToObj(map){
    let obj = Object.create(null);
    for(let [key,value] of map.entries()){
        obj[key] = value;
    }
    return obj;
}

let map = new Map()
.set('one',1)
.set('two',2)
.set('three',3);

let newObj = MapToObj(map);
console.log(newObj);    // {one:1,two:2,three:3}
```

    4. 对象转为map
```js
// 遍历对象,将键名和键值添加进一个数组,再把这个数组加进一个空数组作为new Map的参数。
function objToMap(obj){
    let arr = [];
    for(let key in obj){
        arr.push([key,obj[key]]);
    }
    let map = new Map(arr);
    return map;
}

// 遍历对象,将分别将对象的键名和键值用set方法添加进Map结构
function objToStrMap(obj){
    let strMap = new Map();
    for(let key in Object.keys(obj)){
        strMap.set(key,obj[key]);
    }
    return strMap;
}
```
    5. Map转为JSON。
    5.1 Map的键名都是字符串,这时可以选择转为对象JSON。
    5.2 Map的键名有非字符串,可以选择转为数组JSON。
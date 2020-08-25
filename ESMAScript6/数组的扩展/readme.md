# Array构造器

	创建一个数组
```js
let arr1 = Array(8)	// [empty*8]	

let arr2 = [];
arr2.length = 8;
```
	new Array(arg1,arg2) 当参数长度为0 或 长度大于等于2时,传入的参数将按照顺序依次成为新数组的第0至N项 
		tips: 参数长度为0时,返回空数组
	new Array(len) 当len不是数值时,返回一个只包含len元素的数组,当len为数值时,len最大不能超过32位无符号整型。
	
# ES6新增的构造方法

	Array.of() 和 Array.from()
	
## Array.of()
	
	Array.of方法用于将一组值，转换为数组。
	将参数依次转化为数组中的一项,然后返回这个新数组,而不管这个参数是数字还是其他。
	这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
	
```js
Array.of(8)		// [8]
Array(8)		// [empty*8]
```
	
## 1. Array.from()
	
    Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象
    tips:不会改变源数据, 浅拷贝的数组实例
	
	Array.from(arrayLike[,mapFn[,thisArg]])
	
		arrayLike: 
		1. 伪数组对象(拥有一个length属性和若干索引属性的任意对象)
		2. 可迭代对象 (可以获取对象中的元素,如Map和Set等)
```js
const obj = {
	0:'a',
	1:'b',
	2:'c',
	length:3
}
Array.from(obj);	// ["a", "b", "c"]
console.log(obj);	// {0: "a", 1: "b", 2: "c", length: 3}


// Array from a String
Array.from('Hello World');	// ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"]

// Array from a Set
Array.from(new Set(['hello','world']));	//  ["hello", "world"]


// Array from a Array-like (arguments);
function f(){
	return Array.from(arguments);
}
f(1,2,3);	// [1,2,3]


// Array.from 中使用箭头函数
Array.from([1,2,3],x => x + x);
// [2,3,4]
```

	Array.from()第二个参数为一个函数,作用类似于数组的map方法,用来对每个元素进行处理,将处理后的元素
	放入返回的数组
```js
const obj = {
	0:'a',
	1:'b',
	2:'c',
	length:3
}
Array.from(obj,function(value,index){
	console.log(value,index,this);
	return value.repeat(3);
},obj);

/*
a 0 {0: "a", 1: "b", 2: "c", length: 3} 2
b 1 {0: "a", 1: "b", 2: "c", length: 3} 2
c 2 {0: "a", 1: "b", 2: "c", length: 3} 2 */
```

	
	将类数组转化为数组的方法：
		1. Array.prototype.slice.apply(NodeLlist);
		2. Array.from(NodeList);
		3. [...NodeList];

# Array.isArray()

	Array.isArray() 用于判断一个变量是否是数组类型。
	
	在Array.isArray()方法前，可以使用如下方法判断一个数据类型是否为数组。
```js
let a = [];
console.log( a instanceof Array)	// true
console.log(a.constructor)	// f Array()
console.log(a.__proto__ === Array.prototype);	// true
console.dir(a);	// Array
console.log( Object.prototype.toString.call(a) )	// [Object Array]
```

	实际上,上面的方法除了Object.prototype.toString 外,其他方法都不能正确判断变量的类型。
```js
const arrayLike = {
	__proto__:Array.prototype
}
console.log(arrayLike instanceof Array);	// true
console.log(arrayLike.constructor);	// f Array()
console.log(arrayLike.__proto__ === Array.prototype); // true
console.dir(arrayLike);	// Array
console.log(Array.isArray(arrayLike));	// false
console.log(Object.prototype.toString.call(arrayLike));	// [object Object]
```
	通过Object.prototype.toString去判断一个值的类型,也是各大主流库的标准。 
```js
if(!Array.isArray){
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[Object Array]'
	}
}
```

# Array.prototype

	数组的方法都来自于Array.prototype,可以通过扩展Array.prototype 属性上的方法来给所有数组实例添加方法。
	
	Array.prototype本身就是一个数组。
```js
Array.isArray(Array.prototype)	// true
```

	数组原型提供的方法非常多,具体可以分为三种,一种是改变自身的,一种是不会改变自身值的,另外一种是遍历方法。
	
## 改变自身的方法
	
	pop()
	删除最后一个元素并返回删除的元素
```js
// pop 也可以应用在类数组对象中
let arr = ['cat','mouse','dog','chicken'];
let item = arr.pop();
console.log(arr,item);	// ['cat','mouse','dog'] "chicken"

// array-like 
const obj = {
	0:'kyrie',
	1:'lebron',
	2:'durant',
	3:'kobe',
	length:3
}

let i = Array.prototype.pop.call(obj);
console.log(obj,i);	// {0: "kyrie", 1: "lebron", 3: "kobe", length: 2} "durant"
```
	push()
	添加一个或者多个元素到数组末尾,并且返回数组新的长度。
```js
let arr1 = ['football','basketball','volleyball'];
const len = arr1.push('golfball');
console.log(arr1,len);	// ["football", "basketball", "volleyball", "golfball"]     4
```
	push是根据 length的属性来决定从哪里开始插入给定的值的。
```js
let arrayLike = {
	0:'football',
	1:'basketball'
}
let newArrayLike = Array.prototype.push.call(arrayLike,'golfball');
console.log(newArrayLike,arrayLike);	// 1 {0: "golfball", 1: "basketball", length: 1}
```
	
	reverse()
	颠倒数组中元素的位置,第一个会成为最后一个,返回对数组的引用。
```js
const arr2 = [1,2,3,4,5];
console.log(arr2.reverse());	//  [5, 4, 3, 2, 1]
```
	
	shift()
	删除数组的第一个元素,并返回这个元素。
```js
var array = [1,2,3,4,5];
var item = array.shift();
console.log(array); // [2,3,4,5]
console.log(item); // 1
```

	sort()
	用原地算法对数组的元素进行排序,并返回数组。
```js
let players = ['kyrie','durant','lebron','wade','kobe'];

let ages = [1,20,3,15,8];
console.log(ages.sort());

function compareFun(a,b){
	if(a < b){
		return -1;
	}
	if(a > b){
		return 1;
	}
	return 0
}
console.log( ages.sort(compareFun) );	// [1,3,8,15,20]
console.log(players.sort(compareFun));	// ["durant", "kobe", "kyrie", "lebron", "wade"]
```
	
	如果排序的元素是数字的话,则排序函数compareFun 格式可以 写成:
	function compareFun(a,b){
		return a - b;
	}
	
	
	splice(start,count,Element1...ElementN);
	splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
```js
let arr = ['apple','boy'];
console.log( arr3.splice(1,1),arr );	// ["boy"] ["apple"]

let arr = ['apple','boy'];
console.log(arr.splice(1,1,'cat'),arr);	// ["boy"] (2) ["apple", "cat"]

let members = ['a','b','c','d','e','f'];
console.log( members.splice(3,2,'aaa'),members );	//  ["d", "e"] (5) ["a", "b", "c", "aaa", "f"]
```
	
	unshift()
	用于在数组的开始处插入一些元素,并返回数组的长度
```js
const colors = ['red','blue','green'];
console.log( colors.unshift('black'),colors );	// 4 (4) ["black", "red", "blue", "green"]
```
	
	fill()
	使用给定值,填充一个数组。还可以接受第二个和第三个参数,用于指定填充的起始位置和结束位置(不包括结束位置)
```js
['a','b','c'].fill(3)	// [3,3,3]

['1','2','3','4','5'].fill(4,0,3); // [4, 4, 4, "4", "5"]
```

## 不会改变自身的方法

	concat()
	将传入的数组或者元素与源数组合并,组成一个新的数组并返回。
```js
let arr = [1,2,3];
let newArr = arr1.concat(2,3,4);
console.log(arr,newArr);	//  [1, 2, 3] (6) [1, 2, 3, 2, 3, 4]

// 若concat()不传入参数,那么将基于源数组浅复制生成一个一摸一样的新数组
let arr = [{a:1}];
let newArray = arr.concat()

newArray[0]['a'] = 2;
console.log(array,newArray);	// [{a:2}] [{a:2}]
```
	
	join()
	将数组中所有的元素连接成一个字符串。
```js
var arr2 = ['we','are','Chinese'];
console.log(arr2.join('&'));	// we&are&Chinese
```

	slice(start[,end])
	返回一个新数组,截取数组中 从start到end之间的元素,不包括end位置的索引 (浅复制)
```js
let arr3 = ['one','two','three','four','five'];
console.log(arr3.slice(1,4));	// ["two", "three", "four"]


let colors = [{color:'yellow'},1,2];
let newColor = colors.slice(0,1);
newColor[0].color = 'blue';
console.log(colors,newColor);	// [{color:'blue'},1,2]	[{color:'blue'}]
```
	
	toString() 返回数组的字符串形式。 该字符串由数组中每个元素的toString()返回值经调用join()方法连接组成。
```js
let month = ['Jan','Feb','Mar','Apr','May'];
console.log( month.toString() );	// Jan,Feb,Mar,Apr,May

console.log(month + 'Jun');	// Jan,Feb,Mar,Apr,MayJun
```
	
	indexOf()/lastIndexOf()
	查找数组中元素第一次出现和最后一次出现的索引。
```js
let players = ['kyrie','lebron','wade','kyrie','james','durant',NaN];
players.indexOf('kyrie') ;	// 0
players.lastIndexOf('kyrie');	// 3
players.indexOf('lebron');	// 1
players.lastIndexOf('lebron');// 1
players.indexOf(NaN);	// -1
```

	includes()
	用于判断数组是否包含某个指定的值,如果是,则返回true,否则返回false
```js
players.includes(NaN);	// true
```
	
## 遍历方法

	 forEach() 方法
```js
let ages = [2,3,4,5];
age.forEach(function(item,index,array){
	if(item%2 === 0) return;
	console.log(item);	// 1 3
})
```
	tips: 1. forEach 无法使用break continue 跳出循环,使用return时,效果和在for循环中使用continue一致。
```js
ages.forEach(function(item,index,array){
	if(item%2 === 0){
		break;	// 报错
	}
	console.log(item);
}) 
```

	every()
	测试一个数组内所有元素是否都能通过某个指定函数的测试。返回一个布尔值 
		tips: 若收到一个空数组,次方法在一切情况下都会返回true。
```js
function isBigEnough(element,index,array){
	return element >= 10;
}
console.log( [12,5,8,130].every(isBigEnough) );	// false
```

	some() 
		方法测试数组中是不是有元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
		tips: 和includes方法有异曲同工之妙,都是检测数组中是否拥有满足条件的元素,一旦找到便返回true。
```js
let array = [1,2,3,4,5];
array.some(function(value,index,array){
	return value > 4;
});	// true
```
	
	filter() 
		filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
```js
let words = ['spray','limit','elite','exuberant','destruction','present'];
const result = words.filter( item => {
	return item.length > 6;
} )
console.log(result);	//  ["exuberant", "destruction", "present"]
```

	map()
	map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
```js
var numbers = [1,4,9,16];
const number = numbers.map(item => {
	return Math.sqrt(item);
})
console.log(number);	// [1,2,3,4]
```

	通常情况下，map 方法中的 callback 函数只需要接受一个参数，就是正在被遍历的数组元素本身。但这并不意味着 map 
	只给 callback 传了一个参数
```js
["1", "2", "3"].map(parseInt);	// [1,NaN,NaN]
```
	通常使用parseInt时,只需传递一个参数,但实际上parseInt有两个参数, 第二个参数是表示要转化的进制数。
	上面的方法中,实际上将index索引作为parseInt的第二个参数转入的。
	
	
	reduce()
	对数组中的每个元素执行一个提供的reducer,将其结果汇总为单个返回值。
    
	reduce为数组中的每一个元素一次执行callback函数,不包括数组中被删除或从未被赋值的元素,接受四个参数:
        accumulator 累计器
        cuurentValue    当前值
        cuurentIndex    当前索引
        array           数组

    回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：如果调用reduce()时提供了initialValue，accumulator取值为
    initialValue，currentValue取数组中的第一个值；如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组
    中的第二个值。

    tips:如果数组为空且没有提供initialValue,会抛出TypeError.如果数组中仅有一个元素且没有提供initialValue,或者提供了initialValue但是
    数组为空,那么此唯一值将被返回并且callback不会被执行.
    

    str.split('').reduce((x,y)=>((x[y]?x[y]++:x[y]=1),x),{});
	
	
	entries() / keys() / values()
	
	ES6 提供三个新的方法 entries() keys() 和 values() 用于遍历数组,它们都返回一个遍历器对象,可以用
	for...of 遍历。
```js

let colors = ['red','blue','yellow'];

for(let key of colors.keys()){
	console.log(key);	// 0 1 2
}
for(let value of colors.values()){
	console.log(value);	// red blue yellow
}
for(let [key,value] of colors.entries()){
	console.log(key,value);	
	/*
	0 "red"
	1 "blue"
	2 "yellow"
	*/ 
}

let obj = {
	firstName:'kyrie',
	lastName:'irving',
	age:26
}
for(let key of Object.keys(obj)){
	console.log(key);		// firstName lastName  age 
}
for(let value of Object.values(obj)){
	console.log(value);	// kyrie  irving 26 
}
for(let [key,value] of Object.entries(obj)){
	console.log(key,value);
	/*
	firstName kyrie
	lastName irving
	age 26
	*/
}
```
	find() && findIndex()
		find()方法返回第一个符合条件的数组的成员。 找出第一个返回值为true的成员,然后返回该成员。
		如果没有符合条件的成员,则返回Undefined。
```js
let res1 = [1,4,-5,10].find(n => n < 0);
console.log(res1);	// -5

let res2 = [1,4,-5,10].find(n => n > 12);
console.log(res2);	// undefined

let index1 = [1,4,-5,10].findIndex(n => n < 0);
let index2 = [1,4,-5,10].findIndex(n => n > 12);
console.log(index1,index2);	// 2 -1
```
![数组总结](http://louiszhai.github.io/2017/04/28/array/#%E5%8E%9F%E5%9E%8B)
![数组方法实现](https://juejin.im/post/5d82c12ff265da03a31d6f92)
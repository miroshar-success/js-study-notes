# forEach

	forEach() 对数组的每个元素执行一个提供的函数,该函数返回值为undefined
	
	arr.forEach(callback[,thisArg]);
		callback 为数组中每个元素执行的函数,接受三个参数:
			currentValue 数组中正在处理的当前元素
			index 可选 数组中正在处理的当前元素的索引
			array forEach() 方法正在操作的数组
		thisArg
			当执行回调函数的时候用作this的值。
			
	如果thisArg参数有值,每次callback函数被调用的时候,this都会指向 thisArg 参数上的这个对象。
	如果省略了thisArg参数,或者复制为null或undefined,则this指向全局对象。
```js
const arr = [10,6,5,2];
arr.forEach((ele,index,array)=>{
	console.log(ele,index,array)
})
/*
10 0 [10, 6, 5, 2]
6  1 [10, 6, 5, 2]
5  2 [10, 6, 5, 2]
2  3 [10, 6, 5, 2]
*/ 


arr.forEach(()=>{
	console.log(this);	// 省略this参数据或者传递为undefined null 则指向全局对象
},null/undefined)
```
	tips:
	1. forEach()每每个数组元素执行callback函数,总是返回undefined值。
	2. forEach()不会改变原数组。
	3. 没有办法中止或跳出forEach()循环
```js
const arr = [1,2,3,4]
arr.forEach((item)=>{
	console.log(item*2);	// 2 , 4 ,6 ,8
});
console.log(arr);	// [1,2,3,4]
```

## for循环转换为forEach

```js
let players = ['kyrie','durant','curry','kyrie'];
let copy1 = [...players];
let copy2 = [];
let copy3 = [];

for(let i = 0,len=players.length; i < len; i++){
	copy2.push(players[i])
}

players.forEach((item)=>{
	copy3.push(item);
});

copy1[0] = "Kyrie";
copy2[1] = "Durant";
copy3[2] = "Curry";
console.log(copy1,copy2,copy3);
console.log(players)
```

# some()

	该方法测试是否至少有一个元素可以通过被提供的函数方法，返回一个Boolean类型的值。
	
	arr.some(callback(element[,index[,array]])[,thisArg])
		
		callback
		用来测试每个元素的函数，接受三个参数：
			element 数组中正在处理的元素。
			index   数组中正在处理的元素的索引值。
			array   some()被调用的数组。
			thisArg 执行 callback 时使用的 this 值。
			
	如果找到了这样一个值,some()将立即返回true，否则 some() 返回false。
	
# reduce
	
	reduce()方法对数组中的每个元素执行一个由你提供的reucer函数,将其结果汇总为单个返回值。
	
	reducer()函数接受4个参数：
		Accumulator		(累计器)
		CurrentValue	(当前值)
		CurrentIndex	(当前索引)
		Source Array	(源数组)
		
	array.reduce(callback(accumulator,currentValue[,index[,array]])[,initialValue])
		
		initialValue 作为第一次调用callback函数时的第一个参数的值。如果没有提供初始值,则将使用数组中的
		第一个元素。在没有初始值的空数组上调用reduce将报错。
		
	tips:
	回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：如果调用reduce()时提供了initialValue，
	accumulator取值为initialValue，currentValue取数组中的第一个值；
	如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值.
	
# filter()
	
	创建一个新数组,其包含通过所提供函数实现的测试的所有元素。
		tips: 不改变源数组。
		
	var newArray = arr.filter(callback(element[,index[,array]])[,thisArg])
		
		callback	用来测试数组的每个元素的函数.返回true表示该元素通过测试。保留该元素,false
		则不保留。
			element: 数组中当前正在处理的元素
			index:	 正在处理的元素在数组中的索引
			array:	 调用filter的数组本身
			thisArg: 执行callback时,用于this的值
			
	描述:
		1. filter为数组中的每个元素调用一次callback函数,并利用所有使得callback返回true或等价于true的值的元素创建
		一个新数组。
		2. 如果filter提供一个thisArg参数,则它会作为callback被调用时的this值。否则在非严格模式下this值是全局对象,
		严格模式下为undefined.
		
	tips:
	1. filter不会改变源数组,它返回过滤后的新数组。

# every

	every()方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值
	
		tips:
		1. 若收到一个空数组,此方法在一切情况下都会返回true。

	arr.every(callback[,thisArg])
		如果发现了一个不匹配条件的元素,every将会立即返回false,否则callback为每一个元素返回true，every就会返回true。
		
	tips:
	1. every不会改变源数组。

# map()

	该方法创建一个新数组，其结果是该数组中每个元素都调用一个提供的函数后返回的结果。
	
	tips:
	1. 该方法不会改变源数组

	通常情况下,map方法中的callback函数只需要接受一个参数,就是正在被遍历的数组元素本身。但并不意味着map
	只给callback传了一个参数。
```js
["1","2","3"].map(parseInt);	// [1,NaN,NaN]
```
	上述案例中 parseInt 接受两个参数,第一个参数是需要转化为数值的值,第二个参数为按几进制转化。
	console.log(parseInt.length)	// 2 ,可以验证 该函数需要传递两个参数。
	
	第三个参数parseInt会忽略,但第二个参数不会,也就是说 parseInt把传过来的索引值当成进制数来使用,从而返回了NaN。
	
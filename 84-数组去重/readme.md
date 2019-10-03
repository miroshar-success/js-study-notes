# 数组去重

	1. 利用ES6的Set数据结构
```js
let arr = [1,4,2,4,3,1,5,2];

function unique(arr){
	return [...new Set(arr)];
}
```
	由此，也可以使用此方法对字符串进行去重:
	let str = "abcdcba";
	[...new Set(str)].join("");
	
	Array.from方法也可以将Set结构转换为数组
```js
function unique(arr){
	return Array.from(new Set(arr));
}
```

	2. 利用Array的splice方法删除重复的元素
```js
function unique(arr){
	for(let i = 0, len = arr.length; i < len; i++){
		for(let j = i+1; j < len; j++){
			<!-- 此处如果用Object.is()判断 可以去除NaN  Object.is(arr[i],arr[j])-->
			if(arr[i] === arr[j]){
				arr.splice(j,1);
				j--;
			}
		}
	}
	return arr
}
```

	3. 利用sort()先对数组进行排序，然后分别比较左右两个元素是否相等
```js
function unique(arr){
	let array = [arr[0]];
	arr.sort();
	for(let i = 1, len = arr.length; i < len; i++){
		if( arr[i] !== arr[i-1]){
			array.push(arr[i]);
		}
	}
	return array;
}
```

	4. 利用includes方法判断
```js
function unique(arr){
	let array = [];
	arr.sort();
	for(let i = 0, len = arr.length; i < len; i++){
		if(!array.includes(arr[i])){
			array.push(arr[i]);
		}
	}
	return array;
}
```

	5. 利用indexOf方法判断，本质上和includes方法相同
```js
function unique(arr){
	let array = [];
	for(let i = 0, len = arr.length; i < len; i++){
		if( array.indexOf(arr[i]) === -1){
			array.push(arr[i]);
		}
	}
	return array;
}
```
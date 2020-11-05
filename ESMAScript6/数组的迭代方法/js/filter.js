const words = ["spray","limit","elite","exuberant","destruction","present"];
const result = words.filter(word => word.length > 6);
console.log(result);	//  ["exuberant", "destruction", "present"]
console.log(words);

function isBigEnough(element){
	return element >= 10;
}
const numbers = [12,5,8,130,44]
console.log( numbers.filter(isBigEnough) );	// [12, 130, 44]


// 过滤JSON中的无效条目, 过滤id为非数字且不为0的条目

/*
tips: NaN 和 Infinity 是 Number的两个特殊数值
*/
var arr = [
	{id:15},
	{id:-1},
	{id:0},
	{id:12.2},
	{id:null},
	{id:NaN},
	{id:"undefined"}
]

function isNumber1(obj){
	return obj !== undefined && typeof(obj) === "number" && !isNaN(obj);
}
function isNumber2(obj){
	return Object.prototype.toString.call(obj).slice(8,-1) == "Number" && !isNaN(obj);
}
const newArr1 = arr.filter(function(currentValue){
	if(isNumber1(currentValue.id) && currentValue.id !== 0) {
		return true;
	}
	return false;
});
console.log(newArr1);


const newArr2 = arr.filter(function(item){
	if(isNumber2(item.id) && item.id !== 0){
		return true;
	}
	return false
});
console.log(newArr2);


/*
在数组中搜索
*/
const fruits = ["apple","banana","grapes","mango","orange"];

function checkFruit(query){
	return fruits.filter(function(item){
		return item.toLowerCase().includes(query.toLowerCase())
	})
}

console.log( checkFruit("ap") );
console.log( checkFruit("an") );
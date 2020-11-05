const array = [1,2,3,4];
let result1 = array.reduce((accumulator,currentValue)=>{
	console.log(accumulator,currentValue);
	/*
	1 2
	3 3
	6 4
	10
	*/
	return accumulator + currentValue;
})
console.log(result1);	// 10

let result2 = array.reduce(function(accumulator,currentValue){
	console.log(accumulator,currentValue);
	/*
	5 1
	6 2
	8 3
	11 4
	15
	*/
	return accumulator + currentValue;
},5)
console.log(result2);

[0,1,2,3,4].reduce(function(accumulator,currentValue,currentIndex,array){
	console.table(accumulator,currentValue,currentIndex,array);
	return accumulator + currentValue;
})

var initialValue = 0;
var obj = [
	{x : 1},
	{x : 2},
	{x : 3}
]
const total = obj.reduce(function(total,cur){
	return total + cur.x;
},initialValue);

console.log(total);	// 6


// 将二位数组转化为1维数组
const arr = [[0,1],[2,3],[3,4],[5,6]];
const flatArray = arr.reduce(function(accumulator,currentValue){
	return accumulator.concat(currentValue);
},[]);
console.log(flatArray);


// 计算数组每个元素出现的次数
var names = ["kyrie","lebron","kyrie","curry","wade","curry","kyrie","lebron"];
const NewArr = names.reduce(function(accumulator,currentValue){
	if(accumulator[currentValue]){
		accumulator[currentValue]++;
	}else{
		accumulator[currentValue] = 1;
	}
	return accumulator
},{});
console.log(NewArr);

// 计算一个字符串每个字符出现的次数
let str = "abcddacefda";
const newStr = [...str].reduce((x,y)=>{
	x[y]?x[y]++:(x[y]=1)
	return x;
},{});
console.log(newStr);

// 按属性对object分类
var people = [
	{name:"Alice",age:21},
	{name:"Max",age:20},
	{name:"Jane",age:20}
]

/*
将上述数据按年龄划分,年龄相同的分为一组 {20:[],21:[]}
*/
function GroupPeople(array,prop){
	return array.reduce(function(accumulator,obj){
		let key = obj[prop];	// 获取每个年龄值
		if(!accumulator[key]){
			accumulator[key] = [];
		}
		accumulator[key].push(obj);
		return accumulator;
	},{})
}
console.log(GroupPeople(people,"age"));


var cityList = [
	{name:"安庆",firstLetter:"A"},
	{name:"安阳",firstLetter:"A"},
	{name:"鞍山",firstLetter:"A"},
	{name:"杭州",firstLetter:"H"},
	{name:"黄山",firstLetter:"H"},
	{name:"深圳",firstLetter:"S"},
	{name:"上海",firstLetter:"S"},
]
/*
将城市列表 相同首字母的城市放在一起，改造成
1. {firstLetter:[]}
2. [   {firstLetter:"A",list:[{name:"安庆"},{name:"鞍山"}]}  ]
*/
function GroupCity(array,prop){
	return array.reduce(function(accumulator,currentValue){
		let key = currentValue[prop];
		if(!accumulator[key]){
			accumulator[key] = [];
		}
		accumulator[key].push({name:currentValue["name"]});
		return accumulator;
	},{});
}
const newCity = GroupCity(cityList,"firstLetter");
console.log(newCity);


//
var friends = [{
	name: 'Anna',
	books: ['Bible', 'Harry Potter'],
	age: 21
}, {
	name: 'Bob',
	books: ['War and peace', 'Romeo and Juliet'],
	age: 26
}, {
	name: 'Alice',
	books: ['The Lord of the Rings', 'The Shining'],
	age: 18
}];

const AllBooks = friends.reduce(function(accumulator,currentValue){
	return [...accumulator,...currentValue.books];
},[]);

console.log(AllBooks);


// 数组去重
let ages = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = ages.sort().reduce((init,current)=>{
	if(init.length === 0 || init[init.length-1] !== current ){
		init.push(current);
	}
	return init;
},[]);
console.log(result);

console.log(ages);
["a","b","c"].forEach(element=>{
	console.log(element);
})
const arr = [10,6,5,2];
arr.forEach((currentValue,index,array)=>{
	console.log(currentValue,index,array);
	console.log(currentValue*2);
},undefined);

console.log(arr);

// 无法中止或跳出forEach()循环
['kyrie','lebron','durant','curry'].forEach((item)=>{
	console.log(item);	// kyrie lebron  durant curry
	if(item==='lebron'){
		return;
	}
})

// 复制一个数组
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
console.table(copy1);
console.table(copy2);
console.table(copy3);
console.table(players)

let ages = [20,17,30,28];
let obj = {
	age:27,
	name:'kyrie'
}
ages.forEach((item)=>{
	console.log(item,this);
},ages)

console.log( ages.filter(function(item){
	return this.age > item
},obj) );


// 如果数组在迭代时被修改了，则其他元素会被跳过
var words = ["one","two","three","four"];
words.forEach(function(word){
	console.log(word);
	if(word == "two"){
		words.shift();
	}
})
console.log(words)
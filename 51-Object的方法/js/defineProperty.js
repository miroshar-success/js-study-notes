let player = {}
Object.defineProperty(player,'name',{
	value:'kyrie',
	enumerable:true,
	configurable:true,
	writable:true
});
player.name = 'lebron';
console.log(player);    // {name: "lebron"}

delete player.name;
console.log(player);    // {}

for(key in player){
	console.log(key);   // name
}

// 在对象中添加一个 属性与数据描述符的示例
let o = {};
Object.defineProperty(o,'a',{
	value:37,
	enumerable:true,
	configurable:true,
	writable:true
})
console.log(o)  // {o:37}

// 在对象中添加一个属性与存取描述符的示例
var bValue;
Object.defineProperty(o,'b',{
	get:function(){
		return bValue;
	},
	set:function(newValue){
		bValue = newValue;
	},
	configurable:true,
	enumerable:true
})
console.log(o)
o.b = 38;

// enumerable属性
let obj = {}
Object.defineProperty(obj,'a',{
	value:1,
	enumerable:true
});
Object.defineProperty(obj,'b',{
	value:2,
	enumerable:false
})
Object.defineProperty(obj,'c',{value:3});
obj.d = 4;

for(let key in obj){
	console.log(key);   // a d
}
console.log(Object.keys(obj));  // ['a','d']
const bool = new Boolean(true);
console.log(typeof bool);
console.log(bool == bool.valueOf());
console.log(bool.valueOf());
console.log(typeof bool.valueOf())

var array = [1,2,true];
console.log(array.valueOf());
console.log(array.valueOf() === array); // true


var date = new Date();
console.log(date.valueOf());    // 1590670378829

var num = 12.36540;
console.log(num.valueOf());
console.log(typeof num.valueOf())


function foo(){}
console.log(foo.valueOf() === foo);

var obj = {
	name:'张三',
	age:18
}
console.log(obj.valueOf() === obj);
console.log(obj);

var str = 'http://www.baidu.com';
console.log(str.valueOf() === str);


var foo2 = new Function('x','y','return x + y');

console.log(foo2.valueOf())
// var firstName = "Kyrie";
// var lastName = "irving";
// var year = 2019;
// // 这种方法可以一眼看出输入了哪些变量
// export {firstName,lastName,year}

// export default function multiply(x,y){
// 	console.log(x * y);
// }
// 

export var foo = "bar";
setTimeout(function(){
	foo = "baz";
},3000);

var firstName = "lebron";
var lastName = "james";
var team = 'Lakers';
export {firstName,lastName,team};

export function area(radius){
	return Math.PI * radius * radius;
}
export function circumference(radius){
	return Math.PI * Math.pow(radius,2);
}

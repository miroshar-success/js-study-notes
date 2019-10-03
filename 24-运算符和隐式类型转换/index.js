var a = 10;
var b = undefined;
var c = false;

console.log( a&&b&&c );

var aLi = document.querySelectorAll('li');

for(let item,i = 0; item = aLi[i++];){
    console.log(item);
}

for(let i of aLi){
    console.log(aLi[i]);
}

console.log(true && [1,3]);     // [1,3]
console.log(false && [1,3]);    // false
console.log([1,3] && typeof null);  // object
console.log([1,3] && NaN && typeof null); // NaN
console.log(false || 'kyrie');      // kyrie        前面为真,返回前面；前面为假,返回后面。
console.log(true || 'kyrie');       // true 
console.log(null || typeof undefined); // undefined
console.log(null || typeof undefined || typeof typeof undefined); // undefined 
console.log(typeof undefined);  // undefined
console.log( (!!'' + !!' '-!!false) && null);   // null
console.log( !!'' + !!' ' - !!false);
console.log(false + true);  // 1
console.log( (!!'' + !!' ' - !!false) || [1,2] && null ); // 1  tips:&& 的优先级高于 ||
console.log( (!!'' + !!' ' - !!false || ([1,2] ) && null) ); 
console.log( [] == [] );    // false        对象的引用

var arr1 = [1,2,3];
var arr2 = arr1;
arr2[0] = 'kyrie';
console.log(arr1);
console.log(arr2 == arr1);  // true

console.log([] == ![]);     // true;
console.log({} == {});  // false;
console.log({} != {});  // true;
console.log(2+null);    // 2
console.log(null == 0); // false
console.log(null == false); // false;
console.log(null + undefined); // NaN;
console.log(null + null);  //  0
console.log(undefined + undefined); // NaN;
console.log(2 + undefined); // NaN;
console.log(null + typeof undefined);   // nullundefined
console.log(typeof (typeof undefined)); // string
console.log( typeof undefined); // undefined
console.log(typeof (typeof null) );   // string
console.log(null + [1,2,3]);    // null1 2,3 
console.log(1 + [2,3,4]);   // 12,3,4
console.log(undefined + [1,2,3]);   // undefined1,2,3
console.log(null == null);  // true;
console.log(undefined == undefined);    // true
console.log(undefined == null); // true;

console.log([] == false);   // true
console.log([1] == false);  // false
console.log([] == '');  // true;
console.log([] == ' '); // false;

var arr = [];
console.log(typeof arr);    // object
if(arr){
    console.log('it is true');  
}   
// it is true;
console.log(arr == false);  // true;
console.log(arr == true);   // false;
console.log(Boolean(arr));  // true;

console.log(Number([]));    // 0
console.log(Number(false)); // 0

console.log( [undefined] == false );    // true
console.log( [null] == false);  // true;
console.log([0] == false);  // true
console.log([1] == false);  // false
console.log([undefined,null] == false); false;
console.log(Number(null));  // 0
console.log(Number(undefined)); // NaN
console.log(Number([1,2])); // NaN;
console.log(Number[2]); // undefined;
console.log(Number([undefined]));    // 0;
console.log(Number([null]));    //  0

(function(){
    console.log('立即执行函数');
})();
~function(){
    console.log('立即执行函数');
}();
+function(){
    console.log('立即执行函数');
}();
-function(){
    console.log('立即执行函数');
}();

console.log(({}).toString());
console.log(String(null));
console.log(String(undefined));



var age = 29;
var anotherAge = --age + 2;
console.log(age);	// 28
console.log(anotherAge);	// 30


var num1 = 2;
var num2 = 20;
var num3 = --num1 + num2;
var num4 = num1 + num2;
console.log(num3,num4);	// 21 21


var number1 = 2;
var number2 = 20;
var number3 = number1-- + number2;
var number4 = number1 + number2;
console.log(number3,number4);	// 22 21


let age1 = 20;
console.log(age1++);		// 20
console.log(age1);		// 21

let age2 = 20;
console.log(++age2);	// 21
console.log(age2);	// 21
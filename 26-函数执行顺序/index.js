function m1(){
    var a = b = 10;
    console.log(a,b);
}
m1();   // 10,10

function m2(){
    // var x = y = 10;
    y = 10;
    var x = y;
}
// m2();
// console.log(x,y);   // x报错,y = 10;

function f1(){
    function f2(){
        var m = 'f2';
        f3()
    }
    f2();
}
let m = 'window';
function f3(){
    console.log(m);
}
window.onload = f1;     // window

// 声明提前,赋值留在原地
var num = 10;
fun();  // undefined
function fun(){
    console.log(num);
    var num = 20;
}


var foo;
foo();
function foo(){
    console.log(foo);
}
//  输出函数本身

// var number = 5;
// number();
// function number(){
//     console.log(number);
// }
// number is not a function

var abc = 'window';
function m3(){
    console.log(abc);   // undefined
    var abc = 'm';
    console.log(abc);   // m
}
m3(); 

console.log(p); // undefined;
console.log(q); // undefined;
{
    var p;
    function q(){
        console.log('Hhello World');
    }
}

// let 不允许重复声明
let player = 'kyrie';
    player = 'lebron';
console.log(player);

// var 允许重复声明,并且后面的值会覆盖前面的  
var name = 'jack';
var name = 'kyrie';
console.log(name);


var aLi = document.querySelectorAll('.list li');
// for(let i = 0, l = aLi.length; i < l; i++){
//     aLi[i].onclick = function(){
//         console.log(i);
//     }
// }

for(var i = 0, l = aLi.length; i < l; i++){
    aLi[i].onclick = function(){
        console.log(i); // 3
    }
}
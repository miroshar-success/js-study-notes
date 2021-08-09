//块级作用域 ------------------------
for(let i = 0; i < 3; i++) {
  for(let i = 0; i < 3; i++){
    console.log('hello world')
  }
  console.log('i:',i)
}
/*
hello world
hello world
hello world
i: 0
hello world
hello world
hello world
i: 1
hello world
hello world
hello world
i: 2
*/

for(var i = 0; i < 3; i++){
  for(var i = 0; i < 3; i++){
    console.log('你好,世界')
  }
  console.log('i:',i)
}
/*
你好,世界
你好,世界
你好,世界
i: 3
*/
// -----------------------------------------

var a = []
// for(var i = 0; i < 10; i++){
//   a[i] = function(){
//     console.log(i)
//   }
// }
// a[6]()  // 10
// a[9]()  // 10

/*  利用闭包解决*/
for(var i = 0; i < 10; i++){
  a[i] = (function(i) {
    return function() {
      console.log(i)
    }
  })(i)
}
a[6]()  // 6

for(let i = 0; i < 10; i++){
  a[i] = function(){
    console.log(i);
  }
}
a[5]()  //5

// ---------------------------------
// 循环变量的那部分是一个父作用域,循环体内部是子作用域
for(let i = 0; i < 3; i++){
  let i = 'abc'
  console.log(i)
}
/* abc
abc
abc*/


// --------------------------
// 内层变量覆盖外层变量, 以及变量泄漏为全局变量
var tmp = new Date();
function f(){
  console.log(tmp); // undefined
  if(false) {
    var tmp = 'hello world';
  }
}
f()

for(var j = 0; j < 5; j++){
  console.log(j)
}
console.log('j:',j) // 5


// function f(){
//   console.log('I am outside')
// }
// (function(){
//   if(false) {
//     function f(){
//       console.log('I am inside!')
//     }
//   }
//   f()
// })()

console.log(globalThis)
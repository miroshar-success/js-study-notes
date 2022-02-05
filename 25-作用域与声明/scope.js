// 块作用域
/* try {
  var b = 10
  function foo() {
    console.log(a)
  }
  foo()
}catch(err) {
  var c = 20
  console.log('err', err) // a is not defined
}
console.log(c)  // 20
console.log(b)  // 10 */



// ------------- 函数优先 -----------
foo()

var foo;
function foo() {
  console.log(1)  // 1
}
foo = function() {
  console.log(2)
}



baz()
function baz() {
  console.log(1)
}
var baz = function() {
  console.log(2)
}
function baz() {
  console.log(3)
}

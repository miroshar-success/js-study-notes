// 闭包
function power(power){
  return function(number) {
    return Math.pow(number,power)
  }
}

const p = power(2);
console.log(p(5))
console.log(p(6))
console.log(p(100));


function getSalary(level) {
  return function(performance){
    return level + performance
  }
}
const level1 = getSalary(12000)
const level2 = getSalary(15000)

console.log(level1(2000))
console.log(level2(3000));

// 调用函数的
var foo = function bar(){
  console.log('hello', arguments.callee.name);
}
foo()
// bar()

let x = 1;
function baz() {
  if( x < 10) {
    console.log(x)
    x += 1;
    arguments.callee()
  }
}
baz();


function foo1(i) {
  if (i < 0) return;
  console.log('begin: ' + i);
  foo1(i - 1);
  console.log('end: ' + i);
}
foo1(1);



// 闭包
function addSquare(a,b) {
  function square(x) {
    return x * x
  }
  return square(a) + square(b)
}
const a1 = addSquare(3,4)
const a2 = addSquare(6,8)
console.log(a1,a2)  // 25 100


function outside(x){
  function inside(y) {
    return x + y;
  }
  return inside
}

const fn_inside = outside(5)
console.log(fn_inside(5)) // 10 
console.log(fn_inside(8)) // 13
console.log(fn_inside(10))  // 15


function m1(x){
  function m2() {
    x += 1
    console.log(x)
  }
  return m2
}

const inside_m1 = m1(8);
inside_m1() // 9
inside_m1() // 10


const inside_m2 = m1(5)
inside_m2() // 6
inside_m2() // 7
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
function checkAge(min) {
  return function(age) {
    return age >= min
  }
}

let check18 = checkAge(18);

console.log(check18(20))  // true 
console.log(check18(16)); // false



function pow(x){
  return function (y) {
    return Math.pow(y,x)
  }
}
const pow2 = pow(2)
const pow3 = pow(3)

console.log(pow2(5))  // 25
console.log(pow2(8))  // 64
console.log(pow3(10)) // 1000


// const add = function(value) {
//   var result = [];
//   result.push(value)
//   const _add = function(value2) {
//     result.push(value2)
//     return _add;
//   }
//   _add.getResult = function(){
//     return result
//   }
//   return _add;
// }

// console.log(add(1)(2)(3)(4)(5).getResult())

function get_sum(){
  let sum = 0;
  if([...arguments].length > 1) {
    sum = [...arguments].reduce((prev,next) => prev+next,0)
  }else{
    sum = [...arguments][0]
  }
  const _add = function() {
    if([...arguments].length > 1) {
      sum += [...arguments].reduce((prev,next) => prev + next,0)
    }else{
      sum += [...arguments][0]
    }
    return _add;
  }
  _add.getSum = function(){
    return sum;
  }
  return _add;
}
console.log(get_sum(1)(2)(3)(4).getSum()) // 10
console.log(get_sum(1,2,3)(4).getSum())  // 10
console.log(get_sum(1,2)(3)(4).getSum()) // 10
console.log(get_sum(1)(2)(3,4).getSum()) // 10


function match(reg){
  return (str) => {
    return str.match(reg)
  }
}

const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)
console.log(haveSpace('hello world'))
console.log(haveNumber('1234'));

console.log(['kyrie irving','kevin_love'].filter(haveSpace))



// 实现一个通用的函数柯里化方法
/*
const add = curried(sum)
add(1)(2)(3)
add(1,2)
*/ 

function sum(a,b,c,d){
  return a + b + c + d;
}

function curried(fun){
  return function curriedFun(...args){
    console.log('...args:',args)
    if(args.length < fun.length) { // 传递的参数小于柯里化函数的参数个数,说明还有部分参数需要接收,此时再返回一个函数,接收剩余的参数
      return function() {
        const arr = [...args,...arguments];
        return curriedFun(...arr)
      }
    }
    return fun(...args)
  }
}

const add = curried(sum)
// console.log(add(1,2,3,4)) // 10
// console.log(add(1)(2)(3)(4))  // 10
console.log(add(1,2)(3,4))  // 10
// console.log(add(1)(2)(3,4)) // 10



function my_curry(fun) {
  return function (...args) {
    return function() {
      const arr = [...args,...arguments]
      return fun.apply(null,[...arr])
    }
  }
}

const my_add = my_curry(sum)
console.log('h',my_add(1,2)(3,4)) // 10
console.log(my_add(1,2,3)(4)) // 10
console.log(my_add(1)(2,3,4)) // 10
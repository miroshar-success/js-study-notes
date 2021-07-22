// map
function my_map(f,array) {
  const result = []
  for(let i = 0; i != array.length; i++){
    result[i] = f(array[i])
  }
  return result;
}

let arr = [1,2,3,4,5,6,7,8,9,10]

const r1 = my_map(function(x){
  return x > 5
},arr)

const r2 = my_map(function(x){
  return x * 2
},arr);

console.log('r1:',r1)
console.log('r2:',r2)

// forEach方法
function myForeach(array,fn) {
  for(let i = 0, length = array.length; i < length; i++){
    fn(array[i])
  }
}

myForeach(arr,function(item) {
  console.log(item)
})


// filter
function filter(array,fn) {
  const result = []
  for(let i = 0, length = array.length; i < length; i++ ){
    if(fn(array[i])){
      result.push(array[i])
    }
  }
  return result
}
const r3 = filter(arr, function(item) {
  return item % 2 === 0
})
console.log('r3:',r3)


function map(f,a) {
  let result = [];
  let i;
  for(i = 0; i != a.length; i++){
    result[i] = f(a[i]);
  }
  return result;
}
const f = function(x){
  return x * x * x;
}
let numbers = [0,1,2,5,10];
let cube = map(f,numbers);
console.log('cube:',cube);

// function scope
// The following variables are defined in the global scope
let num1 = 20,
    num2 = 3,
    name = 'kyrie';
// This function is defined in the global scope
function multiply() {
  return num1 * num2;
}
console.log(multiply()) //return 60

// A nested function example
function getScope(){
  var num1 = 2,
      num2 = 3;
  function add(){
    return name + 'scoped' + (num1 + num2);
  }
  return add()
}
console.log(getScope()); // kyrie scoped 5;


// 函数作为返回值
function once(fn){
  let done = false
  return function() {
    if(!done) {
      done = true 
      console.log('arguments:',arguments)
      return fn.apply(null,arguments)
    }
  }
}

let pay = once(function(money) {
  console.log('支付了'+ money + '元');
})
pay(5)
pay(10)
pay(5);

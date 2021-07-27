// 函数组合, 将就数组的最后一个元素 以函数组合的形式实现
function reverse(array) { // 将数组倒序
  return array.reverse()
}
function first(array){ // 返回数组第一个元素
  return array[0]
}

// function compose(f,g){
//   return function(arr) {
//     return f(g(arr))
//   }
// }

// const l = compose(first,reverse)
// console.log(l([1,2,3,4,5])) // 5


// 实现一个compose函数
function compose(...args) {
  // 必须每个参数都是函数
  let flag = args.every(fn => typeof fn === 'function');
  if(!flag) {
    throw new Error('arguments expected function');
  }
  return function(value) { // 要处理的数据
    return args.reverse().reduce((acc,cur) => {
      return cur(acc)
    },value)
  }
}

let l = compose(first,reverse);
console.log(l([1,2,3,4,5])) // 5


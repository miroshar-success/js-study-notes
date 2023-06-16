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
  const flag = args.every(fn => typeof fn === 'function');
  if(!flag) {
    throw new Error('arguments expected function');
  }
  return function(value) { // 要处理的数据
    return args.reverse().reduce((acc,cur) => {
      return cur(acc)
    },value)
  }
}

const l = compose(first,reverse);
console.log(l);
console.log(l([1,2,3,4,5])); // 5

// ---------------------- reduceRight -------------------------
([1,2,3,4,5]).reduceRight((prev, next, index, array) => {
  console.log(prev, next, index, array)
  return prev + next
}, 0)

// ------------ 使用reduceRight -------------------
const _compose = (...args) => {
  const flag = args.every(arg => typeof arg === 'function')
  if (!flag) {
    throw new Error('Expect function')
  }
  return function (arguments) {
    return args.reduceRight((prev, next) => next(prev), arguments)
  }
}

const sum = (a) => a + a
const multiple = (a) => Math.pow(a, 2)
// 查看中间状态
const tap = (val) => {
  console.log('val:', val)
  return val
}

const compose_fn = _compose(sum, tap, multiple);
// 从右向左举个调用, 每个函数的返回值 传递给下一个函数作参数
console.log(compose_fn(1), compose_fn(2)) // 4    16

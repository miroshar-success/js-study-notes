// --------------- forEach ----------------------
Array.prototype._forEach = function(fn) {
  const list = this
  for (let i = 0, length = list.length; i < length; i++) {
    const item = list[i]
    fn(item, i, list)
  }
}
const players = ['kevin', 'kyrie', 'wade', 'lebron']
players._forEach((player, i, array) => {
  console.log(player, i, array)
})
/**
kevin   0 [ 'kevin', 'kyrie', 'wade', 'lebron' ]
kyrie   1 [ 'kevin', 'kyrie', 'wade', 'lebron' ]
wade    2 [ 'kevin', 'kyrie', 'wade', 'lebron' ]
lebron  3 [ 'kevin', 'kyrie', 'wade', 'lebron' ]
*/

// --------------- forEach 遍历对象 ------------------
Object.prototype._forEach = function(fn) {
  const obj = this
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(key, obj[key], obj)
    }
  }
}
const player = {
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30
}

player._forEach((key, value, object) => {
  console.log(key, value, object)
})
/**
firstName kyrie { firstName: 'kyrie', lastName: 'irving', age: 30 }
lastName irving { firstName: 'kyrie', lastName: 'irving', age: 30 }
age 30 { firstName: 'kyrie', lastName: 'irving', age: 30 }
*/


const unless = (predicate, fn) => {
  if (predicate) {
    fn()
  }
}
// 获取列表中的偶数
[1, 2, 3, 4, 5]._forEach(item => {
  unless(item % 2 === 0, () => {
    console.log('偶数:', item)  // 2  4
  })
})

const times = (times, fn) => {
  for (let i = 0; i <= times; i++) {
    fn(i)
  }
}

times(50, (item) => {
  unless(item % 2 !== 0, () => {
    console.log('奇数', item)
  })
})

// ---------------------- every ----------------------
// 检测数组每一项是否为true
Array.prototype._every = function(fn) {
  const list = this
  let result = true
  for (let i = 0, length = list.length; i < length; i++) {
    const item = list[i]
    result = fn(item)
    if (!result) break
  }
  return result
}

console.log([1, 2, 3, 4]._every(item => item % 2 === 0))      // false
console.log([2, 4, 6, 8, 10]._every(item => item % 2 === 0))  // true
console.log([1, 3, 5, 7, 9]._every(item => item % 2 !== 0))   // true

console.log([NaN, NaN, 4]._every(Number.isNaN)) // false
console.log([NaN, NaN]._every(Number.isNaN))    // true

// --------------------- some --------------------
// 有一个返回true 即返回true, 否则返回false
Array.prototype._some = function(fn) {
  const list = this
  let result = false
  for (const item of list) {
    result = fn(item)
    if (result) break
  }
  return result
}

console.log([1, 2, 3, 4, 5]._some(item => item > 6))  // false
console.log([NaN, NaN, 4]._some(Number.isNaN))        // true
console.log(['hello', 'world', '你好', '世界']._some(item => item.length === 5))  // true


// ------------------- sort 是一个高阶函数 ------------------------
const sortBy = property => (a, b) => {
  const result = (a[property] < b[property] ? -1 : (
    a[property] === b[property] ? 0 : 1
  ))
  return result
}
const ages = [{ name: 'bob', age: 32}, { name: 'jack', age: 38 }, { name: 'alice', age: 15}, { name: 'john', age:18}]

console.log(ages.slice().sort(sortBy('age')))
console.log(ages.slice().sort(sortBy('name')))


const strings = ['1', '2', '3']
console.log(strings.map(Number.parseInt)) // [1 NaN NaN]

const uncurry = (fn) => {
  if (fn.length === 1) return fn
  return arg => fn(arg)
}
console.log(strings.map(uncurry(Number.parseInt)))  // [1, 2, 3]

// ------------------ once 函数 ------------------
// 只需要运行一次给定的函数。 如发起一次银行支付请求, 初始化一次支付设置。
const once = (fn) => {
  let done = false
  return function(...args) {
    if (done) return
    done = true
    return fn.apply(this, args)
  }
}
const pay = (number) => {
  console.log(`我支付了 ${number} 元`)
}
const once_pay = once(pay)
once_pay(10000)
once_pay(15000)
once_pay(20000)
// 只输出了 我支付了 15000 元

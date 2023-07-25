// ------------------ 缓存代理 ---------------------
const multiple = function(length) {
  let a = 1
  for (let i = 1; i < length; i++) {
    a *= i
  }
  return a
}

const plus = function(length) {
  let a = 0
  for (let i = 0; i < length; i++) {
    a += i
  }
  return a
}

const createProxyFactory = function(fn) {
  const cache = {}
  return function() {
    const args = Array.prototype.join.call(arguments, ',')
    if (cache.hasOwnProperty(args)) {
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
}

const proxyMultiple = createProxyFactory(multiple)
const proxyPlus = createProxyFactory(plus)

console.time('start')
// console.log(proxyPlus(100000000))
proxyMultiple(100000)
console.timeEnd('start')

console.time('end')
// console.log(proxyPlus(100000000))
proxyMultiple(100000)
console.timeEnd('end')

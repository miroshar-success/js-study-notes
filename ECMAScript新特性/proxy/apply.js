function fn() {
  console.log('i am a function')
}

const proxyFn = new Proxy(fn, {
  apply(target, ctx, args) {
    console.log(target, ctx, args)
    console.log('i am a proxy')
  }
})

proxyFn() // i am a proxy

proxyFn.call({name: 'hello'}, 1,2,3)



function sum(a, b, c) {
  return a + b + c
}
const proxyDoubleSum = new Proxy(sum, {
  apply(target, context, args) {
    console.log(context)
    return target(...args) * context.times
  }
})

console.log(sum(1,2,3)) // 6
console.log(proxyDoubleSum.call({times: 2}, 1,2,3)) // 12

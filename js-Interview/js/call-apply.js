// ------------- 手写 call / apply -----------
Function.prototype._call = function (context, ...args) {
  if (context === null || context === undefined) {
    context = globalThis
  }
  if (typeof context !== 'object') {
    context = Object(context)
  }
  console.log('context:', context) //context传入的不是对象的时候: [Number: 100] / [String: '123']
  const self = this
  const key = Symbol()  // key 防止对对象的 属性覆盖
  context[key] = self
  const result = context[key](...args)
  Reflect.deleteProperty(context, key)
  return result
}

// ------------- 测试 -------------
const car = {color: 'red', price: '100w' }
function logCarInfo () {
  console.log(this.color, this.price)
}
logCarInfo._call(car)  // red  100W

logCarInfo._call(100)
logCarInfo._call('123')

function fn (a, b, c) {
  console.log(this, a, b, c)
  // { name: 'call' } 10 20 30
}
fn._call({name: 'call'}, 10, 20, 30)
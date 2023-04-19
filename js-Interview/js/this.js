console.log('---------------- this -------------------')
const phone_1 = {
  name: 'iPhone',
  wait () {
    setTimeout(function() {
      // window undefined
      console.log(this, this.name)
    }, 1000)
  }
}

const phone_2 = {
  name: 'iPad',
  wait () {
    setTimeout(() => {
      // phone_2, iPad
      console.log(this, this.name)
    }, 1000)
  }
}
phone_1.wait()
phone_2.wait()

const copy_wait = phone_2.wait
copy_wait()
// this ---> window     undefined   隐式绑定

console.log('--------------------bind-----------------')

function fn1(a, b, c) {
  console.log('this', this) // { x: 100 }
  console.log(a, b, c) // 10 20 30
  return 'this is fn1'
}
const fn2 = fn1.bind({ x: 100 }, 10, 20, 30)
console.log(fn2())  // this is fn1

console.log('---------------- 手写bind ---------------')

Function.prototype.myBind = function() {
  const [_this, ...args] = [...Array.from(arguments)]
  const call_fn = this
  return function() {
    return call_fn.apply(_this, args)
  }
}

const my_bind_fn = fn1.myBind({ name: 'kyrie'}, 1, 2, 3)
console.log(my_bind_fn())

console.log('-------------- 手写apply ------------------')

Function.prototype.myApply = function(context, args) {
  if(context === null || context === undefined) context = globalThis
  if(typeof context !== 'object') context = Object(context)
  const fnKey = Symbol()  // 防止属性名称被覆盖
  context[fnKey] = this
  console.log(args, ...args)
  const result = context[fnKey](...args)
  delete context[fnKey]
  return result
}

Function.prototype.Apply = function() {
  const args = [...arguments]
  let context = args.shift()
  context = context === null ? globalThis : context;
  const fnKey = Symbol('fn')
  context[fnKey] = this
  const result = context[fnKey](...args[0])
  return result
}

const numbers = [1, 2, 3, 4, 5]
console.log(Math.min.Apply(null, numbers))
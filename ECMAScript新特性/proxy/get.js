/* const p = new Proxy(target, {
  get: function(target, property, receiver){
    // target:目标对象  property:获取的属性名 receiver:Proxy或者继承Proxy的对象
  }
})
 */

const player = new Proxy({
  firstName:'kyrie',
  lastName:'irving',
  age:30
}, {
  get: function(target, prop, receiver){
    if(prop === 'age'){
      return 18
    }
    return target[prop]
  }
})
console.log(player.age) // 18
console.log(player.firstName) // kyrie


// ---------- get方法可以继承 ---------
const proto = new Proxy({}, {
  get(target, prop, receiver) {
    console.log('get', prop)
    return target[prop]
  }
})
const obj = Object.create(proto)
console.log(obj.foo)  // get foo



const object = {}
Object.defineProperty(object, 'a', {
  configurable: false,
  enumerable: false,
  value: 10,
  writable: false
})

const proxy_object = new Proxy(object, {
  get: function(target, prop) {
    return 20
  }
})
console.log(proxy_object.a) // 报错, a是一个不可配置的属性

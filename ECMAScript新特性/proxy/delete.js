const proxy = new Proxy({
  _prop: 'hello',
  prop: 'world'
}, {
  deleteProperty(target, key) {
    if(key.startsWith('_')) {
      return false
    }
    return Reflect.deleteProperty(target, key)
  }
})
console.log('start:', proxy)  // { _prop: 'hello', prop: 'world' }
delete proxy._prop
console.log(proxy)  // { _prop: 'hello', prop: 'world' }
delete proxy.prop
console.log(proxy)  //

console.log('_prop'.startsWith('_'))  // true

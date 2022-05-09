const proxy = new Proxy({
  _prop: 'hello',
  prop: 'world'
}, {
  has(target, key, receiver) {
    if(key.startsWith('_')) {
      return false
    }
    return key in target
  }
})

console.log('_prop' in proxy) // false


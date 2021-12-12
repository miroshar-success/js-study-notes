const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

const arrayMethods = Object.create(Array.prototype)

function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    enumerable: true,
    configurable: true,
    writable: true
  })
}

methodsToPatch.forEach(function(method) {
  const original = Array.prototype[method]
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args)
    let inserted
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.splice(2)
        break
    }
    return result;
  })
})

const array = [1,2,3,4,5]
const players = ['kyrie','lebron']
array.__proto__ = arrayMethods;

// console.log(array, players)
console.log(arrayMethods, typeof arrayMethods, Array.isArray(arrayMethods))

const keys = Object.getOwnPropertyNames(arrayMethods)

const singers = ['jay chou']
console.log('singers', singers)

function copyAugment(target, src , keys){
  for(let i = 0, length = keys.length; i < length; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

copyAugment(singers, arrayMethods, keys)
console.log('singers', singers, singers[0], singers[1])

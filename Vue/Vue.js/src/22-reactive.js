const isPlainObject = value => typeof value === 'object' && value !== null

const convert = target => isPlainObject(target) ? reactive(target) : target

function hasOwn(target,key){
  return Object.prototype.hasOwnProperty.call(target,key)
}

function reactive(target) {
  if(!isPlainObject(target)) return target
  const handler = {
    get:function(target, prop, receiver){
      const result = Reflect.get(target, prop, receiver)
      return convert(result)
    },
    set:function(target, prop, value, receiver){
      const oldValue = target[prop]
      let result = true;
      if(oldValue !== value){
        result = Reflect.set(target, prop, value, receiver)
      }
      return result
    },
    deleteProperty:function(target, key){
      const result = Reflect.deleteProperty(target, key)
      if(hasOwn(target,key) && result){
        console.log('delete', key)
      }
      return result
    }
  }
  return new Proxy(target, handler)
}

export default reactive

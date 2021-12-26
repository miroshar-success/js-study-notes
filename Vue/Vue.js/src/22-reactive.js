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
      //  收集依赖
      track(target, prop)
      return convert(result)
    },
    set:function(target, prop, value, receiver){
      const oldValue = target[prop]
      let result = true;
      if(oldValue !== value){
        result = Reflect.set(target, prop, value, receiver)
        trigger(target, prop)
      }
      return result
    },
    deleteProperty:function(target, key){
      const result = Reflect.deleteProperty(target, key)
      if(hasOwn(target,key) && result){
        trigger(target, prop)
      }
      return result
    }
  }
  return new Proxy(target, handler)
}


// ----- 目标对象 ---- 属性 ----- 箭头函数 ------
let activeEffect = null
function effect(callback) {
  activeEffect = callback
  callback()
  activeEffect = null
}
// ---------收集依赖---------
const targetMap = new WeakMap()
function track(target, key) {
  if(!activeEffect) return;
  let depsMap = targetMap.get(target)
  if(!depsMap){
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if(!dep){
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}


function trigger(target,key){
  const depsMap = targetMap.get(target)
  if(!depsMap) return;
  const deps = depsMap.get(key)
  if(deps){
    deps.forEach(effect => {
      effect()
    })
  }
}


// ----------- ref ------------
// __v_isRef 标识是一个ref对象
function ref(raw) {
  if(isPlainObject(raw) && raw.__v_isRef) return raw
  let value = convert(raw)  // 如果是对象,转换为一个响应式对象,否则返回值本身
  const r = {
    __v_isRef: true,
    get value() {
      track(r, 'value')
      return value
    },
    set value(newValue){
      if(value !== newValue){
        raw = newValue;
        value = convert(raw)
        trigger(r, 'value')
      }
    }
  }
  return r
}


// ------------- toRefs --------------
// 将解构的对象转换为响应式
function toRefs(proxy) {
  const ret = {}
  for(const key in proxy){
    ret[key] = toProxyRef(proxy, key)
  }
  return ret
}

function toProxyRef(proxy, key){
  const r = {
    __v_isRef: true,
    get value() {
      return proxy[key]
    },
    set value(newValue){
      proxy[key] = newValue;
    }
  }
  return r;
}


// ---------------- computed ----------------
function computed(getter){
  const result = ref()
  effect(() => {
    result.value = getter()
  })
  return result
}

export {
  reactive,
  effect,
  ref,
  toRefs
}

const monster = {
  eyeCount: 4
}

const monster_proxy = new Proxy(monster, {
  set:function(obj, prop, value) {
    if(prop === 'eyeCount' && (value%2 !== 0)){
      console.log('Monsters must have an even number of eyes')
    }else{
      obj[prop] = value
      return true
    }
  }
})
// monster_proxy.eyeCount = 1  // 无法设置, 必须为偶数
monster_proxy.eyeCount = 2
console.log(monster_proxy.eyeCount) // 2


// ------------- set()方法应该返回一个布尔值, 返回true 代表属性设置成功 --------------
const set_proxy = new Proxy({}, {
  set:function(target, prop, value, receiver){
    target[prop] = value;
    console.log('property set:', prop , value)
    return true
  }
})
console.log('a' in set_proxy) // false
set_proxy.a = 10;
console.log('a' in set_proxy) // true
console.log(set_proxy.a)  // 10


// ---------- person.age 合法 ---------------
const person = new Proxy({}, {
  set(target, prop, value, receiver) {
    if(prop === 'age') {
      if(value > 175) {
        console.log('error')
        return false
      }
    }
    target[prop] = value
    return true
  }
})

person.age = 100
person.name = 'hello'
console.log('person', person) // person { age: 100, name: 'hello' }

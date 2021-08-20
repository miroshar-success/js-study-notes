//------------------------- proxy
const person = {
  name:'kyrie',
  age:30
}

const personProxy = new Proxy(person, {
  get(target,property) {
    console.log('target:',target, 'property:',property)
    return 100;
  },
  set(target,property,value) {
    if(property === 'age') {
      if(!Number.isInteger(value)) {
        throw new TypeError(`${value} is not an int`)
      }
    }
    target[property] = value;
  }
})

console.log(personProxy.name) // 100
personProxy.age = 50;
// personProxy.age = '123'

console.log(person,personProxy);


// ------------------------------------ meta programming
const obj = new Proxy({},{
  get:function(target,propKey,receiver) {
    console.log(`getting ${propKey}`)
    return Reflect.get(target,propKey, receiver)
  },
  set:function(target,propKey,value,receiver) {
    console.log(`setting ${propKey}`);
    return Reflect.set(target,propKey, value, receiver)
  }
})
obj.count = 1;
obj.count += 1;

// -------------- proxy作为其他对象的原型对象。
const proxy = new Proxy({}, {
  get:function(target,propKey) {
    console.log(target,propKey)
    return 35
  }
})
const m1 = Object.create(proxy)

console.log('m1-time:', m1.time)  // 35
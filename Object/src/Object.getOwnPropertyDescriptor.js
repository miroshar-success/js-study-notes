// -------------- 返回指定对象上一个自由属性的属性描述符 -------------
const object1 = {
  property:42
}
const descriptor = Object.getOwnPropertyDescriptor(object1, 'property')
console.log(descriptor)

/*
configurable: true
enumerable: true
value: 42
writable: true
*/


const object2 = Object.defineProperty({},'property', {
  value:40
})

const descriptor_2 = Object.getOwnPropertyDescriptor(object2, 'property')
console.log(descriptor_2)
/*
configurable: false
enumerable: false
value: 40
writable: false
*/


// -------------- 如果属性不存在, 则返回undefined --------------
const player = {
  name:'kyrie'
}
const descriptor_3 = Object.getOwnPropertyDescriptor(player, 'age') // undefined
console.log(descriptor_3)


// ------------ 有getter / setter 和 没有getter/setter -------------
const object3 = Object.defineProperty({}, 'name', {
  get() {
    return 'hello'
  },
  set(newValue) {
    this.name = newValue
  },
})
console.log(object3)
console.log(object3.name)
// object3.name = 123
const descriptor_4 = Object.getOwnPropertyDescriptor(object3, 'name')
/*
configurable: false
enumerable: false
get: ƒ get()
set: ƒ set(newValue)
*/
console.log(descriptor_4)


// value writable 和 get/ set 不能同时存在

// ------------ 深拷贝 ---------------
const deep_clone = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj
  const temp = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    const val = obj[key]
    if (typeof val !== 'object') {
      temp[key] = val
    } else {
      temp[key] = deep_clone(val)
    }
  }
  return temp
}
// ------------- 测试 --------------
const player = {
  age: 30,
  firstName: 'kyrie',
  lastName: 'irving'
}
const clone_player = deep_clone(player)
player.firstName = 'lebron'
player.lastName = 'james'

console.log(clone_player, player)
/**
 * { age: 30, firstName: 'kyrie', lastName: 'irving' }
 * { age: 30, firstName: 'lebron', lastName: 'james' }
*/
const person = {
  fullName: { firstName: 'jack', lastName: 'green' }
}
const clone_person = deep_clone(person)
clone_person.fullName.firstName = 'joe'

console.log(clone_person, person)
/**
 * { fullName: { firstName: 'joe', lastName: 'green' } } 
 * { fullName: { firstName: 'jack', lastName: 'green' } }
*/

// --------- 测试map和set结构 ----------
const obj = {
  map: new Map([['message', 'hello']]),
  set: new Set([1,2,3])
}
const clone_obj = deep_clone(obj)
console.log(clone_obj, obj)
/**
 * { map: {}, set: {} }
 * { map: Map(1) { 'message' => 'hello' }, set: Set(3) { 1, 2, 3 } }
*/

// -------- 测试循环引用 --------
const obj_a = {
  a: 3,
  b: 4
}
obj_a.self = obj_a
// const clone_circle_obj = deep_clone(obj_a) // 报错

// 缺点: 不支持map/set等结构的拷贝, 而且遇到循环引用时会报错
const deep_clone_next_version = function(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj
  const from_obj = map.get(obj)
  if (from_obj) return from_obj // 避免循环引用
  const type = Object.prototype.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase()
  let target = {}
  map.set(obj, target)
  switch (type) {
    case 'map':
      target = new Map()
      obj.forEach((value, key) => {
        const k = deep_clone_next_version(key, map)
        const v = deep_clone_next_version(value, map)
        target.set(k, v)
      })
      break
    case 'set':
      target = new Set()
      for (const item of obj) {
        target.add(deep_clone_next_version(item, map))
      }
      break
    case 'array':
      target = []
      for (const item of obj) {
        target.push(deep_clone_next_version(item, map))
      }
      break
    case 'object':
      for (const key in obj) {
        const val = obj[key]
        target[key] = deep_clone_next_version(val, map)
      }
      break
  }
  return target
}

const person_next_version = deep_clone_next_version(person)
console.log('--------------- 下一个版本 ----------------')
person_next_version.fullName.firstName = 'kyrie'
person_next_version.fullName.lastName = 'irving'
console.log(person_next_version, person)

/**
{ fullName: { firstName: 'kyrie', lastName: 'irving' } } 
{ fullName: { firstName: 'jack', lastName: 'green' } }
*/

// set和map
const obj_next_person = deep_clone_next_version(obj)
console.log(obj, obj_next_person)
/**
 * { map: Map(1) { 'message' => 'hello' }, set: Set(3) { 1, 2, 3 } } 
 * { map: Map(1) { 'message' => 'hello' }, set: Set(3) { 1, 2, 3 } }
*/

// map
const map = new Map([[{message: 'hello'}, {message: 'world'}]])
const clone_map = deep_clone_next_version(map)
console.log(map, clone_map)

// set
const set = new Set([{message: 'hello'}, { message: 'world'}])
const clone_set = deep_clone_next_version(set)
console.log(set, clone_set)

const circle_obj = deep_clone_next_version(obj_a)
console.log(circle_obj)
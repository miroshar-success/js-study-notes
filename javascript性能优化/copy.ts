function clone(data: any) {
  if(typeof data !== 'object') return data
  if(data === null) return null
  let result: any
  if(Array.isArray(data)) {
    result = []
  }else{
    result = {}
  }
  for(const key in data) {
    result[key] = clone(data[key])
  }
  return result
}

const object1 = {
  name: 'kyrie',
  age:30
}
const object2 = clone(object1)

object1.age = 31
console.log(object2)  // { name: 'kyrie', age: 30 }

// ----- map 结构 -------
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
])

const clone_map = clone(map)
console.log(clone_map)  // {}


const players = [
  {
    firstName: 'kyrie',
    lastName: 'irving'
  },
  {
    firstName: 'lebron',
    lastName: 'james'
  }
]
const clone_players = clone(players)
players[0]['age'] = 100
console.log(clone_players)
/*
{
  '0': { firstName: 'kyrie', lastName: 'irving' },
  '1': { firstName: 'lebron', lastName: 'james' }
}
*/
console.log(players)
/*
[
  { firstName: 'kyrie', lastName: 'irving', age: 100 },
  { firstName: 'lebron', lastName: 'james' }
]
*/


// ----- 包含set -----
const setArray = [new Set().add(1), new Set().add(2)]
console.log(setArray) // [ Set(1) { 1 }, Set(1) { 2 } ]

console.log(typeof new Set(), typeof new Map()) // object object

const clone_set_array = clone(setArray)
console.log(clone_set_array, Array.isArray(clone_set_array))  // ['0': {}, '1': {} ]


const s1 = new Set()
const s2 = new Set()
s1.add('hello')
s2.add('world')
console.log([s1, s2])
console.log(clone([s1, s2]))  // [ {}, {} ]

/*
{
  1: Set(),
  2: Map,
  3: {
    1: Map
  }
}
*/


/*
const o = {
  a: null
}
o.a = o
*/

// ------------ 支持array/object/map/set -------------
function deep_clone(object: any, map = new WeakMap()) :any {
  if(typeof object !== 'object' || object == null) return object
  const fromMap = map.get(object) // 判断是否循环引用了
  if(fromMap) return fromMap
  let target: any = {};
  map.set(object, target)
  const type = Object.prototype.toString.call(object).slice(8,-1)
  switch(type) {
    case 'Map': {
      target = new Map()
      object.forEach((value, key) => {
        target.set(deep_clone(value, map), deep_clone(key, map))
      })
    }
    break;
    case 'Set': {
      target = new Set()
      object.forEach(v => {
        target.add(deep_clone(v), map)
      })
    }
    break;
    case 'Array': {
      target = object.map(item => deep_clone(item), map)
    }
    break;
    case 'Object': {
      target = {}
      for(const key in object) {
        const v = deep_clone(object[key], map)
        target[key] = v
      }
    }
    break;
  }
  return target
}

// ----- 测试 1 set ------
const k1 = [new Set().add('hello'), new Set().add('world')]
console.log('k1:', deep_clone(k1))  // [ Set(1) { 'hello' }, Set(1) { 'world' } ]

const k2 = [new Map([['hello', 'world'], ['你好', '生活']])]
console.log('k2', deep_clone(k2)) // [ Map(2) { 'world' => 'hello', '生活' => '你好' } ]

const k3 = {
  name: 'hello',
}
const deep_k3 = deep_clone(k3)
k3.name = '你好'
console.log(deep_k3)  // { name: 'hello' }


const o = {
  a: null
}
o.a = o

const deep_o = deep_clone(o)
console.log(deep_o) // { a: {} }



// ----------------- demo -----------------
const singer = {}
const p = {}
const m1 = new Map()
m1.set('a', singer)
m1.set('b', p)
// @ts-ignore
singer.age = 30
// @ts-ignore
p.a = new Set().add('hello')
console.log(m1)



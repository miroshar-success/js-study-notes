// ---------- 浅克隆 -----------
function shadow_clone(obj) {
  if(typeof obj !== 'object' || obj === null) return obj
  if(typeof obj === 'object') {
    const s = Object.prototype.toString.call(obj).slice(8,-1).toLowerCase() === 'object' ? {} : [];
    for(const key in obj) {
      const v = obj[key]
      const type = Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
      switch(type) {
        case 'object':
          s[key] = shadow_clone(v)
          break;
        case 'array':
          s[key] = shadow_clone(v)
          break;
        default:
          s[key] = v
      }
    }
    return s
  }
  return obj
}

const player_1 = {
  firstName: 'kyrie',
  lastName: 'irving',
  team: [
    {
      firstName: 'kevin',
      lastName: 'durant'
    }
  ]
}
const player_2 = shadow_clone(player_1)

player_2.team[0]['firstName'] = 'james'
player_2.team[0]['lastName'] = 'harden';

console.log(player_1, player_2)


// -------- 包含map,set---------
const map = new Map([
  ['hello', 'world'],
  ['你好', '生活']
])
const o = {name: 'hello'}
const set = new Set().add('hello').add('world').add(o)

const copy_array = shadow_clone([map, set, 'hello', 'world'])
console.log(copy_array)

o.name = '你好'
console.log(copy_array)

function deep_clone(obj, map = new WeakMap()) {
  if(typeof obj === 'object' && obj !== null) {
    const f = map.get(obj)
    if(f) return obj
    let target = {}
    map.set(obj, target)
    const type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
    switch(type) {
      case 'map': {
        target = new Map()
        obj.forEach((value, key) => {
          target.set(deep_clone(value, map), deep_clone(key, map))
        })
      }
      break;
      case 'set': {
        target = new Set()
        obj.forEach(v => {
          target.add(deep_clone(v, map))
        })
      }
      break;
      case 'array': {
        target = obj.map(item => deep_clone(item, map))
      }
      break;
      case 'object': {
        target = {}
        for(const key in obj) {
          const v = deep_clone(obj[key], map)
          target[key] = v
        }
      }
    }
    return target
  } else {
    return obj
  }
}

const obj2 = {
  name: 'hello',
}
obj2['obj2'] = obj2
console.log(obj2)

// const copy_obj2 = shadow_clone(obj2)
const copy_obj2 = deep_clone(obj2)
console.log(copy_obj2)


const a = 123, b = 234;
console.log(!!(a & 1))  // true
console.log(!!(b & 1))  // false
console.log(!!(12 & 1)) // false
console.log(!!(13 & 1)) // true

console.log(1.23 | 0) // 1
console.log(456 | 0)  // 456

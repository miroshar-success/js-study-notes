console.log('------------------ array - like -------------------')

function isArrayLikeObject(arr) {
  if(typeof arr !== 'object') return false
  if(arr === null) return false
  const max_length = Math.pow(2,53) - 1;
  // 判断是否有length属性
  if(!Object.prototype.hasOwnProperty.call(arr, 'length')) return false
  // 判断length 是否为 number
  if(typeof arr.length !== 'number') return false
  // 判断是否是 有限的
  if(!Number.isFinite(arr.length)) return false
  if(Array.isArray(arr)) return false
  if(arr.length >= 0 && arr.length < max_length) return true
  return false
}

const a = {
  0: 'hello',
  1: 'world',
  length: 'hello'
}
const b = [1, 2, 3]

const player = {
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30
}
const c = {
  0: 'hello',
  1: 'world',
  length: Infinity
}
const d = {
  0: 'hello',
  1: 'world',
  length: 2
}
console.log(isArrayLikeObject(a), isArrayLikeObject(b), isArrayLikeObject(c), isArrayLikeObject(d), isArrayLikeObject(player))
// false false false true false

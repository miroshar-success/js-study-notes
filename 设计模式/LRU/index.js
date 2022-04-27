// LRU (least recently used)
class LruMap {
  constructor(length) {
    this.length = length
    this.map = new Map()
  }
  get(key) {
    const data = this.map;
    if(!data.has(key)){
      return null
    }
    const value = data.get(key)
    data.delete(key)
    data.set(key, value)
  }
  set(key, value) {
    const data = this.map
    if(data.has(key)) {
      data.delete(key)
    }
    data.set(key, value)
    if(this.map.size > this.length) {
      const temp = []
      for(const key of this.map.keys()){ // this.map.keys() 是一个Iterator
        temp.push(key)
      }
      this.map.delete(temp[0])
    }
  }
}

const lru = new LruMap(2)
lru.set('a', {firstName: 'kyrie'})
lru.set('b', {firstName: 'lebron'})

console.log(lru)
/*
  map: Map(2) {
    'a' => { firstName: 'kyrie' },
    'b' => { firstName: 'lebron' }
  }
*/

lru.get('a')
/*
  map: Map(2) {
    'b' => { firstName: 'lebron' },
    'a' => { firstName: 'kyrie' }
  }
*/
console.log(lru)

console.log(lru.get('c')) // null

lru.set('d', {firstName: 'durant'})

console.log(lru)
/*
map: Map(2) {
  'a' => { firstName: 'kyrie' },
  'd' => { firstName: 'durant' }
}
*/

lru.get('a')
console.log(lru)
/*
  map: Map(2) {
    'd' => { firstName: 'durant' },
    'a' => { firstName: 'kyrie' }
  }
*/



// ----------- 利用object/array ----------
class ArrayLru { // 最先访问的数据在前面
  constructor(length) {
    this.length = length
    this.keys = []  // 数组存储key
    this.map = {}   // 对象存储值
  }
  get(key) {
    // 判断是否存在key!
    if(!this.keys.includes(key)) return null
    const keyIndex = this.keys.findIndex(k === key)
    this.keys.splice(keyIndex, 1)
    this.keys.unshift(key)
  }
  set(key, value) { // 设置: key/value
    if(!this.keys.includes(key)) {
      this.keys.unshift(key)
    }else{
      const keyIndex = this.keys.findIndex(k => k === key)
      this.keys.splice(keyIndex, 1)
      this.keys.unshift(key)
    }
    this.map[key] = value
    if(this.keys.length > this.length) {
      const lastKey = this.keys.pop()
      Reflect.deleteProperty(this.map, lastKey)
    }
  }
}

const map = new ArrayLru(2)
map.set('a', {player: 'lebron'})
map.set('b', {player: 'kyrie'})

console.log(map)
/*
keys: [ 'b', 'a' ],
map: { a: { player: 'lebron' }, b: { player: 'kyrie' } }
*/

console.log(map.get('c')) // null

map.set('c', {player:'wade'})
console.log(map)
/*
keys: [ 'c', 'b' ],
map: { b: { player: 'kyrie' }, c: { player: 'wade' } }
*/


// --------- 双向链表 -----------

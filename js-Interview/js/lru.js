// --------- LRU (Least Recently Used) -----------------
class Cache {
  constructor(length) {
    const type = typeof length;
    if (type !== 'number') {
      throw new Error(`Expect number, but got ${type}`)
    }
    if (length <= 0) {
      throw new Error('length must be bigger than 0')
    }
    this.length = length
    this.map = new Map()
  }
  set(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key)
    }
    this.map.set(key, value)
    const keys = [...this.map.keys()] // map.keys() 是一个遍历器对象,不是数组
    if (this.map.size > this.length) {
      this.map.delete(keys[0])
    }
  }
  get (key) {
    // 最近使用的放在前面
    if (!this.map.has(key)) return null
    const value = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, value)
    return value
  }
}
const cache = new Cache(2)
cache.set(1, 1)
cache.set(2, 2)
console.log(cache)  // { 1 => 1, 2 => 2 } }
cache.set(3, 3)
console.log(cache)  // { 2 => 2, 3 => 3 } }
cache.set(1, 1)
console.log(cache)  // { 3 => 3, 1 => 1 } }
cache.get(3)
console.log(cache)  // { 1 => 1, 3 => 3 } }
console.log(cache.get(20), cache) // null  1 => 1, 3 => 3 } }

// const c_1 = new Cache(0)  // Error: length must be bigger than 0
// const c_2 = new Cache('123') // Error: Expect number, but got string


// ------------- 使用数组和对象实现 ------------------
class CacheByArray {
  constructor(length) {
    this.map = {}
    this.array = []
    this.length = length
  }
  set(key, value) {
    this.map[key] = value
    // 判断之前是否存在, 如果存在 则先删除数组中的元素。(对象属性值会被覆盖)
    const idx = this.array.findIndex(item => item === value)
    if (idx !== -1) {
      this.array.splice(idx, 1)
    }
    this.array.push(value)
    // 判断是否超过限制, 超过限制删除头部数据
    if (this.array.length > this.length) {
      const del_key = this.array.shift()
      Reflect.deleteProperty(this.map, del_key)
    }
  }
  get(key) {
    const val = this.map[key]
    if (val === undefined || val === null) return null
    const idx = this.array.findIndex(item => item === val)
    if (idx !== -1) {
      this.array.splice(idx, 1)
    }
    this.array.push(val)
    return val
  }
}
const cache_1 = new CacheByArray(2)
cache_1.set(1, 1)
cache_1.set(2, 2)
console.log(cache_1)  // { map: { '1': 1, '2': 2 }, array: [ 1, 2 ], length: 2 }
cache_1.set(3, 3)
console.log(cache_1)  // { map: { '2': 2, '3': 3 }, array: [ 2, 3 ], length: 2 }
cache_1.set(4, 4)
console.log(cache_1)  // { map: { '3': 3, '4': 4 }, array: [ 3, 4 ], length: 2 }
cache_1.get(3)
console.log(cache_1)  // { map: { '3': 3, '4': 4 }, array: [ 4, 3 ], length: 2 }
console.log(cache_1.get(10))  // null
console.log(cache_1)  // { map: { '3': 3, '4': 4 }, array: [ 4, 3 ], length: 2 }


// -------------- 双向链表 -------------
class CacheByListNode {
  constructor(length) {
    this.length = length
    this.dataLength = 0
    this.data = {}
    this.tail = null  // 头
    this.head = null  // 尾
  }
  get (key) {
    const node = this.data[key]
    if (!node) return null
    // 如果是最后一个, 直接返回
    if (node === this.tail) return node
    // 如果是中间的话, 移动到最后一个位置
    this.moveToTail(node)
    return node.value
  }
  set (key, value) {
    const node = this.data[key]
    if (!node) {
      // 新增
      const newNode = { key, value }
      this.moveToTail(newNode)
      this.data[key] = newNode
      this.dataLength += 1
      if (this.dataLength === 1) {
        this.head = newNode
      }
    } else {
      node.value = value
      this.moveToTail(node)
    }
  }
  moveToTail(node) {
    if (this.node === this.tail) return
    // 让prev next 断绝与 curNode的关系
    const prevNode = node.prev
    const nextNode = node.next
    if (prevNode) {
      if (nextNode) {
        // 上下节点都有
        prevNode.next = nextNode
      } else {
        Reflect.deleteProperty(prevNode, 'next')
      }
    }
    if (nextNode) {
      if (prevNode) {
        nextNode.prev = prevNode
      } else {
        Reflect.defineProperty(nextNode, 'prev')
      }
      //  如果头部节点正好是当前节点
      if (this.head === node) {
        this.head = nextNode
      }
    }
    // 删除当前节点前后节点只想
    Reflect.deleteProperty(node, 'prev')
    Reflect.deleteProperty(node, 'next')
    // 将当前节点移动到末尾
    const tail = this.tail
    if (tail) {
      tail.next = node
      node.prev = tail
    }
    this.tail = node
  }
  clean() {
    while (this.dataLength > this.length) {
      if (!this.head) return
      const headNode = this.head
      if (!headNode.next) return
      Reflect.deleteProperty(headNode, 'next')
      const headNextNode = headNode.next
      Reflect.deleteProperty(headNextNode, 'prev')
      this.head = headNextNode
      // 重新计数
      this.dataLength -= 1
      // 清空data
      Reflect.deleteProperty(this.data, this.head.key)
    }
  }
}
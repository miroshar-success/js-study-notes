// 程序执行需要的计算量和内存空间
// 复杂度是数量级, 不是具体的数字

// 时间复杂度: 程序执行时需要的计算量(CPU)
// O(1)
interface obj {
  a?: string
}
function m3(obj: obj = {}) {
  return obj.a // 计算量是一定的
}


// O(n) 和传输的数据量一致
function m4(array = []) {
  for(let i = 0; i < array.length; i++) {
    console.log(array[i]) // 计算量和数组长度一致
  }
}

// O(n^2)  数据量的平方
function m5(array = []) {
  for(let i = 0; i < array.length; i++) {
    for(let j = 0; j < array.length; j++) {
      console.log(array[j])
    }
  }
}

// O(n*logn)
function fn(array = []) {
  for(let i = 0; i < array.length; i++) {
    // 二分
  }
}



// 空间复杂度: 执行代码所需要的空间
// O(1)
function m1(array = []): void {
  const a = array[0]
  const b = array[1]
}


// O(n)
function m2<T>(array: T [] = []): T[] {
  const temp = []
  for(let i = 0; i < array.length; i++) {
    temp[i] = array[i]
  }
  return temp
}


// ---------------- 将一个数组旋转k步 -------------
function rotate_1(array:number[] = [], k = 1): number[] {
  if(!array.length) return []
  if(k < 0) {
    k = Math.abs(k)
  }
  if(k > array.length) {
    k = k % array.length
  }
  const arr1: number [] = array.slice(array.length - k)
  const arr2: number [] = array.slice(0, array.length - k)
  return [...arr1, ...arr2]
}

const array = [1,2,3,4,5,6,7]
console.log(rotate_1(array, 3)) // 5,6,7,1,2,3,4
console.log(rotate_1(array, 8)) // 7 1 2 3 4 5 6

// pop()
function rotate_2(array:number[] = [], k = 1): number[] {
  if(!array.length) return []
  if(k < 0) {
    k = Math.abs(k)
  }
  if(k > array.length) {
    k = k % array.length
  }
  for(let i = 0; i < k; i++) {
    array.unshift(array.pop())
  }
  return array
}
// console.log(rotate_2([1,2,3,4,5,6,7], 3))  // 5,6,7,1,2,3,4
// console.log(rotate_2([1,2,3,4,5,6,7], 8))  // 7,1,2,3,4,5,6

// ---- 测试 -----
const big_array: number [] = []
for(let i = 0; i < 10 * 10000; i++){
  big_array.push(i)
}
console.time('rotate1')
// console.log(rotate_1(big_array, 5* 10000))
console.log(rotate_2(big_array, 5*10000))
console.timeEnd('rotate1')  // 7 - 10 ms 之间


// ------------------- 字符串括号匹配 -----------------
// [a{b(c)}] 利用 进栈和出栈 判断
const string1 = '(a{b[c]})',
      string2 = '{a[b(c])}',
      string3 = '[a{b(]c)}]';

function is_equal(s1: string, s2: string):boolean {
  return (s1 === '{' && s2 === '}') || (s1 === '(' && s2 === ')') || (s1 === '[' && s2 === ']')
}
const leftSymbols = ['[', '{', '(']
const rightSymbols = [']', '}', ')']

function foo( str: string) {
  const array: string [] = []
  for(const item of str) {
    if(!rightSymbols.includes(item) && !leftSymbols.includes(item)) continue
    if(leftSymbols.includes(item)) {
      array.push(item)
    } else {
      const lastStr = array[array.length - 1]
      if(is_equal(lastStr, item)) {
        array.pop()
      } else {
        return false
      }
    }
  }
  return array.length === 0
}

console.log('f1', foo(string1)) // true
console.log('f2', foo(string2)) // false
console.log('f3', foo(string3)) // false


// ------- 两个栈实现一个队列 -------
class Queue {
  private stack1: number [] = []
  private stack2: number [] = []
  add(n: number) {
    this.stack1.push(n)
  }
  delete():number | null {
    let res: number | null
    while(this.stack1.length) {
      this.stack2.push(this.stack1.pop())
    }
    res = this.stack2.pop()
    while(this.stack2.length) {
      this.stack1.push(this.stack2.pop())
    }
    return res
  }
  get length():number {
    return this.stack1.length
  }
}
const q = new Queue()
q.add(10)
q.add(20)
q.add(30)
q.add(40)
console.log(q.length) // 4
console.log(q.delete()) // 10
console.log(q.delete()) // 20
console.log(q.delete()) // 30
console.log(q.delete()) // 40
console.log(q.delete()) // undefined

function createArrayUsePush(length: number):number [] {
  const array = []
  for(let i = 0; i < length; i++) {
    array.push(i)
  }
  return array
}

function createArrayUseUnshift(length: number): number [] {
  const array = []
  for(let i = 0; i < length; i++) {
    array.unshift(i)
  }
  return array
}

console.time('unshift')
createArrayUseUnshift(1000)
console.timeEnd('unshift')

console.time('push')
createArrayUsePush(1000)
console.timeEnd('push')


const array1 = createArrayUseUnshift(1000)
console.time('shift')
array1.shift()
console.timeEnd('shift')

console.time('pop')
array1.pop()
console.timeEnd('pop')


// ---- 单向链表 -----
interface ListProps {
  value: number
  next?: ListProps
}
function createList(array: number []): ListProps {
  if( array.length === 0 ) throw Error('something went wrong')
  let curObj: ListProps = {
    value: array[array.length - 1]
  }
  if(array.length === 1) return curObj
  for(let i = array.length - 2; i >= 0 ;i--) {
    // curObj.next = curObj
    // curObj.value = array[i]
    curObj = {
      value: array[i],
      next: curObj
    }
  }
  return curObj
}

console.log('单向链表:', createList([10,20,30,40,50]))


function reverseList(object: ListProps): ListProps {
  let prev: undefined | ListProps = undefined
  let cur: undefined | ListProps = undefined
  let next: undefined | ListProps = object
  while (next) { // 当有next的时候 遍历
    if (cur && !prev) {
      delete cur.next
    }
    // 整体移动指针
    if(cur && prev) {
      cur.next = prev
    }
    prev = cur
    cur = next
    next = next?.next
  }
  return next
}

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
// console.log(rotate_1(array, 3)) // 5,6,7,1,2,3,4
// console.log(rotate_1(array, 8)) // 7 1 2 3 4 5 6

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
// console.time('rotate1')
// console.log(rotate_1(big_array, 5* 10000))
// console.log(rotate_2(big_array, 5*10000))
// console.timeEnd('rotate1')  // 7 - 10 ms 之间


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
/* const q = new Queue()
console.time('queue')
for(let i = 0; i < 10 * 10000; i++) {
  q.add(i)
}
for(let i = 0; i < 10 * 10000; i++) {
  q.delete()
}
console.timeEnd('queue')

console.time('array')
const temp:number [] = []
for(let i = 0; i < 10 * 10000; i++) {
  temp.push(i)
}
for(let i = 0; i < 10 * 10000; i++) {
  temp.shift()
}
console.timeEnd('array') */

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

// console.time('unshift')
// createArrayUseUnshift(1000)
// console.timeEnd('unshift')

// console.time('push')
// createArrayUsePush(1000)
// console.timeEnd('push')


// const array1 = createArrayUseUnshift(1000)
// console.time('shift')
// array1.shift()
// console.timeEnd('shift')

// console.time('pop')
// array1.pop()
// console.timeEnd('pop')


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
const list1 = createList([10,20,30,40])
console.log('单向链表:', list1, JSON.stringify(list1))

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
  cur.next = prev
  return cur
}
const list2 = reverseList(list1)
console.log(JSON.stringify(list2))
/*
{
  value: 10,
  next: {
    value: 20,
    next: {
      value: 30,
      next: {
        value: 40
      }
    }
  }
}

// 1.
prev = null
cur = {
  value: 10,
  next: {
    value: 20,
    next: {
      value: 30,
      next: {
        value: 40
      }
    }
  }
}
next = {
  value: 20,
  next: {
    value: 30,
    next: {
      value: 40
    }
  }
}

2
prev = {
  value: 10
  next: null
}
cur = {
  value: 20,
  next: {
    value: 30,
    next: {
      value: 40
    }
  }
}
next = {
  value: 30,
  next: {
    value: 40
  }
}

3 prev = {
  value: 20,
  next: {
    value: 10,
    next: null
  }
}
cur = {
  value: 30,
  next: {
    value: 40
  }
}
next = {
  value: 40
}

4
prev = {
  value: 30,
  next: {
    value: 20,
    next: {
      value: 10,
      next: null
    }
  }
}
cur = {
  value: 40
}
next : undefined

4. cur {
  value: 40,
    next: {
      value: 30,
        next: {
          value: 20,
          next: {
            value: 10,
            next: null
          }
        }
      }
    }
*/

// -------- 链表实现队列 ----------
class Queue1 {
  private headNode = null
  private tailNode = null
  private len: number = 0
  add (value) {
    const node = {
      value,
      next: null
    }
    // 如果没有头部节点
    if (this.headNode === null) {
      this.headNode = node
    }
    const tail = this.tailNode
    if(tail) {
      tail.next = node
    }
    this.tailNode = node
    this.len += 1
  }
  delete () {
    if(!this.headNode) return null
    if(this.len <= 0) return null
    const head = this.headNode
    this.headNode = head.next
    this.len -= 1
    return head.value
  }
  get length():number {
    return this.len
  }
}

const queue_1 = new Queue1()
queue_1.add(10)
queue_1.add(20)
queue_1.add(30)
queue_1.add(40)
console.log(queue_1.length)   // 4
console.log(queue_1.delete()) // 10
console.log(queue_1.length)   // 3


// ----------- 链表实现队列 和 原生数组 速度 -------------
console.time('queue')
for(let i = 0; i < 10 * 10000; i++) {
  queue_1.add(10)
}
for(let i = 0; i < 10 * 10000; i++) {
  queue_1.delete()
}
console.timeEnd('queue')  // 29.014ms

/* console.time('array')
const temp = []
for(let i = 0; i < 10 * 10000; i++) {
  temp.push(10)
}
for(let i = 0; i < 10 * 10000; i++) {
  temp.shift()
}
console.timeEnd('array') */


// -------------- 二分查找 -----------
function binary_search(array: number[], target: number): number {
  const length = array.length
  if(length === 0) return -1
  let startIndex = 0, endIndex = length - 1
  while(startIndex <= endIndex) {
    const middleIndex = Math.floor( (startIndex + endIndex) / 2 )
    const middleValue = array[middleIndex]
    if (middleValue > target) {
      endIndex = middleIndex - 1
    }else if (middleValue < target) {
      startIndex = middleIndex + 1
    } else {
      return middleIndex
    }
  }
  return -1
}


// ------ 递归方法二分查找 -------
function recursive_search(array: number [], target: number, startIndex?: number, endIndex?: number): number {
  const length = array.length
  if(length === 0) return -1
  if(startIndex === undefined) startIndex = 0
  if(endIndex === undefined) endIndex = length - 1
  if(startIndex > endIndex) return -1
  const middleIndex = Math.floor((startIndex + endIndex) / 2)
  const middleValue = array[middleIndex]
  if(middleValue > target) {
    return recursive_search(array, target, startIndex, middleIndex - 1)
  }else if (middleValue < target) {
    return recursive_search(array, target, middleIndex + 1, endIndex)
  }else{
    return middleIndex
  }
}



const binary_array = [10,20,30,40,50]
const big_binary_array = []
for(let i = 0; i < 10 * 1000000; i ++) {
  big_binary_array.push(i)
}
console.time('binary')
// console.log(binary_search(big_binary_array, 9999999))  // 2  0.893ms
// console.log(recursive_search(big_binary_array, 9999999))  //    0.323
const result = big_binary_array.find(item => item === 9999999)  // 126.366ms
console.timeEnd('binary')



// --------- 数组中和为 n的 两个数 --------
function sum(array:number [], target: number): number [] {
  const length = array.length, result = []
  if(length === 0) return []
  for(let i = 0; i < length - 1; i++) {
    const m1 = array[i]
    let flag = false
    for(let j = i + 1; j < length; j++) {
      const m2 = array[j]
      if(m1 + m2 === target) {
        result.push(m1)
        result.push(m2)
        flag = true
        break
      }
    }
    if(flag) break
  }
  return result
}

const e = [1,2,3,4,5,6,7,8,9,10]
console.log(sum(e, 19)) // [9, 10]


function get_sum(array: number [], target: number): number [] {
  const length = array.length;
  if(length === 0) return []
  let startIndex = 0, endIndex = length - 1
  const result: number [] = []
  while(startIndex < endIndex) {
    const n1 = array[startIndex], n2 = array[endIndex];
    const sum = n1 + n2
    if(sum < target) {
      startIndex++
    }else if(sum > target) {
      endIndex--
    }else{
      result.push(n1)
      result.push(n2)
      break
    }
  }
  return result
}

console.log(get_sum(e, 19))


// ---------- binary tree -----------
interface TreeNodeProps {
  value: number
  left?: TreeNodeProps
  right?: TreeNodeProps
}
const binary_tree: TreeNodeProps = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 3,
    },
    right: {
      value: 4,
    }
  },
  right: {
    value: 5,
    left: {
      value: 6
    },
    right: {
      value: 7
    }
  }
}
// 前序遍历
function front_tree_map(node: TreeNodeProps) {
  if(!node) return
  console.log(node.value)
  front_tree_map(node.left)
  front_tree_map(node.right)
}
front_tree_map(binary_tree) // 1 2 3 4 5 6 7

// 中序遍历
function middle_tree_map(node: TreeNodeProps) {
  if(!node) return
  middle_tree_map(node.left)
  console.log(node.value)
  middle_tree_map(node.right)
}
middle_tree_map(binary_tree)  // 3 2 4 1 6 5 7

// 后序遍历
function back_tree_map(node: TreeNodeProps) {
  if(!node) return
  back_tree_map(node.left)
  back_tree_map(node.right)
  console.log(node.value)
}
back_tree_map(binary_tree)  // 3 4 2 6 7 5 1


const heap = [-1, 10, 14, 25, 33, 81, 82, 99]
// 节点关系
/* const parentIndex = Math.floor(i / 2)
const leftIndex = 2 * i
const rightIndex = 2 * i + 1 */



// ------------- 斐波那契数列 -------------
/* function fibonacci(n: number): number {
  if(n <= 0) return 0
  if(n === 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(5)) // 5
console.log(fibonacci(8)) // 21
console.log(fibonacci(10))  // 55
console.log(fibonacci(100)) // 程序崩溃 */


/* function fibonacci(n: number) : number {
  if(n <= 0) return 0
  if(n === 1) return 1
  let prev = 0, cur = 1, result = 0
  for(let i = 2; i <= n; i++) {
    result = prev + cur
    prev = cur
    cur = result
  }
  return result
}
console.log(fibonacci(5)) // 5
console.log(fibonacci(8)) // 21
console.log(fibonacci(10))  // 55
console.log(fibonacci(100)) // 354224848179262000000
console.log(fibonacci(101)) // 573147844013817200000 */

function fibonacci(n, prev = 0, cur = 1) {
  if(n <= 1) return cur
  return fibonacci(n - 1, cur, cur + prev)
}
console.log(fibonacci(5)) // 5
console.log(fibonacci(8)) // 21
console.log(fibonacci(10))  // 55
console.log(fibonacci(100)) // 354224848179262000000


// --------- 移动0到数组末尾 ----------
/* function moveZero(array: number[]) {
  const length = array.length
  if(length === 0) return
  let pointerLength = 0
  // 数组末尾全是0, 此时不用 再去遍历末尾的数据
  for(let i = 0; i < length - pointerLength; i++) {
    const item = array[i]
    // [1,2,0,0,0,1,2,0,1,1,2,3,0,4]
    // [1,2,0,0,1,2,0,1,1,2,3,0,4,0]
    if(item === 0) {
      array.push(item)
      array.splice(i, 1)
      pointerLength += 1
      i-- // 防止重复的0漏掉
    }
  }
} */
// ------ 使用双指针的方法 ------
// [1,2,3,0,0,1,2,0,3,2,1,4]
// [1,2,3,1,0,0,2,0,3,2,1,4]
// [1,2,3,4,2,0,0,0,3,2,1,4]
function moveZero(array: number []) {
  let i,
    j = -1
  for(i = 0; i < array.length; i++) {
    // 指向第一个0
    if(array[i] === 0 && j < 0) {
      j = i
    }
    if(array[i] !== 0 && j >= 0) {
      if(array[j] === 0) {
        const n = array[i]
        array[i] = array[j]
        array[j] = n
      }
      j++
    }
  }
}

/*
[
  1, 2, 1, 2, 1, 1,
  2, 3, 4, 0, 0, 0,
  0, 0
]
*/


/* const big_zero_array = []
for(let i = 0; i < 10 * 10000; i++) {
  if(i % 10 === 0) {
    big_zero_array.push(0)
  }else{
    big_zero_array.push(i)
  }
}
console.time('zero')
moveZero(big_zero_array)  // 229.207ms
console.timeEnd('zero') */


// ----------- 出现连续字符最长的 -----------
interface CharProps {
  char: string
  length: number
}

const string = 'aaabcbddeedssssdddddddddd';

/* function getMaxCharLength(str: string): CharProps {
  const length = str.length;
  if(length === 0) {
    return {
      char:'',
      length: 0
    }
  }
  const res: CharProps = {
    char: '',
    length: 0
  }
  for(let i = 0; i < length; i++) {
    let pointerLength = 0
    for(let j = i; j < length; j++) {
      if(str[i] === str[j]) {
        pointerLength += 1
      }
      // 记录当后一个字母与前一个字母不想等, 或者 已经遍历结束了
      if(str[i] !== str[j] || j === length - 1) {
        if(pointerLength > res.length) {
          res.length = pointerLength
          res.char = str[i]
        }
        if(i < length - 1) {
          i = j - 1;
        }
        break;
      }
    }
  }
  return res
} */
// 利用双指针
function getMaxCharLength( str: string): CharProps {
  const length = str.length;
  const res: CharProps = {
    char: '',
    length: 0
  }
  if(length === 0) return res
  let j = 0
  let pointerLength = 0
  for(let i = 0; i < length; i++) {
    if(str[i] === str[j]) {
      pointerLength += 1
    }
    if(str[i] !== str[j] || i === length -1) {
      if(pointerLength > res.length) {
        res.length = pointerLength
        res.char = str[j]
      }
      pointerLength = 0
      if(i < length - 1) {
        j = i
        i--
      }
    }
  }
  return res
}

console.log(getMaxCharLength(string))
// { char: 'd', length: 10 }


// ---------- 回文数字 -------
// 利用字符串 反转后 和 当前字符相比
function reverseNumber(n: number) :number[] {
  if(n === 0) return []
  const result:number[] = []
  for(let i = 1; i <= n; i++) {
    if(i.toString() === i.toString().split('').reverse().join('')){
      result.push(i)
    }
  }
  return result
}

console.log(reverseNumber(100))


// ------ 比较字符 对应位置---------
function reverseNumber2(n: number): number [] {
  if(n === 0) return []
  const result: number[] = []
  for(let i = 1; i <= n; i++) {
    let start = 0, end = i.toString().length - 1;
    let flag = true
    while(start < end) {
      if(i.toString()[start] === i.toString()[end]) {
        start+=1;
        end -= 1
      }else{
        flag = false
        break;
      }
    }
    if(flag) {
      result.push(i)
    }
  }
  return result
}
console.log(reverseNumber2(100))

// ----- 通过求数的反转数字 --------
function reverseNumber3(n: number): number [] {
  if(n === 0) return []
  const result: number[] = []
  for(let i = 1; i <= n; i++) {
    // 直接求一个数的反转数
    let x = i // 当前数字
    let rev = 0 // 反转数字
    while(x > 0) {
      rev = rev * 10 + x % 10
      x = Math.floor(x / 10)
    }
    if(rev === i) {
      result.push(i)
    }
  }
  return result
}
console.log(reverseNumber3(100))


// -------------  sleepMan ---------------
class SleepMan {
  private name: string
  private tasks: Function []
  constructor(name: string) {
    this.name = name
    this.tasks = []
    setTimeout(() => {
      this.next()
    }, 0)
  }
  eat(food: string) {
    const task = () => {
      console.log(`${this.name} eat - ${food}`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }
  sleep(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`${this.name} sleep`)
        this.next()
      },time * 1000)
    }
    this.tasks.push(task)
    return this
  }
  next() {
    const task = this.tasks.shift()
    task && task()
  }
}
const kyrie = new SleepMan('kyrie')
kyrie.eat('apple').sleep(3).eat('banana').sleep(2).eat('orange')

// ------------- 将数组转化为树 --------------
interface ArrayNode {
  id: number
  name: string
  parentId: number
}

interface TreeNode {
  id: number
  name: string
  children?: Array<TreeNode>
}

const tree_array = [
  {id:1, name:'部门A', parentId: 0},
  {id:2, name:'部门B', parentId: 1},
  {id:3, name:'部门C', parentId: 1},
  {id:4, name:'部门D', parentId: 2},
  {id:5, name:'部门E', parentId: 2},
  {id:6, name:'部门F', parentId: 3}
]

function convert(array: ArrayNode []) {
  const map: Map<number, TreeNode> = new Map()
  let root = null
  array.forEach(item => {
    const { id, name, parentId } = item
    const treeNode: TreeNode = {id, name}
    map.set(id, treeNode)
    const parentNode = map.get(parentId)  // 判断是否在某个节点树上
    if(parentNode) {
      if(!parentNode.children) parentNode.children = []
      parentNode.children.push(treeNode)
    }
    if(parentId === 0) root = treeNode
  })
  return root;
}

const convert_tree = convert(tree_array)
console.log(convert_tree, JSON.stringify(convert_tree))

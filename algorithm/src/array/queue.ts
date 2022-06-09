// 设计一个循环队列
class Queue {
  public list: any[]
  private max: number
  private head: number
  private tail: number
  constructor(length: number) {
    this.list = new Array(length).fill('')
    this.max = length
    this.head = 0
    this.tail = 0
  }
  is_empty() { // 是否为空
    return this.head === this.tail && this.list[this.head] === ''
  }
  is_full() { // 是否已经存满了
    return this.head === this.tail && this.list[this.tail] !== ''
  }
  add(item: any) {
    // 添加一个元素, 如果满了, 则 this.tail = this.max - 1
    if(this.is_full()) return false
    this.list[this.tail] = item
    this.tail = (this.tail + 1) % this.max
    return true
  }
  delete() {
    const item = this.list[this.head]
    this.list[this.head] = ''
    this.head = this.head + 1 === this.max ? this.head = 0 : this.head + 1
    return item
  }
  get_head() {
    return this.list[this.head]
  }
  get_tail() {
    return this.list[this.tail]
  }
}

const queue = new Queue(4)
queue.add(1)
queue.add(2)
queue.add(3)
queue.add(4)
console.log(queue)
/*
{
  head: 0
  list: [1, 2, 3, 4]
  max: 4
  tail: 0
}
*/
// 满了无法添加
queue.add(5)
console.log(queue)
/*
{
  head: 0
  list: [1, 2, 3, 4]
  max: 4
  tail: 0
}
*/
console.log( queue.delete() ) // 1
console.log(queue)
/*
  head: 0
  list: ['', 2, 3, 4]
  max: 4
  tail: 0
*/

/* queue.add(5)
console.log(queue)

console.log(queue.get_tail()) */

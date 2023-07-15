// ----------- 两个栈模拟队列 -------------
// 栈的修改是按照后进先出原则进行的，限定仅在表尾进行插入与删除操作的数据
// 队列是一种先进先出的线性表, 它只允许在表的一端进行插入, 在表的另一端进行删除。

class Queue {
  public stack_1: number[] = []
  public stack_2: number[] = []
  constructor() {
    this.stack_1 = []
    this.stack_2 = []
  }
  add(n: number) {
    this.stack_1.push(n)
  }
  delete() {
    while (this.stack_1.length) {
      this.stack_2.push(this.stack_1.pop() as number)
    }
    const n = this.stack_2.pop()
    while (this.stack_2.length) {
      this.stack_1.push(this.stack_2.pop() as number)
    }
    return n
  }
  get length(): number {
    return this.stack_1.length
  }
}

const queue = new Queue()
queue.add(1)
queue.add(2)
queue.add(3)
console.log(queue)

queue.delete()
console.log(queue)
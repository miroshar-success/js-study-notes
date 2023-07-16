interface ListNodeProps {
  value: number
  next?: ListNodeProps
}

class ListNode {
  public length: number = 0
  public head: ListNodeProps | null = null
  public tail: ListNodeProps | null = null
  constructor() {
    this.length = 0
    this.tail = null
    this.head = null
  }
  add (val: number) {
    const node = { value: val }
    if (!this.head) {
      this.head = node
    }
    const tailNode = this.tail
    if (tailNode) {
      tailNode.next = node
    }
    this.tail = node
    this.length += 1
  }
  delete () {
    const headNode = this.head
    if (!headNode) return null
    if (this.length === 0) return null
    const value = headNode.value
    this.length -= 1
    // @ts-ignore
    this.head = headNode.next
    return value
  }
}

const list_node = new ListNode()
list_node.add(1)
list_node.add(2)
list_node.add(3)
list_node.add(4)

console.log(list_node)
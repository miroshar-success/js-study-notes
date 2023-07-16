// -------------- 反转单向链表 ----------------
type ListNode = {
  val: number,
  next?: ListNode
}

const tree: ListNode = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5
        }
      }
    }
  }
}

const reverse_list_node = (tree: ListNode): ListNode => {
  let prevNode: undefined | ListNode = undefined
  let curNode: undefined | ListNode = undefined
  let nextNode: undefined | ListNode = tree // 要反转的节点赋值给nextNode
  while (nextNode) {
    // A -----> B -----> C ------> D --------> E
    // 当curNode指向A, nextNode指向B 的时候, 此时没有prevNode, 移除A指针的next(断开A指针之前和其他节点的联系)
    if (curNode && !prevNode) {
      Reflect.deleteProperty(curNode, 'next')
    }
    // 反转指针
    if (curNode && prevNode) {
      // @ts-ignore
      prevNode.next = curNode
    }
    // 指针移动位置
    prevNode = curNode
    curNode = nextNode
    nextNode = nextNode?.next
  }
  // A ----> B -----> C -----> D --------> E
  // 当prevNode指向D, curNode 指向E, nextNode为 null时
  curNode!.next = prevNode
  return curNode!
}

/**
 * @description 使用数组生成单向链表
*/
const create_list_node = (list:number[] = []): ListNode | null => {
  const length = list.length
  if (length === 0) return null
  let curNode: ListNode = {
    val: list[length - 1]
  }
  if (length === 1) return curNode
  for (let i = length - 2; i >= 0; i--) {
    curNode = {
      val: list[i],
      next: curNode
    }
  }
  return curNode
}

console.log(JSON.stringify(create_list_node([1,2,3,4,5]), null, 2))

const new_tree = create_list_node([100, 200, 300, 400, 500])
console.log(JSON.stringify(new_tree, null, 3))

//@ts-ignore
const reverse_tree = reverse_list_node(new_tree)
// console.log(JSON.stringify(reverse_tree, null, 3), reverse_tree)
console.log(reverse_tree)

export {
  
}
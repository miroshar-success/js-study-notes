interface NodeItem {
  value: number
  next?: NodeItem
}
// 将数组创建为一个链表结构
function create_list_node(array: number[]): NodeItem {
  let node: NodeItem = {
    value: array[array.length - 1]
  }
  if(array.length === 1) return node
  for(let i = array.length - 2; i >= 0; i--) {
    const value = array[i]
    const next_node = {
      value,
      next: node
    }
    node = next_node
  }
  return node
}

console.log(create_list_node([3, 4, 5, 2, 1]))


// ------- 开始排序 ------
// 交换两个 节点的值
const swap = (p: NodeItem, q: NodeItem) => {
  const p_value = p.value
  const q_value = q.value
  q.value = p_value
  p.value = q_value
}

const list_node = create_list_node([6, 1, 2, 7, 9 ,3, 4, 5, 10, 8])

function sort(list_node: NodeItem) {
  let p = list_node
  let q = list_node.next
  const head = p.value
  while(q) {
    if(q.value < head) {
      if(p.next) {
        p = p.next
        swap(p, q)
      }
    }
    q = q.next
  }
  swap(list_node, p)
  return p
}

function real_sort(start:NodeItem , end?: NodeItem) {
  if(start !== end) {
    const part = sort(start)
    real_sort(start, part)
    if(part.next) {
      real_sort(part.next)
    }
  }
}

real_sort(list_node)

function list_to_array(list_node: NodeItem) {
  const temp: number[] = []
  while(list_node) {
    temp.push(list_node.value)
    // @ts-ignore
    list_node = list_node.next
  }
  return temp
}

console.log(list_to_array(list_node)) //[1,2,3,4,5,6,7,8,9,10]

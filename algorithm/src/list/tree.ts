interface Tree {
  value: number
  left?: Tree,
  right?: Tree
}

function create_tree(array: number[]): Tree {
  if(array.length === 0) return { value: 0}
  const tree_node = { value: array.shift() } // 根节点
  const root = [tree_node]
  while(array.length > 0) {
    const node = root.shift()
    if(!array.length) break
    const left = {
      value: array.shift()
    }
    // @ts-ignore
    // 每次取出来的时候 当前对象都是上一个对象的 left 或者 right 节点
    node.left = left
    // 左节点
    root.push(left)
    if(!array.length) break
    const right = {
      value: array.shift()
    }
    // 右节点
    // @ts-ignore
    node.right = right
    root.push(right)
  }
  // @ts-ignore
  return tree_node
}

console.log(create_tree([1, 2, 3, 4, 5, 6, 7]))



function create_tree_2(array: number[]) {
  if(!array.length) return
  const tree = [];
  let root = null;
  for(let i = 0, length = array.length; i < length; i++) {
    const value = array[i]
    const node = { value }
    tree.push(node)
    if( i > 0) {
      // 索引和 节点之间的关系
      const parent_node = tree[Math.floor((i-1) / 2)] // 父节点
      // @ts-ignore
      if(!parent_node.left) {
        // @ts-ignore
        parent_node.left = node
      } else {
        // @ts-ignore
        parent_node.right = node
      }
    } else {
      // @ts-ignore
      root = node
    }
  }
  return root
}
console.log(create_tree_2([1, 2, 3, 4, 5, 6, 7]))

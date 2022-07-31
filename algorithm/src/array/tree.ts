// -------- 将数组转为二叉树, 小的在左侧, 大的在右侧, 且二叉树的子项也符合 --------------
const array:number[] = [10, 20, 25, 16, 6, 17, 11, 8, 5]

interface NodeProps {
  left: null | NodeProps
  right: null | NodeProps,
  value: number
}

function insert(root: NodeProps, number: number): void {
  if (number > root.value) {  // 右侧
    if (root.right === null) {
      root.right = {
        value: number,
        left: null,
        right: null
      }
    } else {
      return insert(root.right, number)
    }
  } else {  // 左侧
    if(root.left === null) {
      root.left = {
        value: number,
        left: null,
        right: null
      }
    } else {
      return insert(root.left, number)
    }
  }
}
function create_tree(array: number[]) {
  if (array.length === 0) return null
  const root = {
    value: array.shift(),
    left: null,
    right: null
  }
  array.forEach(item => {
    insert(root, item)
  })
  return root
}
console.log(create_tree(array))

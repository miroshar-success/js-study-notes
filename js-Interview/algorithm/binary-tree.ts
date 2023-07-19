type BinaryTreeProps = {
  value: number;
  left?: BinaryTreeProps
  right?: BinaryTreeProps
}

const binary_tree: BinaryTreeProps = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: {
        value: 100,
        left: {
          value: 200,
          left: {
            value: 500,
            left: {
              value: 600
            },
            right: {
              value: 700
            }
          }
        }
      },
      right: {
        value: 300 
      }
    },
    right: {
      value: 7,
      left: {
        value: 6,
        left: {
          value: 11,
          left: {
            value: 12,
            left: {
              value: 13
            }
          }
        }
      },
      right: {
        value: 10
      }
    }
  },
  right: {
    value: 3,
    left: {
      value: 5
    },
    right: {
      value: 8
    }
  }
}
const preorder_traversal = (node: BinaryTreeProps | undefined) => {
  if (!node) return
  console.log(node)
  preorder_traversal(node.left)
  preorder_traversal(node.right)
}
preorder_traversal(binary_tree)
// 调用栈
/**
 * [
 *  {value: 2, left: {value: 4}, right: {value: 7, left: {value: 6}, right: {value: 10}}}
    {value: 4}
* ]
 * 
*/
const midorder_traversal = (node: BinaryTreeProps | undefined) => {
  console.log('我进来了,', node)
  if (!node) return
  midorder_traversal(node.left)
  console.log(node)
  midorder_traversal(node.right)
}

const a: BinaryTreeProps = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 100,
      left: {
        value: 200
      }
    },
    right: {
      value: 300
    }
  },
  right: {
    value: 3,
    left: {
      value: 4,
    },
    right: {
      value: 5
    }
  }
}
console.log('---------------------中序遍历---------------------')
midorder_traversal(a)
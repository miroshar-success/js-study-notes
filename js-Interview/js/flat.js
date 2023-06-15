// -------- 拉平数组 ---------
const flat = (array) => {
  const is_flat = array.some(item => Array.isArray(item))
  if (!is_flat) return [...array]
  const a = Array.prototype.concat.apply([], array)
  return flat(a)
}

console.log(flat([1, [2, 3, [4, 5], 6], 7]))  // [1,2,3,4,5,6,7]
console.log(flat([1, 2, 3, [9, [8,[8,[5,7]]]]]))  //  [1, 2, 3, 9, 8, 8, 5, 7 ]

const flat_number = (array, d = 1) => {
  if (d <= 0) return array.slice()
  const t = []
  for (const item of array) {
    if (Array.isArray(item)) {
      t.push(flat_number(item, d-1))
    } else {
      t.push(item)
    }
  }
  return t
}
console.log(flat_number([[[1, 2], 3], 4], 1))

// --------------- 只拉平一层 ---------------
const flat_array = (list = []) => {
  let temp = []
  list.forEach(item => {
    if (Array.isArray(item)) {
      temp = temp.concat(item)
    } else {
      temp.push(item)
    }
  })
  return temp
}
console.log(flat_array([1, [2, 3, [4, 5], 6], 7])) // [ 1, 2, 3, [ 4, 5 ], 6, 7 ]
console.log(flat_array([1, 2, 3, [4, 5], 6]))   // [ 1, 2, 3, 4, 5, 6 ]


// ------------ 彻底拉平 换种方式 ------------------
const flat_item = (array = []) => {
  // console.log('array:', array)
  let temp = []
  for (const item of array) {
    // console.log('item:', item)
    if (Array.isArray(item)) {
      temp.push(...flat_item(item))
      const res = flat_item(item)
      console.log('res', res)
    } else {
      temp.push(item)
    }
  }
  return temp
}
// console.log(flat_item([1, [2, 3, [4, 5], 6], 7]))  // [1,2,3,4,5,6,7]
// console.log(flat_item([1, 2, 3, [9, [8,[8,[5,7]]], 10]]))  //  [1, 2, 3, 9, 8, 8, 5, 7 ]
console.log(flat_item([1, [2, 3], [5, [6, [7], 8], 9], 4]))

// ------- 每次拉平一层 ----------
let a1 = [1, 2, 3, [9, [8,[8,[5,7]]]]]
for(let i = 0; i < 4; i++) {
  // a1 = Array.prototype.concat.apply([], a1)
  a1 = [].concat(...a1)
}
console.log('a1:', a1)
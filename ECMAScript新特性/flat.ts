// -------- 实现flat（只展开一层） -----------
const array_1 = [1,2,[3,[4], 5], 6]

function flat_1(array:any[]): any [] {
  const temp:any[] = []
  array.forEach(item => {
    if(Array.isArray(item)) {
      item.forEach(n => temp.push(n))
    }else{
      temp.push(item)
    }
  })
  return temp
}

console.log(flat_1(array_1))  // [ 1, 2, 3, [ 4 ], 5, 6 ]

function flat_2(array:any[]):any[] {
  let temp:any = []
  array.forEach(item => {
    temp = temp.concat(item)
  })
  return temp
}
console.log(flat_2(array_1))  // [ 1, 2, 3, [ 4 ], 5, 6 ]


// ---------- 实现一个flat ------------
function flat_3(array:any[], d = 2):any[]{
  if(d <= 0) return array.slice()
  let temp:any[] = []
  array.forEach(item => {
    if(Array.isArray(item)) {
      temp = temp.concat(flat_3(item, d-1))
    }else{
      temp = temp.concat(item)
    }
  })
  return temp
}
console.log(flat_3(array_1))  // [ 1, 2, 3, 4, 5, 6 ]


function flat_4(array:any[], d = 1) :any[] {
  if(d <= 0) return array.slice()
  return array.reduce((prev,next) => {
    if(Array.isArray(next)) {
      prev = prev.concat(flat_4(next, d-1))
    }else{
      prev = prev.concat(next)
    }
    return prev
  }, [])
}
console.log(flat_4(array_1, 4))  // [ 1, 2, 3, 4, 5, 6 ]


function flat_5(array:any[]):any[] {
  const temp:any[] = []
  array.forEach(item => {
    if(Array.isArray(item)) {
      const flatArray = flat_5(item)
      flatArray.forEach(n => temp.push(n))
    }else{
      temp.push(item)
    }
  })
  return temp
}
console.log(flat_5(array_1))  // [ 1, 2, 3, 4, 5, 6 ]
const array_2 = [1,2,[3,4,[5,{a:1},6],7],8]
console.log(flat_5(array_2))  // [ 1, 2, 3, 4, 5, { a: 1 }, 6, 7, 8 ]

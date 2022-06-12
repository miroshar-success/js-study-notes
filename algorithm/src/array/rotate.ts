// -------- 螺旋矩阵 --------
/*
[
  [1, 2, 3, 4],
  [12, 13, 14, 5],
  [11, 16, 15, 6],
  [10, 9, 8, 7]
]
*/
// 输出 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16

/*
第一个数组和 最后一个数组 分别为倒序 和 顺序 插入到 temp,
中间到数据 分别取 最后一个元素 和 第一个元素。 递归
*/

function rotate_array(array: number[][]): number[] {
  const temp: number[] = []
  function rotate(array: number[][]) {
    for(let i = 0, length = array.length; i < length; i++) {
      if(i === 0) {
        array[i].forEach(item => {
          temp.push(item)
        })
      }else if(i === array.length - 1) {
        array[i].slice().reverse().forEach(item => {
          temp.push(item)
        })
      }else{
        // @ts-ignore
        temp.push(array[i].pop())
      }
    }
    array.shift() // 删除最后一个数组 和第一个数组
    array.pop()
    for(let i = array.length - 1; i >= 0; i--){
      // @ts-ignore
      temp.push(array[i].shift())
    }
    if(array.length) rotate(array)
  }
  rotate(array)
  return temp
}
console.log(rotate_array([
  [1, 2, 3, 4],
  [12, 13, 14, 5],
  [11, 16, 15, 6],
  [10, 9, 8, 7]
]))
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

console.log(rotate_array([
  [1, 2, 3],
  [8, 9 , 4],
  [7, 6, 5]
])) // [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(rotate_array([
  [1, 2, 3],
  [6, 5, 4]
])) // [1, 2, 3, 4, 5, 6]



// --------- 旋转图像 ---------
/*
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
]
*/

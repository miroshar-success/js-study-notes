// ----- 选择排序 -------
function select(array: number[]): number[] {
  for(let i = 0, length = array.length; i < length; i++) {
    const min = array[i]
    // const index = array.slice(i+1).findIndex(item => item < min)
    // 判断剩下的部分最小值是否比min 还要小
    const remaining_array = array.slice(i+1)
    const remaining_min = Math.min.call(null, ...remaining_array)
    if(remaining_min < min) {
      const index = remaining_array.findIndex(item => item === remaining_min)
      if(index >= 0) {
        array[i] = remaining_min;
        array[i+index+1] = min;
      }
    }
  }
  return array
}
const array = [10, 8 ,9, 3, 2, 5, 7, 4, 1, 6]
console.log(select(array))

console.log(select([3,2,5,4,3,6,4,3]))


function select_2(array: number[]): number[] {
  for(let i = 0, length = array.length; i < length; i++) {
    let min = array[i]
    for(let j = i+1; j < array.length; j++) {
      if(array[j] < min) {
        let c = min
        min = array[j]
        array[j] = c
      }
    }
    array[i] = min
  }
  return array
}
console.log(select_2([3,2,5,4,3,6,4,3]))
// [3 ,5, 2, 1, 6, 4]
// min = 3

// min = 2
// [3, 5, 3, 1, 6, 4]

// min = 1
// [3, 5, 3, 2, 6, 4]
// [1, 5, 3, 2, 6, 4]

// min = 5

// min = 3
// [1, 5, 5, 2, 6, 4]

// min = 2
// [1, 5, 5, 3, 6, 4]
// [1, 2, 5, 3, 6, 4]


// min = 5

// min = 3
// [1, 2, 5, 5, 6, 4]
// [1, 2, 3, 5, 6, 4]

// min = 5
// min = 4
// [1, 2, 3, 5, 6, 5]
// [1, 2, 3, 4, 6, 5]

// min = 6
// min = 5
// [1, 2, 3, 4, 6, 6]
// [1, 2, 3, 4, 5, 6]

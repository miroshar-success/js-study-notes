// 将数组 按 奇偶排序, 奇数下标的数值为奇数, 偶数下标的数值为偶数
function sort(array: number[]): number[] {
  const even_array = array.filter(item => item%2 === 0)
  const odd_array = array.filter(item => item%2 !== 0)
  const temp = []
  for(let i = 0; i < array.length / 2; i++) {
    temp.push(even_array[i])
    temp.push(odd_array[i])
  }
  return temp
}

console.log(sort([3, 5, 2, 4])) // [2, 3, 4, 5]
console.log(sort([1, 3, 5, 2, 4, 6])) // [2, 1, 4, 3, 6, 5]

console.log('------------------')

// 用两个变量
function sort_2(array: number[]): number[] {
  let odd_index = 1, even_index = 0, temp: number[] = [];
  array.forEach(item => {
    if(item % 2 === 0) {
      temp[even_index] = item
      even_index += 2
    } else {
      temp[odd_index] = item;
      odd_index += 2
    }
  })
  return temp
}
console.log(sort_2([3, 5, 2, 4])) // [2, 3, 4, 5]
console.log(sort_2([1, 3, 5, 2, 4, 6])) // [2, 1, 4, 3, 6, 5]

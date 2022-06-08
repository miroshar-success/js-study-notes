// -------- 最大差值 ---------
// 数组排序之后, 相邻元素之间最大的的差
function max(array: number []): number {
  if(!array.length) return 0
  if(array.length === 1) return 0
  let number = Number.MIN_SAFE_INTEGER
  array.sort((a,b) => a - b)
  for(let i = 0, length = array.length - 1; i < length; i++) {
    const next = array[i+1], prev = array[i]
    if(next - prev > number) {
      number = next - prev
    }
  }
  return number
}

console.log(max([4, 5, 2, 1, 9])) // 4
console.log(max([4, 10, 7, 3, 40, 50, 22])) // 18
console.log(max([1, 9]))  // 8
console.log(max([1])) // 0

console.log('--------')

// 利用冒泡排序, 每次排序完之后 求差值
function max_2(array: number[]): number {
  if(!array.length) return 0
  if(array.length === 1) return 0
  let number = Number.MIN_SAFE_INTEGER
  for(let i = array.length - 1; i >= 0; i--) {
    for(let j = 0; j < i; j++) {
      const temp = array[j]
      if(array[j+1] < temp) {
        array[j] = array[j+1];
        array[j+1] = temp;
      }
    }
    // 第一次循环只能找到 一个最大值, 第二个找到第二大的值, 两者之差和number相比
    if(i === array.length - 1) continue;
    if(array[i+1] - array[i] > number) {
      number = array[i+1] - array[i]
    }
  }
  return number
}
console.log(max_2([4, 5, 2, 1, 9])) // 4
console.log(max_2([4, 10, 7, 3, 40, 50, 22])) // 18
console.log(max_2([1, 9]))  // 8
console.log(max_2([1])) // 0
console.log(max_2([2, 30, 13, 15, 7]))  // 15

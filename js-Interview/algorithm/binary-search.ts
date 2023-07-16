// ------------- 二分查找 -----------
const search_target = (array: number[], target: number) => {
  const length = array.length
  if (length === 0) return -1
  for (let i = 0; i < length; i++) {
    const item = array[i]
    if (item === target) {
      return i
    }
  }
  return -1
}

const array = []
for (let i = 1; i < 10 * 10000; i++) {
  array.push(i)
}
console.time('for')
console.log(search_target(array, 20090))
console.timeEnd('for')


const binary_search = (array: number[], target: number): number => {
  const length = array.length
  if (length === 0) return -1
  let left = 0
  let right = length - 1
  while (left > right) {
    const mid = Math.floor((right + left) / 2)
    const n = array[mid]
    if (target === n) return mid
    if (target > n) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}
console.time('binary_search')
console.log(binary_search(array, 20090))
console.timeEnd('binary_search')

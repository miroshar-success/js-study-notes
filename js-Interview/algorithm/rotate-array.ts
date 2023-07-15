// ---------- 将数组旋转K步 ----------------
// 1,2,3,4,5
const rotate_array = (array: number[], k: number): number[] => {
  const length = array.length
  if (length === 0) return []
  if (k > length) {
    k = k % length
  }
  const rotate_slice = array.slice(length - k)
  const temp:number[] = []
  for (let i = rotate_slice.length - 1; i >= 0; i--) {
    temp.push(rotate_slice[i])
  }
  return temp.concat(array.slice(0, length - k))
}

console.log(rotate_array([1, 2, 3, 4, 5], 1))
console.log(rotate_array([1, 2, 3, 4, 5], 3))
console.log(rotate_array([1, 2, 3, 4, 5], 5))
console.log(rotate_array([1, 2, 3, 4, 5], 6))
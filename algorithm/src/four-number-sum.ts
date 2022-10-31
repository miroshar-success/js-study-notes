// 四数字之和
const sum = (array: number[] = [], target: number): Array<number[]> => {
  const length = array.length
  if (length < 4) return []
  array.sort((a, b) => a - b) // 从小到大排序
  const temp: number[][] = []
  for (let i = 0; i < length; i++) {
    if (i > 0 && array[i-1] === array[i]) continue;
    const a = array[i]
    for (let j = i+1; j < length; j++) {
      const b = array[j]
      let start = j + 1
      let end = length - 1
      while (start < end) {
        const sum = a + b + array[start] + array[end]
        if (sum === target) {
          temp.push([a, b, array[start], array[end]])
          start += 1
        } else if (sum > target) {
          end -= 1
        } else {
          start += 1
        }
      }
    }
  }
  if (temp.length && temp.length >=2) {
    const a: string[] = []
    temp.forEach(item => {
      if (!a.includes(item.join(','))) a.push(item.join(','))
    })
    return a.map(item => (item.split(',').map(Number)))
  }
  return temp
}

// console.log(sum([1, 0, -1, 0, -2, 2], 0))
// console.log(sum([2, 2, 2, 2, 2], 8))
// console.log(sum([-4,-3,-2,-1,0,0,1,2,3,4], 0))


const sum_2 = (nums: number[], target: number): number[][] => {
  const length = nums.length
  if (length < 4) return []
  nums.sort((a, b) => a - b)
  const temp: number[][] = []
  for (let i = 0; i < length - 3; i++) {
    const a = nums[i]
    if (i > 0 && nums[i] === nums[i-1]) continue
    for (let j = i + 1; j < length - 2; j++) {
      let start = j + 1
      let end = length - 1
      while(start < end) {
        const sum = a + nums[j] + nums[start] + nums[end]
        if (sum === target) {
          temp.push([a, nums[j], nums[start], nums[end]])
          while(start < end && nums[start] === nums[start+1]) {
            start += 1
          }
          while(start < end && nums[end] === nums[end-1]) {
            end -= 1
          }
          start += 1
          end -= 1
        } else if (sum < target) {
          start += 1
        } else {
          end -= 1
        }
      }
    }
  }
  return temp
}

console.log(sum_2([1, 0, -1, 0, -2, 2], 0))
// -2, -1, 0 0 1 2
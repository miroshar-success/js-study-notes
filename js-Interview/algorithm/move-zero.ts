// 移动0到数组末尾
const move_zero = (nums: number[]): number[] => {
  let zeroLength = 0
  for (let i = 0; i < nums.length - zeroLength; i++) {
    if (nums[i] !== 0) continue
    nums.splice(i, 1)
    i--
    zeroLength += 1
    nums.push(0)
  }
  return nums
}
const list = [1, 2, 0, 0, 2, 0, 0, 1, 2, 3, 4, 0, 0]
console.log(move_zero(list), move_zero(list) === list)


// -------- 双指针 ----------
const move_zero_next = (nums: number[]): number[] => {
  let slow = 0
  const length = nums.length
  for (let i = 0; i < length; i++) {
    const num = nums[i]
    // 如果当前项 不为 0, 
    if (num !== 0) {
      nums[slow] = nums[i]
      slow += 1
    }
  }
  // 然后将 slow 之后的数值全部修改为 0
  while (slow < length) {
    nums[slow] = 0
    slow += 1
  }
  return nums
}
const arr = [1, 2, 0, 0, 2, 0, 0, 1, 2, 3, 4, 0, 0]
console.log(move_zero_next(arr), move_zero_next(arr) === arr)


const move_zero_next_version = (nums: number[]): number[] => {
  let j = -1
  let i = 0
  for (i = 0; i < nums.length; i++) {
    const num = nums[i]
    if (num === 0 && j < 0) {
      j = i // j指向第一个0
    }
    if (j >= 0 && num !== 0) {
      if (nums[j] === 0) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
        j += 1
      }
    }
  }
  return nums
}

const b = [1, 2, 0, 0, 0, 2, 1, 0, 3, 5, 0]
console.log(move_zero_next_version(b))
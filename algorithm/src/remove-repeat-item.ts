// 双指针
// [1, 2, 2, 3, 3, 3, 4]
const remove_repeat_item = (nums: number[]): number => {
  let slow = 0
  let fast = 0
  const length = nums.length
  if (length === 0) return 0
  while(fast < length) {
    if (nums[slow] !== nums[fast]) {
      slow += 1
      if (fast !== slow) {
        nums[slow] = nums[fast]
      }
    }
    fast += 1
  }
  nums.length = slow + 1
  return slow + 1
}
// [1, 1, 1, 1, 2, 2, 2, 3, 3]
// console.log(remove_repeat_item([1, 1, 2, 3, 5, 5, 7]))


const remove_repeat_item_2 = (nums: number[]): number => {
  for (let i = nums.length; i > 0; i--) {
    if (nums[i] === nums[i-1]) {
      nums.splice(i, 1)
    }
  }
  return nums.length
}

// console.log(remove_repeat_item_2([1, 1, 2, 3, 5, 5, 7]))

// [1, 2, 3, 4, 5, 5, 5, 6]
const remove_repeat_item_3 = (nums: number[]): number => {
  let slow = nums.length - 1
  for (let i = nums.length; i >= 0; i--) {
    while (nums[slow] === nums[i]) {
      slow -= 1
    }
    if (i - slow > 1) {
      nums.splice(slow + 1, i - slow - 1)
      console.log(i, slow)
      slow = nums.length - 1
    }
  }
  console.log(nums)
  return nums.length
}

console.log(remove_repeat_item_3([1, 1, 2, 2, 3, 3, 3]))
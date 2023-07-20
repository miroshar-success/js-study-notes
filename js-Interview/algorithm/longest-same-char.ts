// ----------- 相同字符串最多的 ---------------
const longest_same_char_of_string = (s: string): number => {
  let result = 0
  for (let i = 0; i < s.length; i++) {
    let max = 0 // 每次重制max
    for (let j = i; j < s.length; j++) {
      if (s[j] === s[i]) { // 如果相等, 将max加1
        max += 1
      }
      // 不想等 或者 已经到结尾时 需要比较此时的max 是否为最大值
      if (s[j] !== s[i] || j === s.length - 1) {
        if (max > result) {
          result = max
        }
        // 跳步, 如果此时i还未遍历到底, 
        if (i < s.length - 1) {
          i = j - 1
        }
        break
      }
    }
  }
  return result
}

console.log(longest_same_char_of_string('aaaaabcccccccccd'))  // 9
console.log(longest_same_char_of_string('aaaaaaaaaaaaa'))     // 13
console.log(longest_same_char_of_string('abcdedgh'))          // 1
console.log(longest_same_char_of_string('abcdedghhhhhhhh'))   // 8


// ------------- 双指针 ---------
const next_version = (s: string): number => {
  let max = 0
  let result = 0
  let j = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[j]) {
      max += 1
    }
    if (s[i] !== s[j] || i === s.length - 1) {
      if (max > result) {
        result = max
      }
      max = 0
      if (i < s.length - 1) {
        j = i
        i--
      }
    }
  }
  return result
}
console.log(next_version('aaaaabcccccccccd'))  // 9
console.log(next_version('aaaaaaaaaaaaa'))     // 13
console.log(next_version('abcdedgh'))          // 1
console.log(next_version('abcdedghhhhhhhh'))   // 8

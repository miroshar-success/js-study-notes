
/*   给定一个未排序的整数数组, 找出其中没有出现的最小的正整数。
  1. [1, 2, 0] ===> 3
  2. [3, 4, -1, 1] ===> 2 */

function lack(array: number[]): number {
  const temp = array.slice().filter(item => item > 0) // 先过滤出正整数
  if(!temp.length) return 1
  temp.sort((a,b) => a - b) // 从小到大排序
  for(let i = 0, length = temp.length - 1; i < length; i++) {
    if(temp[i+1] - temp[i] !== 1) {
      return temp[i] + 1
    }
  }
  return temp[temp.length-1] + 1
}

/* console.log(lack([1, 2, 0]))  // 3
console.log(lack([3, 4, -1, 1]))  // 2
console.log(lack([-1, -2, 5, 2, 3, 1]))  // 4 */
export {

}

// -------- 利用选择排序 ----------
function lack_2(array: number[]): number {
  const temp = array.slice().filter(item => item > 0)
  for(let i = 0, length = temp.length; i < length; i++) {
    let min = temp[i]
    for(let j = i+1 ; j < temp.length; j++) {
      if(temp[j] < min) {
        let c = min
        min = temp[j]
        temp[j] = c
      }
    }
    temp[i] = min
    if(i > 0) { // 至少遍历两个最小值, 求出是否是连续的
      if(temp[i] - temp[i-1] !== 1) return temp[i-1] + 1
    } else {
      if(temp[i] !== 1) return 1
    }
  }
  return temp.length ? temp[temp.length-1] + 1 : 1
}
console.log(lack_2([1, 2, 0]))  // 3
console.log(lack_2([3, 4, -1, 1]))  // 2
console.log(lack_2([-1, -2, 5, 2, 3, 1]))  // 4
console.log(lack_2([2, 3, 4, 5])) // 1

/* module.exports = {
  lack
} */


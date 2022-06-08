// ------- 选定一个数字X, 将数组分数,
// 1. 每组都有x张牌, 2. 组内所有的牌上都写着相同的整数
function card_group(list: number[]): boolean {
  if(!list.length) return false
  const rest = list.slice().sort();
  const result: number[][] = []
  let min: number = Number.MAX_SAFE_INTEGER
  for(let i = 0, length = rest.length; i < length; i++) {
    const temp: number[] = []
    temp.push(rest[i])
    for(let j = i + 1; j <= rest.length; j++) {
      if(rest[i] === rest[j]) {
        temp.push(rest[j])
      } else {
        i = j - 1
        result.push(temp)
        if(temp.length < min) {
          min = temp.length
        }
        break;
      }
    }
  }
  if(min < 2) return false
  let flag = true
  result.every(item => {
    if(item.length % min !== 0) {
      flag = false
      return false
    }
  })
  return flag
}

/* console.log(card_group([1,2,3,4,4,3,2,1,2,5,6,5,7]))  // false
console.log(card_group([1,1,2,2,3,3,4,4]))  // true
console.log(card_group([1,1,2,2,2,2]))  // true */

module.exports = {
  card_group
}
export {
}

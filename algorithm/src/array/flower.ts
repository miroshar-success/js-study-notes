// 种花问题, 给定一个数组, 0表示未种花,1表示已种花, 花不能在相邻地方种植, 是否在给定数组里 种植 n朵花
function test_flower(array: number[], number: number): boolean {
  let max: number = 0;
  for(let i = 0, length = array.length - 1; i < length; i++) {
    if(array[i] === 0) {
      // 第一个元素就为0, 判断右边是否等于 0
      if(i === 0 && array[i+1] === 0) {
        max++
        i++
      }else if(array[i-1] === 0 && array[i+1] === 0) {
        max++
        i++
      }
    }
  }
  return max >= number
}

console.log(test_flower([0,0,1,0,1,0], 1))  // true
console.log(test_flower([1,0,0,1,0,0,1], 2))  // false
console.log(test_flower([1,0,0,1,0,0,1], 0))  // true

export {

}

module.exports = {
  test_flower
}

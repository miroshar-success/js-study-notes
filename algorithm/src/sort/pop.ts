// ---------- 冒泡排序 ---------

// 两个相邻的数比较大小，将两个数中较大的数往右边放，小的往左边放
const array = [10, 8 ,9, 3, 2, 5, 7, 4, 1, 6]
function sort(array: number[]): number[] {
  // 外层循环控制循环次数
  for(let i = array.length - 1; i >= 0; i--) {
    for(let j = 0; j < i; j++) {
      const temp = array[j]
      if(temp > array[j+1]) {
        array[j] = array[j+1]
        array[j+1] = temp
      }
    }
  }
  return array
}

console.log(sort(array))
export {

}

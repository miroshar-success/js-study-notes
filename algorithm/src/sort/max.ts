// 找出数组第 k 大的元素
function max_number(array: number[], k: number): number {
  if(k <= 0) return 0
  return array.sort((a,b) => b - a)[k-1]
}

console.log(max_number([3, 6, 10, 20, 17, 100], 2)) // 20
console.log(max_number([3, 6, 10, 20, 17, 100], 1)) // 100
console.log(max_number([3, 6, 10, 20, 17, 100], 6)) //  3


function max_number_2(array: number[], n: number): number {
  if(n > array.length) return 0
  let max:number = 0
  for(let i = array.length - 1; i >= 0; i--) {
    for(let k = 0; k < i; k++) {
      const tmp = array[k]
      if(tmp > array[k+1]) {
        array[k] = array[k+1]
        array[k+1] = tmp
      }
    }
    if((array.length - n) === i) {
      max = array[array.length - n]
      break;
    }
  }
  return max
}
console.log(max_number_2([3, 6, 10, 20, 17, 100], 2)) // 20
console.log(max_number_2([3, 6, 10, 20, 17, 100], 1)) // 100
console.log(max_number([3, 6, 10, 20, 17, 100], 6))   //  3



function max_number_3(array: number[], n: number): number {
  const length = array.length - 1
  for(let i = length; i > length - n; i--) {
    for(let k = 0; k < i; k++) {
      const tmp = array[k]
      if(array[k+1] < tmp) {
        array[k] = array[k+1]
        array[k+1] = tmp
      }
    }
  }
  return array[length-(n-1)]
}

console.log(max_number_3([3, 6, 10, 20, 17, 100], 2)) // 20
console.log(max_number_3([3, 6, 10, 20, 17, 100], 1)) // 100
console.log(max_number_3([3, 6, 10, 20, 17, 100], 6))   //  3

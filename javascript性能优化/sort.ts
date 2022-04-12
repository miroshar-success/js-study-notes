// ------ 快速排序 使用splice ---------
function quickSort(array:number[]): number [] {
  const length = array.length;
  if(length === 0) return []
  const middleIndex = Math.floor(length / 2)
  const middleValue = array.splice(middleIndex, 1)[0]
  const left:number[] = [], right:number[] = [];
  for(let i = 0; i < array.length; i++) {
    if(array[i] < middleValue) {
      left.push(array[i])
    }else{
      right.push(array[i])
    }
  }
  return quickSort(left).concat([middleValue], quickSort(right))
}

const arr:number [] = [1,4,3,5,7,2,6,9,8]
console.log(quickSort(arr)) // [1, 2, 3, 4, 5, 6, 7, 8, 9]


// ----- 使用slice方法 -------
function quickSliceSort(array: number[]):number [] {
  const length = array.length
  if(length === 0) return []
  const middleIndex = Math.floor(length / 2)
  const middleValue = array.slice(middleIndex, middleIndex+1)[0]
  const left:number[] = [], right:number[] = [];
  for(let i = 0; i < length; i++) {
    if(i === middleIndex) continue
    if(array[i] < middleValue) {
      left.push(array[i])
    }else{
      right.push(array[i])
    }
  }
  return quickSort(left).concat([middleValue], quickSort(right))
}
const arr1:number [] = [1,4,3,5,7,2,6,9,8]
console.log(quickSliceSort(arr1))
/*
[
  1, 2, 3, 4, 5,
  6, 7, 8, 9
]
*/

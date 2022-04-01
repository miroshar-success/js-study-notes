# 算法题目

  将一个数组旋转k步
  
  例子: [1,2,3,4,5,6,7] -> 旋转3步 变为 [5,6,7,1,2,3,4]
```js
// 第一个实现
function fn(array = [], k = 1) {
  if(!array.length) return []
  if(k > array.length) {
    k = k % array.length
  }
  const array1 = array.slice(array.length - k)
  const array2 = array.slice(0, array.length - k)
  return [...array1, ...array2]
}
const array = [1,2,3,4,5,6,7]
console.log(fn(array, 3)) // 5,6,7,1,2,3,4
console.log(fn(array, 8)) // 7 1 2 3 4 5 6
```

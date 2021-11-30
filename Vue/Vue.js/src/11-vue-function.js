// 将一个ArrayLike对象转化为数组,并删除指定项数据,
// start可选
/*
const list = [1, 2, 3, 4, 5], start = 1;
array = [ , , , ]
i:3  array = [, , ,5]
i:2  array = [,,4,5]
i:1  array = [,3,4,5]
i:0  array = [2,3,4,5]
*/
function toArray(list, start) {
  start = start || 0
  let i = list.length - start;
  const array = new Array(i)
  while(i--){
    array[i] = list[start+i]
  }
  return array
}

console.log(toArray([1,2,3,4,5],1))

let number = 10;
console.log(number--)
let x = 10;
console.log(--x)  // 9

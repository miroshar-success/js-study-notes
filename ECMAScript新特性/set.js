const s = new Set()
const array = [1,2,3,4,5,4,3,2,1]
array.forEach(item => s.add(item))
console.log(s)

const s2 = new Set([1,2,3,4,5])
console.log('s2:',s2,[...s2], s2.size);

// 去重复字符串
console.log( [...new Set('abbca')] ); // [a,b,c]

let set = new Set();
set.add(NaN)
set.add(NaN)
console.log('set:', set)  // Set { NaN }


// ----------------- Set结构  add()添加 / delete删除  / has()是否存在 / clear() 
console.log('set.prototype.constructor:', Set.prototype.constructor);
let s3 = new Set(['kyrie', 'durant', 'wade', 'james'])
console.log(s3.delete('kyrie'))
console.log('s3:', s3)
console.log(s3.size)
console.log(s3.has('kyrie'), s3.has('durant'))  // false true

console.log(Array.from(s3)) // ['kyrie', 'wade', 'james']
s3.clear();
console.log('s3:', s3);     // Set {}

// ------------------------ keys values entries forEach
let s5 = new Set(['kyrie','lebron','durant','wade']);

for(let item of s5.keys()){
  console.log('key:',item)
}

for(let item of s5.values()){
  console.log('value:',item);
}

for(let item of s5.entries()){
  console.log('entires:', item)
}


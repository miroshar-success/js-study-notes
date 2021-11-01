//--------------------------  基本用法 --------------------------
const s = new Set()
const array = [1,2,3,4,5,4,3,2,1]
array.forEach(item => s.add(item))
console.log(s)  // { 1, 2, 3, 4, 5 }

const s2 = new Set([1,2,3,4,5])
console.log('s2:',s2,[...s2], s2.size); // { 1, 2, 3, 4, 5 } [ 1, 2, 3, 4, 5 ] 5

// --------------------------  去重复字符串
console.log( [...new Set('abbca')] ); // [a,b,c]

let set = new Set();
set.add(NaN)
set.add(NaN)
console.log('set:', set)  // Set { NaN }


// ---------------------------- Set结构  add()添加 / delete删除  / has()是否存在 / clear() --------------------------
console.log('set.prototype.constructor:', Set.prototype.constructor);
let s3 = new Set(['kyrie', 'durant', 'wade', 'james'])
s3.add('curry')
s3                  //  { 'kyrie', 'durant', 'wade', 'james', 'curry' }
s3.delete('kyrie')  // true
s3                 // Set(4) { 'durant', 'wade', 'james', 'curry' }
s3.size            // 4
s3.has('kyrie'), s3.has('durant')  // false true

Array.from(s3)    // [ 'durant', 'wade', 'james', 'curry' ]
s3.clear();
s3;               // Set {}

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


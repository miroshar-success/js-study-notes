//---------------  基本用法 ----------------
// 成员值是唯一的，不会重复
const s = new Set()
const array = [1,2,3,4,5,4,3,2,1]
array.forEach(item => s.add(item))
console.log(s)  // { 1, 2, 3, 4, 5 }

for(const i of s) {
  console.log('i', i) // 1 2 3 4 5
}

const s2 = new Set([1,2,3,4,5])
console.log('s2:',s2,[...s2], s2.size); // { 1, 2, 3, 4, 5 } [ 1, 2, 3, 4, 5 ] 5

// -----------  去重复字符串 -----------
console.log( [...new Set('abbca')] ); // [a,b,c]

let set = new Set();
set.add(NaN)
set.add(NaN)
console.log('set:', set)  // Set { NaN }

// ------- 具有iterator接口的数据结构 ------
const arrayLike = {
  0:'hello',
  1:'world',
  2:'你好生活',
  length:3,
  [Symbol.iterator]:Array.prototype[Symbol.iterator]
}
console.log(new Set(arrayLike)) // Set(3) { 'hello', 'world', '你好生活' }

const player = {
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30,
  [Symbol.iterator]:function() {
    const _this = this;
    let nextId = 0
    return {
      next:function() {
        const keys = Object.keys(_this)
        if(nextId < keys.length) {
          return {
            value: _this[keys[nextId++]],
            done: false
          }
        }else{
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
}
console.log(new Set(player))  // { 'kyrie', 'irving', 30 }

//  ----- 不会进行类型转换 -------
const same_set = new Set()
same_set.add(5)
same_set.add('5')
console.log('same_set', same_set) // { 5, '5' }


//-------- Set结构  add()添加 / delete删除  / has()是否存在 / clear() --------------------------
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

//---------- keys values entries forEach -----------
let s5 = new Set(['kyrie','lebron','durant','wade']);

for(let item of s5.keys()){
  console.log('key:',item)
  /*
  key: kyrie
  key: lebron
  key: durant
  key: wade
  */
}

for(let item of s5.values()){
  console.log('value:',item);
  /*
  value: kyrie
  value: lebron
  value: durant
  value: wade
  */
}

for(let item of s5.entries()){
  console.log('entires:', item)
  /*
  entires: [ 'kyrie', 'kyrie' ]
  entires: [ 'lebron', 'lebron' ]
  entires: [ 'durant', 'durant' ]
  entires: [ 'wade', 'wade' ]
  */
}

// ----- 并集 交集 和 差集 ------
const a = new Set([1,2,3])
const b = new Set([2,3,4])

let union = new Set([...a, ...b])
const intersect = new Set([...a].filter(x => b.has(x)))
const difference_1 = new Set([...a].filter(x => !b.has(x)))
const difference_2 = new Set([...b].filter(x => !a.has(x)))

console.log(union, intersect, difference_1, difference_2) // Set(4) { 1, 2, 3, 4 } Set(2) { 2, 3 } Set(1) { 1 }
// Set(1) { 4 }


// ------- weakSet -----
const ws = new WeakSet()
let kyrie = {
  firstName:'kyrie',
  lastName:'irving'
}

const ss = new Set()

ws.add(kyrie)
ss.add(kyrie)

console.log('ws', ws)
console.log('ss', ss)


let weak = new WeakSet()

weak.add({})
weak.add([])

const timeId = setInterval(() => {
  console.log(weak)
})


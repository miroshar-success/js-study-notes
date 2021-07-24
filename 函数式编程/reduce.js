const maxCallback = (acc, cur) => Math.max(acc.x, cur.x);
const maxCallback2 = (max,cur) => Math.max(max,cur);

console.log([ {x:2}, {x:22}, {x:42}].reduce(maxCallback)); // NaN
console.log([{x:2}, {x:22}].reduce(maxCallback)); // 22
console.log([{x:2}].reduce(maxCallback)); // {x:2}

console.log([ {x:2}, {x:22}, {x:42}].reduce((acc,cur,i,arr) => {
  console.log(acc,cur,i,arr)
  return Math.max(acc.x,cur.x)
})); 

// 比较对象某个值大小, 先用map取出值,再比较
const max = [{x:2}, {x:22}, {x:42}].map(item => item.x).reduce((prev,next) => Math.max(prev,next), -Infinity)
console.log('max:', max);


const array = [1,2,3,4];
array.reduce((acc,cur,i,array) => {
  console.log(acc,cur,i,array);
  return acc + cur
})

array.reduce((acc,cur,i,array) => {
  console.log(acc,cur,i,array);
  return acc + cur
},0)

// 将而为数组转化为一维数组
const flatt_array = [[0,1],[2,3],[4,5],[6,7]].reduce((prev,next) => {
  return prev.concat(next);
},[])
console.log(flatt_array);

// 统计数组每项出现的次数
const names = ['kyrie', 'durant', 'kobe', 'james', 'durant', 'kyrie', 'wade', 'bosh'];
const countedNames = names.reduce((prev,next) => {
  if(next in prev) {
    prev[next] += 1;
  }else{
    prev[next] = 1;
  }
  return prev;
},{})
console.log(countedNames);

// 统计每个字母出现的次数
const str = 'abdcd15dwess2s';
console.log(str.split('').reduce((acc,cur) => {
  if(cur in acc) {
    acc[cur] += 1
  }else{
    acc[cur] = 1
  }
  return acc;
},{}));


// 按属性进行分类
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
]

// 第一种方法
const groupByAge = people.reduce((acc,cur) => {
  if(cur.age in acc) {
    acc[cur.age].push(cur)
  }else{
    acc[cur.age] = [cur]
  }
  return acc;
},{})
console.log(groupByAge);

// 第二种思路
const groupPeopleByAge = people.reduce((acc,cur) => {
  if( !acc[cur.age]){
    acc[cur.age] = []
  }
  acc[cur.age].push(cur)
  return acc
},{})
console.log(groupPeopleByAge);


// 使用扩展运算符和initialValue绑定包含在对象数组中对数组
var friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}];

const allbooks = friends.reduce((prev,next) => {
  return [...prev,...next.books];
},['hello world']);
console.log(allbooks);


// 数组去重
let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']

let orderedArray = Array.from(new Set(myArray));
console.log(orderedArray);

let orderArray = myArray.reduce((prev,next) => {
  if (prev.indexOf(next) === -1) {
    prev.push(next)
  }
  return prev
},[])
console.log(orderArray);

// 数字数组去重
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current) => {
  // [1,1,2,2,3,3,4,4,4,4,4,5,5];
    if(init.length === 0 || init[init.length-1] !== current) {
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5];


// 链式顺序调用promise
function runPromiseInSequence(arr,input) {
  return arr.reduce((a,c) => {
    return a.then((result) => {
      return c(result)  
    })
  },Promise.resolve(input))
}

function p1(a) {
  return new Promise(resolve => {
    resolve(a * 5)
  })
}
function p2(a) {
  return new Promise(resolve => {
    resolve(a * 2)
  })
}
function p3(a) {
  return new Promise(resolve => {
    resolve(a * 3)
  })
}
const promiseArray = [p1,p2,p3]
runPromiseInSequence(promiseArray,10).then(console.log);

// then里函数自动传递吗？ 

const promise1 = function(){
  return new Promise(resolve => {
    resolve('hello world');
  })
}
promise1().then(console.log)


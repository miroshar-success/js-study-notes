// 申请空间
let object = {}
// 使用空间
object.name = 'Joe'
const ali = object
// 释放
object = null
console.log(ali)  // {name:'Joe'}
// --------------------- JavaScript中内存管理是自动的
// 可达对象 可以访问到的对象

// 常见GC算法 及优缺点  1:优点  2: 缺点
/*
1. 引用计数
2. 标记清除
3. 标记整理
4. 分代回收
*/
// -------------------------------- 引用计数优缺点 (1 发现垃圾立即回收 最大限度减少程序暂停 2 无法回收循环引用的对象,时间开销大)
function count_fn(){
  const object1 = {}
  const object2 = {}
  object1.name = object2;
  object2.name = object1;
}
count_fn()

// --------------------------- 标记清除
/*
分标记和清除,先遍历所有对象找到活动对象,再次遍历清除没有标记的对象 (1可以解决循环引用不能回收 2空间碎片化)
*/

// ----------------------------- 标记整理 (1 减少碎片化空间 2 不能立即回收)


// ----------------------------- 监控内存的方式
/*
1. 浏览器任务管理器
2. Timeline时序图记录
3. 堆快照查找分离DOM
*/

// 创建dom,但不再页面上显示 分离dom
// let tempElement = null;
// function fn() {
//  const ul = document.createElement('ul')
//  for(let i = 0; i < 10; i++){
//    ul.appendChild(document.createElement('li'))
//  }
//  tempElement = ul;
//  tempElement = null;
// }

// document.querySelector('.button').addEventListener('click',fn,false)

// ------------ 代码优化
/*
1. 减少全局变量使用
2. 缓存全局变量
3. 方法添加到原型对象上
4. 避开闭包陷阱
5. 避免使用方法访问对象到属性
*/

// 减少作用域链查找层级
// 使用时间委托
// jsbench.me 检测js代码性能网站

let variable = 10;
function foo(b){
  let variable = 2;
  function baz(c){
    console.log(variable + b + c)
  }
  return baz
}
const f1 = foo(2)
f1(3)


var name = 'zce'
function foo(){
  name = '666'
  function baz(){
    var age = 30;
    console.log(name)
    console.log(age)
  }
  baz()
}
foo()

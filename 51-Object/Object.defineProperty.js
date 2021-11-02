// -------------------- 定义一个新属性 或者修改一个对象的现有属性 ----------------
// 默认情况下,使用Object.defineProperty()添加的属性值是不可修改的。
const object1 = {};
Object.defineProperty(object1,'property1',{
  value:42,
  writable:false
})
object1.property1 = 77; // 无法修改 key为 property1的值
console.log(object1.property1)  // 42

// -------------------- 定义一个key为symbol的属性 ----------------
Object.defineProperty(object1,Symbol('foo'),{
  value:'hello world',
  writable:true
})
console.log('object1:', object1)  // {property1:42,Symbol(foo):'hello world'}

// ----------------------- 数据描述符 value/writable----------------------------------------
const obj = {}
Object.defineProperty(obj,'age',{
  value:29,
  writable:true
})
console.log('object:', obj, obj.age)  // {age:29} 29
obj.age = 30;
console.log(obj.age)  // 30

//-------------------------------  数据存取 --------------------------------
const player = {
  _age:18
}
Object.defineProperty(player,'age',{
  get:function() {
    return this._age
  },
  set:function(value){
    this._age = value;
  }
})
console.log('player:',player,player.age)  // {age:30}
player.age = 40;
console.log(player.age) // 40

// ------------------------------- 修改属性 writable-------------------------------
// writable属性
const o = {}
Object.defineProperty(o, 'a', {
  value: 37,
  writable:false
})
console.log('before:',o.a)  // 37
o.a = 25
console.log('after',o.a)  // 37

// ----------------------------- 是否可枚举 Enumerable -----------------------------
const b1 = {}, b2 = {};
Object.defineProperty(b1,'age',{
  value:30,
  writable:true,
  enumerable:false
})

Object.defineProperty(b2,'age',{
  value:30,
  writable:true,
  enumerable:true
})
for(let key in b1){
  console.log('b1-key:',key)  // 没有输出
}
for(let key in b2){
  console.log('b2-key:',key)  // age
}
console.log(Object.keys(b1), Object.keys(b2)) //[]  ['age']

//------------------------------------  Configurable 属性 ----------------------------------------
// configurable 是否可被删除 以及除value和writable特性外的其他特性是否可被修改
const z = {}
Object.defineProperty(z,'a',{
  get() {
    return 1
  },
  configurable:false
})
// Object.defineProperty(o,'a',{
//   configurable:true
// })
// Object.defineProperty(o,'a',{
//   enumerable:false
// })
// Object.defineProperty(o,'a',{
//   value:30
// })


// ----------------------------------自定义getter和setter----------------------------------
function Archiver() {
  let temperature = null;
  var archive = []
  Object.defineProperty(this, 'temperature', {
    get:function() {
      return temperature
    },
    set:function(value) {
      temperature = value;
      archive.push({value:temperature})
    }
  })
  this.getArchive = function() {
    return archive
  }
}
const arc = new Archiver()
arc.temperature = 11
console.log(arc.temperature)
arc.temperature = 12;
arc.temperature = 13;
console.log(arc.getArchive());
/*
0: {value: 11}
1: {value: 12}
2: {value: 13}
*/

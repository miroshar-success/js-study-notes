// -------------------- 定义一个新属性 或者修改一个对象的现有属性 ----------------
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

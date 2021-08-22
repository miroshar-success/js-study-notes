const object1 = {}
Object.defineProperty(object1,'property1', {
  value:42,
})

console.log('object1:', object1, object1.property1) // 42;
console.log(Object.getOwnPropertyDescriptors(object1))

// ------ 如果对象中不存在指定的属性,Object.defineProperty()会创建这个属性,当描述符中省略某些字段时,这些字段将使用它们的默认值。
const o = {};
Object.defineProperty(o, 'a', {
  value: 32,
  writable: true,
  enumerable: true,
  configurable: true
})
console.log('o:', o);

let bValue = 40;
Object.defineProperty(o, 'b', {
  get() {
    return bValue;
  },
  set(newValue) {
    bValue = newValue;
  },
  enumerable:false,
  configurable:false
})
console.log(o.b)      // 40
o.b = 100;
console.log(o.b)

//  Enumerable 属性定义了对象的属性 是否可以在 for...in 和 Object.keys()中被 枚举
const person = {};
Object.defineProperty(person,'firstName', {
  value:'kyrie',
  enumerable:false
})
Object.defineProperty(person,'lastName',{
  value:'irving',
  enumerable:true
})
Object.defineProperty(person,'age', {
  value:30,
  enumerable:true
})
console.log('person:' ,person);

for(let key in person){
  console.log('key:', key)
}

console.log(Object.keys(person)); // ['lastName', 'age']

// Configure属性, 表示对象的属性是否可以删除,
const c = {}
Object.defineProperty(c, 'a', {
  get() {return 1},
  configurable:false
})
console.log(c.a)  // 1
delete c.a
console.log(c.a)

// -------------------------------- 自定义setters和getters
function Archiver() {
  var temperature = null;
  var archive = [];
  Object.defineProperty(this,'temperature', {
    get:function() {
      console.log('this:', this);
      return temperature;
    },
    set:function(value) {
      temperature = value;
      archive.push({value})
    }
  })
  this.getArchive = function() {
    return archive
  }
}
const arc = new Archiver();
console.log('first-temperature:', arc.temperature)  // null
arc.temperature;
arc.temperature = 123;
arc.temperature = 456;
arc.temperature = 789;
console.log(arc.getArchive())
console.log(arc.temperature); // 789

// ---------------------------- getter总是返回同一个相同的值。
const pattern = {
  get:function() {
    return 'I alway return this string,whatever you have assigned';
  },
  set:function() {
    this.my_name = 'this is my name string';
  }
}

function TestDefineSetAndGet() {
  Object.defineProperty(this,'my_property', pattern)
}
const instance = new TestDefineSetAndGet()
console.log(instance.my_property)
console.log('my_name:',instance.my_name);
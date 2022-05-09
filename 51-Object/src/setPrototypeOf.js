console.log('-------------- Object.setPrototypeOf ------------')
/* const a = {
  name: 'hello',
}
const b = {
  getName(){
    return this.name
  }
}
Object.setPrototypeOf(a, b)
console.log(a.getName())  // hello


console.log(Object.getPrototypeOf(a) === b) // true */



const z = { a: 3, b: 4}
z.__proto__.c = 5
console.log('z', z) // {a: 3, b: 4}
const { ...m} = z;
console.log(m)  // {a: 3, b: 4}

const { a, b, c } = z;
console.log(a, b, c)  // 3 4 5


const o = {
  foo: 123,
  baz: 456
}
console.log(Object.getOwnPropertyDescriptors(o))
/*
{
  baz: {
    configurable: true
    enumerable: true
    value: 456
    writable: true
  }
  foo:{
    configurable: true
    enumerable: true
    value: 123
    writable: true
  }
}
*/
let message = 'hello'
const source = {
  message: 'hello',
  get foo() {
    return message
  },
  set foo(value) {
    message = value
  }
}
console.log(source)
console.log('source',Object.assign({}, source))
const target = Object.assign({}, source)
console.log(Object.getOwnPropertyDescriptor(target, 'foo'))

console.log(Object.getOwnPropertyDescriptors(source))

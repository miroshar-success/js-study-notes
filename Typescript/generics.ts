function identity<Type>(arg: Type): Type {
  return arg
}

console.log(identity<string>('123'))
console.log(identity<number>(123))
console.log(identity<boolean>(true))
console.log(identity([1,2,3]))  // 自动推断类型

function sum<T, U>(a: T, b: U) {
  return `${a}-${b}`
}
console.log(sum<string, number>('1', 2))
console.log(sum<number, string>(1, '2'))

// -------- T.length -----------
function loggingIdentity<T>(arg: T[]): number {
  return arg.length
}
console.log(loggingIdentity<string>(['1', '2', '3']))
console.log(loggingIdentity<number>([1, 2, 3]))

// -------------- generic constraints -----------
interface Lengthwise {
  length: number
}
function getLength<Type extends Lengthwise>(arg: Type): number {
  return arg.length
}
console.log(getLength([1,2,3,4]))
console.log(getLength('123'))
console.log(getLength({length:10}))


// ----------- generic class ----------
class Manager<T> {
  private data: T []
  constructor(data: T []) {
    this.data = data
  }
  getItem(index: number): T {
    return this.data[index]
  }
}
const m = new Manager<string>(['1', '2', '3', '4', '5'])
console.log(m.getItem(0)) // 1
console.log(m.getItem(1)) // 2


// ------------ type parameters ----------
function getProperty<Type, Key extends keyof Type>(obj:Type, key: Key) {
  return obj[key]
}
const x = {a: 1, b: 2, c: 3, d: 4}
console.log(getProperty(x, 'a'))
console.log(getProperty(x, 'b'))
// console.log(getProperty(x, 'm')) // You can declare a type parameter that is constrained by another type parameter. For example, here we’d like to get a property from an object given its name. We’d like to ensure that we’re not accidentally grabbing a property that does not exist on the obj, so we’ll place a constraint between the two types:



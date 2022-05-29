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


// ------- extends 和 keyof 结合使用 ------
/*
获取一个接口 或者 一个对象所有属性的联合类型
*/
class Player {
  public firstName: string
  public lastName: string
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
const kyrie = new Player('kyrie', 'irving')
const lebron = new Player('lebron', 'james')
function print<T extends Player, U extends keyof Player>(obj: T, key: U) {
  console.log(obj[key])
}
print(kyrie, 'firstName')
print(lebron, 'lastName')


/*
------------- vue3的 一段源码 -----------
*/
class ObjectRefImplement<T extends object, K extends keyof T> {
  private _object: T
  private _key: K
  constructor(object: T, key: K) {
    this._object = object
    this._key = key
  }
  getValue() {
    return this._object[this._key]
  }
  setValue(value: T[K]) {
    this._object[this._key] = value
  }
}
const player_ref = new ObjectRefImplement<Player, 'firstName'>(kyrie, 'firstName')
player_ref.setValue('ky')
console.log(player_ref.getValue(), kyrie) // { firstName: 'ky', lastName: 'irving' }

const player_ref_1 = new ObjectRefImplement(lebron, 'lastName')
console.log(player_ref_1.getValue())  // james
player_ref_1.setValue('king')
console.log(player_ref_1.getValue())  // king

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


class ArrayLike<T> {
  public length: number = 0
  add(ele: T) {
    // @ts-ignore
    this[this.length] = ele
    this.length += 1
  }
  get(index: number) {
    // @ts-ignore
    return this[index]
  }
  delete(index: number) {
    Reflect.deleteProperty(this, index)
    this.length -= 1
  }
}
const array_like_string = new ArrayLike<string>()
array_like_string.add('1')
array_like_string.add('2')
array_like_string.add('3')
console.log(array_like_string.get(2)) // 3
array_like_string.delete(0)
console.log(array_like_string)  // ArrayLike { '1': '2', '2': '3', length: 2 }

/*
object 编译期间无法进行安全类型检查
object 类型数据无法接受非object类型数据
object 类型数据获取数据和方法时没有提示

any扩大数据类型的属性后没有编译错误导致潜在错误风险
any获取属性或方法时无提示
*/
const obj:object = {
  name: 'hello'
}
// console.log(obj.)  // 没有提示

// --------------- 泛型函数 以及泛型函数重载 ---------------
// @ts-ignore
function quick_sort(array = []) {
  const length = array.length;
  if(length === 0) return []
  const middleIndex = Math.floor(length / 2)
  const [middleValue] = array.splice(middleIndex, 1)
  // @ts-ignore
  const left = [], right = [];
  for(const item of array) {
    if(item < middleValue) {
      left.push(item)
    }else{
      right.push(item)
    }
  }
// @ts-ignore
  return quick_sort(left).concat(middleValue, quick_sort(right))
}
// @ts-ignore
console.log(quick_sort([1, 3, 2, 12, 5, 9]))  // [ 1, 2, 3, 5, 9, 12 ]

//  --------- 通过泛型 改写 ---------
function quickSort<T>(array: T[]): T[] {
  const length = array.length;
  if(length === 0) return []
  const middleIndex:number = Math.floor(length / 2)
  const [middleValue] = array.splice(middleIndex, 1)
  const left:T[] = [], right:T[] = []
  for(const item of array) {
    if(item < middleValue) {
      left.push(item)
    } else {
      right.push(item)
    }
  }
  return quickSort(left).concat(middleValue, quickSort(right))
}

console.log('number sort:', quickSort<number>([3, 5, 1, 2, 7, 10, 23, 16, 19]))
/*
[ 1,  2,  3,  5, 7, 10, 16, 19, 23 ]
*/
console.log('string sort:', quickSort<string>(['a', 'c', 'd', 'e', 'f', 'w', 'g', 'l']))
/*
['a', 'c', 'd', 'e', 'f', 'g', 'l', 'w']
*/
// -------- 中文排序 --------
function chineseSort<T>(array: T []): T[] {
  return array.sort((a, b) => (a as any).localeCompare(b, 'zh-CN'))
}
console.log('chinese sort:', chineseSort<string>(['武汉', '郑州', '太原', '济南', '沈阳', '大连']))
// [ '大连', '济南', '沈阳', '太原', '武汉', '郑州' ]

// ------- 字符串自拍续 --------
function stringSort(str: string): string {
  return quickSort(str.split('')).join('')
}
console.log(stringSort('cdadewsxm')) // acddemswx

function sort(data: string): string
function sort<T>(data:T[] ): T[]
function sort<T>(data: T[] | string) : any {
  if(typeof data === 'string') {
    return stringSort(data)
  }
  return quickSort(data)
}

const sort_string = sort('dfcdae')
const sort_array_number = sort([1,3,4,2,5])
const sort_array_string = sort(['e', 'd', 'a', 'c', 'f', 'b'])
console.log(sort_string, sort_array_number, sort_array_string)
/*
acddef [ 1, 2, 3, 4, 5 ] [ 'a', 'b', 'c', 'd', 'e', 'f' ]
*/

export {

}

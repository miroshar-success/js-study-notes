// ---------- 泛型 -------------
const identity_fn = <T>(arg:T): T => arg
const number_result = identity_fn<number>(123)
const string_result = identity_fn<string>('123')
const boolean_result = identity_fn<boolean>(false)

// --------- 类型参数默认类型 ------------
const get_data_type = <T = boolean>(arg: T): T => arg
console.log(get_data_type<string>('123'))
console.log(get_data_type<number>(1234))
console.log(get_data_type<boolean>(true))

// --------- 可选参数类型 ----------
const optional_data_type = <T, U = boolean>(a:T, b: U) => {
  if (b) {
    console.log(a, b)
  } else {
    console.log(a)
  }
}
console.log(optional_data_type<number>(123, false))
console.log(optional_data_type<string, number>('2', 123))

// -------- 泛型约束 ------------
interface PhoneProps {
  brand: string
  name: string
  price: number
}

const log_phone = <T extends PhoneProps>(arg: T):void => {
  console.log(`${arg.name} - price: ${arg.brand}`)
}
console.log(log_phone({
  brand: '苹果',
  name: 'iPhone 13',
  price: 5999
}))

console.log(log_phone({
  brand: '华为',
  name: 'Mate 40',
  price: 6999
}))

const only_accept_boolean = <T extends boolean>(arg: T) => {
  console.log(arg)
}
console.log(only_accept_boolean(false)) // false
console.log(only_accept_boolean(true))  // true

// -------- demo ---------
const print_value = <T>(arg: T) => {
  console.log(arg)
}
print_value<string>('123')
print_value<number>(123)

const print_array = <T, U>(a: T, b: U):[T, U] => {
  return [a, b]
}
console.log(print_array<string,boolean>('1', false))
console.log(print_array<number, string>(1, '2'))


const f3 = <T, U>(a: T[], f:(x: T) => U): U[] => {
  return a.map(f)
}
console.log(f3<number, boolean>([0, 1, 2], n => !!n)) // [false, true, true]
console.log(f3<string, number>(['1', '2', '3'], n => Number(n)))  // [1, 2, 3]
console.log(f3<number, string>([20, 22, 23], n => n.toString()))


// --------- 泛型类 ---------
type Nullable<T> = T | undefined | null

type NullValue = Nullable<null>
type UndefinedValue = Nullable<undefined>
type EmptyStringValue = Nullable<string>

type Container<T> = { value: T }
const container_number: Container<number> = { value: 123 }
const container_string: Container<string> = { value: '123' }
const container_boolean: Container<boolean> = { value: false }

type TreeNode<T> = {
  value: T
  left: TreeNode<T> | null
  right: TreeNode<T> | null
}

const tree_node_container: TreeNode<number> = {
  value: 123,
  left: {
    value: 456,
    left: null,
    right: null
  },
  right: {
    value: 789,
    left: null,
    right: null
  }
}

// ---------- 泛型类 ------------
class ContainerClass<T> {
  constructor(public name: T) {
    this.name = name
  }
}
console.log(new ContainerClass<string>('kyrie'))  // { name: 'kyrie' }
console.log(new ContainerClass<number>(123))      // { name: 123 }

console.log((123).toString()) // '123'
console.log(({name: 'hello'}).toString()) // [object Object]
console.log(Object.prototype.toString.call(123))  // [object Number]
console.log(Object.prototype.toString.call('123'))  // [object String]
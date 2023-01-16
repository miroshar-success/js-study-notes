// ------------ object -------------
let obj: Object
obj = {
  firstName: 'lebron',
  lastName: 'james'
}
obj = '123'
obj = true
obj = 123
// 原始值也可以赋值给object类型 (除了undefined 和 null)


// ----------- object类型 --------------
const player: object = {
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30
}
// console.log(player.firstName)
// player.age = 30
/**
 * object类型的关注点在于类型的分类, 关注点不是该对象类型具体包含了哪些属性。
*/
console.log(player.toString())
console.log(player.hasOwnProperty('age'))


const singer: Object = {
  firstName: 'jay',
  lastName: 'chou'
}
/* let complex_value: object
complex_value = 123
complex_value = '123'
complex_value = true
complex_value = Symbol.for('hello')
complex_value = undefined */


Object.create(null)
Object.create(Object.prototype)

// 1. 属性签名
/**
 * {
 *   PropertyName: Type
 * }
*/
const property_a: 'a' = 'a'
const property_b: 0 = 0
const property_c: unique symbol = Symbol.for('hello')
const computed_property_object: {
  [property_a]: string
  [property_b]: boolean
  [property_c]: number
} = {
  a: '123',
  0: false,
  [property_c]: 123
}

// 只定义属性吗
// x 和 y 都是any类型
// const has_no_type_object: {x; y} = {x: '123', y: '456'}

// ------------- 可选属性 ------------
type OptionalType = {
  x: number
  y: number
  z?: number
}
const point: OptionalType = {
  x: 1,
  y: 2
}
const point_1: OptionalType = {
  x: 1,
  y: 2,
  z: undefined
}

// 在strictNullChecks 下 null和undefined是区别对待的
const point_2: OptionalType = {
  x: 2,
  y: 3,
  // z: null
}

// --------- 只读属性 ---------
const readonly_object: { readonly x: number; readonly y: number} = { x: 0, y: 0}
// readonly_object.x = 100
// readonly_object.y = 100

// ---------- 空对象类型字面量 ----------
const empty_object: {} = { x: 0, y: 0}
console.log(empty_object.hasOwnProperty('x'))

// -------- 检查多余属性 ----------
// const point_3: {x: number; y: number} = { x: 1, y: 2, z: 3}

const p0: {x: number} = {x: 0, y: 0} as { x: number }
const p1: {x: number} = {x: 0, y: 0} as { x: number; y: number}

const point_additional_props: {
  x: number;
  [property: string]: number
} = { x: 1, y: 2 }
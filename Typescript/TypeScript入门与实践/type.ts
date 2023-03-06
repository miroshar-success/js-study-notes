// --------------- 类型别名 ----------------
type TypePoint = { x: number; y: number }
type BooleanType = true | false
type StringType = string
type Numeric = number | bigint
type StringOrNumber = Numeric | StringType

// ----------- 递归的类型别名 -------------
// 接口类型, 对象类型字面量, 函数类型字面量, 构造函数类型字面量
type T0 = Array<T0>
type T1 = () => T1
type T2 = new () => T2
type T3 = { name: T3 }

type T4 = T4[]
type T5 = [number, T5]

interface InterfaceA<T> {
  name: T
}
class ClassB<T> {
  name: T | undefined
}

type Json = string | number | boolean | null | {
  [property: string]: Json
} | Json[]

const json_data: Json = {
  name: 'TypeScript',
  version: { major: 3 }
}

// ----------- 类型别名与接口 --------------
// 1. 类型别名能够表示非对象类型, 而接口只能表示对象类型
type NumberOrString = number | string
const number_or_string_1: NumberOrString = 123
const number_or_string_2: NumberOrString = '123'

// 2. 接口可以继承其他的接口, 类等对象类型, 而类型别名则不支持继承。
interface ShapeInterface {
  name: string
}
interface CircleShape extends ShapeInterface {
  radius: number
}

type ShapeType = { name: string }
type CircleShapeType = ShapeType & { radius: number }

function get_shape_area (circle: CircleShape): number {
  return Math.PI * Math.pow(circle.radius, 2)
}
console.log(get_shape_area({ name: 'circle', radius: 10 }))
console.log(get_shape_area({ name: 'a', radius: 20 }))


// 3. 接口具有声明合并的行为
interface InterfaceNumberString {
  x: number
}
interface InterfaceNumberString {
  y: string
}
const interface_x_y: InterfaceNumberString = {
  x: 123,
  y: '123'
}


// ---------- 使用外部声明 -------------
// book.is_published = false

const p1: Drawing.Point = { x: 1, y: 2, z: 3 }

export {
  
}
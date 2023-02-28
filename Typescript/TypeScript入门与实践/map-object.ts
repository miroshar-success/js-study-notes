// 映射对象
type ObjectKeyType = 'x' | 'y'
type NumberType = number

type MappedObjectType = { readonly [key in ObjectKeyType]?: NumberType }

const map_object: MappedObjectType = {
  x: 1,
  y: 2
}

// ------------ { [P in K]: T }
// 类型K 必须能够赋值给联合类型 string | number | symbol

type MapBooleanObjectType = { [key in 'x']: boolean }
type MapNumberObjectType = { [key in 9]: number }

const symbol: unique symbol = Symbol.for('hello')
type MapSymbolObjectType = { [key in typeof symbol]: boolean }

type MappedNumberKeyType = { [key in number]: string }
type MappedStringKeyType = { [key in string]: boolean }

// ----------- 应用 ----------
type TType = { a: string; b: number }
type MType = { [P in keyof TType]: boolean }
type MInterface = { [P in keyof TType]: TType[P] }

type MOptionalInterface = { [P in keyof TType]?: TType[P] }
// -------- 将类型变为可选 ----------
type OptionalMType = Partial<TType>
type ReadonlyMType = Readonly<TType>


// --------------- 同态映射类型 -----------------
type ReadOptionType = { a?: string; readonly b: number }
type HMOT = { [P in keyof ReadOptionType ]: ReadOptionType[P] }
/*
{
  a?: string | undefined
  readonly b: number
}
*/
// --------- 非同态 -----------
type MOTKey = keyof ReadOptionType
type MOT = { [P in MOTKey]: ReadOptionType[P] }

const mot_object: MOT = {
  a: '1',
  b: 2
}

type MapPlayer = {
  firstName: string
  lastName?: string
  readonly age: number
}

// ------------ 同时继承源对象的属性修饰符 ------------
type PickType<T, K extends keyof T> = {
  [P in K]: T[P]
}
type PickPlayerTypeLastName = PickType<MapPlayer, 'lastName'>
type PickPlayerTypeAge = PickType<MapPlayer, 'age'>

type SomeOfPlayer = Pick<MapPlayer, 'age' | 'firstName'>

// --------------- 添加/移除修饰符 ---------------------

type OptionalPhoneProps = {
  name?: string
  price?: number
  color?: string
}
type RequiedPhoneProps = Required<OptionalPhoneProps>

type MyRequiredType<T> = {
  [P in keyof T]-?: T[P]
}
type MyRequiredPhoneProps = MyRequiredType<OptionalPhoneProps>
const phone_props_1: MyRequiredPhoneProps = {
  color: 'black',
  price: 2999,
  name: 'iPhone'
}

const phone_props_2: RequiedPhoneProps = {
  color: 'pink',
  price: 3999,
  name: 'watch'
}

type ReadonlyPhoneProps<T> = {
  + readonly [P in keyof T]: T[P]
}
type RequiredPhone = ReadonlyPhoneProps<MyRequiredPhoneProps>


// ------------ 同态映射对象类型深入 --------------
type HmotType<T, X> = { [P in keyof T]: X }
type MotKey = string
type HmotChildType = HmotType<MotKey, boolean>  // string 与boolean无关

// 联合动态映射对象
type UnionHmotKey = { a: string } | { b: number }
type HmotUnionChildType = HmotType<UnionHmotKey, boolean>

const union_hmot_obj: HmotUnionChildType = { a: true, b: false }

// 数组
type ArrayKey = number[]
type HMOTArray = HmotType<ArrayKey, string> // string[]

type ReadonlyArrayKey = readonly string[]
type ReadonlyHMOTArray = HmotType<ReadonlyArrayKey, number> // readonly number[]

type ArrayHMOT<T> = {[P in keyof T]: T[P]}
type ReadonlyNumberArray = ArrayHMOT<readonly number[]>
type ReadonlyStringArray = ArrayHMOT<readonly string[]>


// ------ 元祖 -------
type TupleHMOTType = ArrayHMOT<[number, string]>

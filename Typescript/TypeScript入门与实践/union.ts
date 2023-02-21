// ------------------ 联合类型 -------------------
type NumbericType = number | string | number[]

const union_number:NumbericType = 1223
const union_string: NumbericType = '123'
const union_array: NumbericType = [1, 2, 3]
// const union_object: NumbericType = ['1']

// --------- 联合类型的类型成员 -----------
interface CircleUnionType {
  area: number
  radius: number
}

interface RectangleUnionType {
  width: number
  height: number
  area: number
}
type ShapeUnionType = CircleUnionType | RectangleUnionType

const circle_object: ShapeUnionType = {
  area: 123,
  radius: 1
}
declare const circle_obj: ShapeUnionType
// console.log(circle_obj.area)

interface ApplePhoneProps {
  price: string
  color: string
}

interface HuaWeiProps {
  price: number
  color: string
}
declare const phone_props: ApplePhoneProps | HuaWeiProps
console.log(phone_props.price)

// ------------ 所用签名 -----------
interface Type0 {
  [prop: string]: number
}
interface Type1 {
  [prop: string]: string
}
type Type01 = Type0 | Type1


interface TypeNumber0 {
  [prop: number]: number
}
interface TypeNumber1 {
  [prop: number]: string
}

type TypeNumber = TypeNumber0 | TypeNumber1

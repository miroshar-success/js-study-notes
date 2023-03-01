// --------- Partial ------------
type PlayerProps = {
  firsrName: string
  lastName: string
  age: number
}
type PlayerOptionalProps = Partial<PlayerProps>
/**
 * {
 *  firstName?: string
 *  lastName?: string
 *  age?: number
 * }
*/

// ----------- required ------------
type PhoneProps = {
  price?: number
  color?: string
}
type RequiredPhoneProps = Required<PhoneProps>
/**
 * {
*    price: number
*    color: string
 * }
*/

// --------- Readonly ----------
type Point = {
  x: number
  y: number
}
type ReadonlyPointProps = Readonly<Point>
/**
 * {
 *    readonly x: number
 *    readonly y: number
 * }
*/

type K = 'x' | 'y' | 'z'
type T = 'number'
type R = Record<K, T>
/**
 * {
*    x: number,
*    y: number,
*    z: number
 * }
*/

// --------- pick ---------
type BookProps = {
  name: string
  price: number
  color: string
  author: string
}
type BookAuthorType = Pick<BookProps, 'author'>
type BookPriceType = Pick<BookProps, 'price'>

// ----------- omit ----------
type OmitAuthorType = Omit<BookProps, 'author'>
type OmitPriceType = Omit<BookProps, 'price'>

// ----------- exclude -------------
type T0 = Exclude<'a' | 'b' | 'c' | 'd', 'a'> // b c d
type T1 = Exclude<'a' | 'b', 'b' | 'c'> // a

type T2 = Extract<'a' | 'b', 'b'> // b
type T3 = Extract<'a' | 'b', 'b' | 'c'> // b

// ----------------- parameters ---------------
const sum = (a: number, b: number): number => a + b
type SumArgType = Parameters<(a: number, b: number) => number>  // [number, number]

type T4 = Parameters<(a: string, b: number) => void>  // [a: string, b: number]

// --------- ConstructorParameters ------------
class Circle {
  constructor(public radius: number) {
    this.radius = radius
  }
}
type ConstructorParameterType = ConstructorParameters<new (a: number) => object>
type CircleParameterType = ConstructorParameters<typeof Circle> // [number]
// [number]
type CircleResultType = InstanceType<typeof Circle>   // Circle

// ----------------- ReturnType ---------------
// 获取函数的返回值类型
type FunctionType = ReturnType<(a: number, b: number) => number>  // number

const increment = (a: string, b: number) => `${a}-${b}`
type IncrementType = ReturnType<typeof increment> // string

//--------------- 类型查询 ---------------
const players = [
  {
    firstName: 'kyrie',
    lastName: 'irving',
    age: 32
  }
]
type PlayerListProps = typeof players

const a = {
  value: 234
}
type ObjectType = typeof a  // { value: number }
type ObjectValueType = typeof a.value // number

export {

}
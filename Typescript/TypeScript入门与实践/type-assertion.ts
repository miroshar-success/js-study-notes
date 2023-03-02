// ---------------- 类型断言 -----------------
const element = document.querySelector('.username')
if (element) {
  // console.log(element.value)
  console.log((<HTMLInputElement>element).value)
  console.log((element as HTMLInputElement).value)
}


// ------------ 类型断言的约束 ------------
// y允许将一个类型 转换为更加精确 或者 更加宽泛的类型

interface Point2d {
  x: number;
  y: number;
}

interface Point3d {
  x: number;
  y: number;
  z: number
}
const point2d: Point2d = {
  x: 0,
  y: 1
}
const point3d: Point3d = {
  x: 0,
  y: 1,
  z: 3
}

const p0 = point2d as Point3d
console.log(p0.z)

const p1 = point3d as Point2d
console.log(p1.x, p1.y)

// ------------- const ---------------
/**
 * boolean 字面量
 * string 字面量
 * number 字面量
 * bigint 字面量
 * 枚举成员字面量
 * 数组字面量
 * 对象字面量
*/
let a1 = true           // boolean
let a2 = true as const  // true

const s1 = 'hello world'  // string
const s2 = 'hello world' as const // 'hello world'

const n1 = 123      // 123
const n2 = 123 as const // 123

const bigint_1 = 123456n  // 123456n
const bigint_2 = 123n as const  // 123n

const arr1 = [1, 2, 3]  // number[]
const arr2 = [1, 2] as const  // readonly [1, 2]

const player = { firstName: 'kyrie', lastName: 'irving' }
// { firstName: string; lastName: string}
const player_2 = { firstName: 'kyrie', lastName: 'irving' } as const
/***
 * {
 *  readonly firstName: 'kyrie',
 *  readonly lastName: 'irving'
 * }
*/
const enum Direction {
  Left,
  Right
}

const left = Direction.Left
const right = Direction.Right as const

const sum = (a: number, b: number) => a + b
const numbers = [1, 2] as const
console.log(sum(...numbers))

// ---------------- !类型断言 ----------------
let player_age: number = 0
const ages = [20, 23, 25, 30, 17]
const find_age = ages.find(item => item === 30)

player_age = find_age!
export {
}
// 枚举
enum Season {
  Spring,
  Summer,
  Fall,
  Winter
}

// 1 ------------- 数值类型枚举 ------------
enum DirectionEnum {
  Up,
  Down,
  Left,
  Right
}
const direction_up: DirectionEnum = DirectionEnum.Up
const direction_down: DirectionEnum = DirectionEnum.Down
const direction_left: DirectionEnum = DirectionEnum.Left
const direction_right: DirectionEnum = DirectionEnum.Right

enum SeasonEnum {
  Spring = 10,
  Summer,
  Fall = 20,
  Winter
}
const season_spring: SeasonEnum = SeasonEnum.Spring
const season_summer: SeasonEnum = SeasonEnum.Summer
const season_fall: SeasonEnum = SeasonEnum.Fall
const season_winter: SeasonEnum = SeasonEnum.Winter

const season_number: number = SeasonEnum.Spring


// 2 -------------- 字符串类型枚举 -----------------
enum Size {
  large = 'LARGE',
  default = 'DEFAULT',
  small = 'SMALL'
}
const size_large: Size = Size.large
const size_default: Size = Size.default
const size_small: Size = Size.small

const size_string: string = Size.default


// 3 --------------- 异构型枚举 --------------
enum ColorEnum {
  black = 0,
  white = 'WHITE',
  red = 2
}

const color_black: ColorEnum = ColorEnum.black
const color_white: ColorEnum = ColorEnum.white
const color_red: ColorEnum = ColorEnum.red


// ---------------- 枚举成员映射 ---------------
enum BooleanEnum {
  False = 0,
  True = 1
}
console.log(BooleanEnum.False, BooleanEnum.True)

const boolean_false: string = BooleanEnum[BooleanEnum.False]
const boolean_true: string = BooleanEnum[BooleanEnum.True]


// ----------- 常量枚举和计算枚举成员 ------------------
enum ConstEnum {
  Foo,
  Bar,
  Baz
}
// 报错
/* enum ConstNumberEnum {
  Foo = 'Foo',
  Bar
} */

enum Foo {
  a = (1 + 1) / 2,
  b = 2,
  c = 3,
  d = 'abc'.length,
  e = Math.pow(2, 3)
}

enum PositionEnum {
  Left,
  Right,
  Top,
  Bottom,
  None
}

const move = (direction: PositionEnum):void => {
  switch (direction) {
    case PositionEnum.Left:
      console.log('left')
      break
    case PositionEnum.Right:
      console.log('right')
      break
    case PositionEnum.Top:
      console.log('top')
      break
    case PositionEnum.Bottom:
      console.log('bottom')
      break
    default:
      console.log('none')
      break
  }
}

// -------------- 联合枚举类型 ---------------
enum ColorEnum {
  Red = 'RED',
  Blue = 'Blue',
  Green = 'Green'
}
const color_green: ColorEnum.Green = ColorEnum.Green
const color_blue: ColorEnum = ColorEnum.Blue
const colour_red: ColorEnum.Red = ColorEnum.Red

type ColorUnionType = ColorEnum.Red | ColorEnum.Blue | ColorEnum.Green


enum FooEnum {
  A = 'A',
  B = 'B'
}
enum BarEnum {
  A = 'A'
}
enum BazEnum {
  B = 'B',
  C = 'C'
}
const say = (x: 'A' | 'B'):void => {
  console.log(x)
}
const say_parent = (foo: FooEnum, bar: BarEnum, baz: BazEnum) => {
  say(foo)
  say(bar)
  // say(baz) 
}


// -------------------- 字面量类型 -----------------------
type BooleanAlias = true | false
const true_value: BooleanAlias = true
const false_value: BooleanAlias = false

const string_value: 'hello' = 'hello'
const world_value: 'world' = 'world'

const number_value: 0b1 = 1
const binary_number_value: 0b0 = 0
const hex_number_value: 0xf = 15
const otc_number_value: 0o7 = 7

const big_number: 10n = 10n
const big_number_value: bigint = 20n


// ---------------- 单元类型 ----------------
const single_undefined: undefined = undefined
const single_null: null = null
const single_symbol: unique symbol = Symbol.for('hello')
const single_string: 'hello world' = 'hello world'
const single_color: ColorEnum.Blue | ColorEnum.Green | ColorEnum.Red = ColorEnum.Blue


// --------------- 顶端类型 ---------------
let any_value: any
any_value = 123
any_value = '123'
any_value = true
any_value = 9999n
any_value = null
any_value = undefined
any_value = Symbol.for('world')
any_value = []
any_value = {}


let unknown_value: unknown
unknown_value = true
unknown_value = 123
unknown_value = '123'
unknown_value = null
unknown_value = undefined
unknown_value = Symbol.for('你好')
unknown_value = []
unknown_value = {}


// ---------------- 尾端类型 -------------------
const never_fn = ():never => {throw new Error('hello')}

let never_value: never

/* const n_a: string = never_value
const n_b: boolean = never_value
const n_c: number = never_value
const n_d: null = never_value
const n_u: undefined = never_value
const n_any: any = never_value */


type MyExclude<T, U> = T extends U ? never : T
type FilterType = MyExclude<boolean | string, string>

const get_string_length = (message: string) => {
  if (typeof message === 'string') {
    console.log(message.length)
  } else {
    console.log(message) // never
  }
}
// ------------ 条件类型 ---------------
// T extends U ? X : Y

type Type0 = true extends boolean ? number : string     // number
type Type1 = boolean extends string ? boolean : number  // number

type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends null
  ? 'null'
  : T extends Function
  ? 'function'
  : 'object'

type TypeString = TypeName<'a'>
type TypeBoolean = TypeName<true>
type TypeNumber = TypeName<123>
type TypeNull = TypeName<null>
type TypeUndefined = TypeName<undefined>

// ----------------- 过滤联合类型 --------------------
type ExcludeType<T, U> = T extends U ? never : T

type FilterUnionType = ExcludeType<string | number, number | boolean>
// string extends number | boolean ? never : string
// number extends number | boolean ? never : number
// string | never     (string)

type NonNullable<T> = T extends null | undefined ? never : T
type FilterUndefined = NonNullable<string | null | undefined> // string
type FilterNull = NonNullable<number | null | undefined>      // number

type FilterNumberType = ExcludeType<string | number, number>  // string
type FilterStringType = ExcludeType<string | number, string>  // number

type ExtractType<T, U> = T extends U ? T : never
type ExtractNumberType = ExtractType<string | number, number> // number
type ExtractStringType = ExtractType<string | number, string> // string
type ExtractUnionType = ExtractType<string | number, number | boolean>  // number

// infer关键字
// 在extends 语句中类型U的位置上允许使用infer关键字来定义可推断的类型变量。 可推断的类型变量只允许在条件类型的true分支中引用
// T extends U ? infer U : Y

type CT<T> = T extends Array<infer U> ? U[] : never
type InferNumberArray = CT<number[]>  // number[]
type InferStringArray = CT<string[]>  // string[]

type InterType<T> = T extends { a: infer U, b: infer U} ? U : never
type InferUnionType = InterType<{a: string; b: number}> // string | number

export {

}
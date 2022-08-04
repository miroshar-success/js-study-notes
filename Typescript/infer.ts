type InferArray<T> = T extends (infer U)[] ? U : never;

type T0 = InferArray<[number, string]>  // number | string
type T1 = InferArray<string[]>          // string
type T2 = InferArray<number[]>          // number

//  获取第一个元素类型
type InferFirst<T extends any[]> = T extends [infer P, ...infer _] ? P : never
type PlayerFirst = InferFirst<['kyrie', 'irving', 'lebron', 'james']>


type InferLast<T extends any[]> = T extends [...infer _, infer Last] ? Last : never;
type PlayerLast = InferLast<['kevin', 'durant']>


// 函数参数类型
type InferParams<T extends Function> = T extends (...args: infer A) => void ? A : never;

function get_sum (a: number, b: string): string {
  return a + b
}
type FunctionParams = InferParams<(a: number, b: string) => void>
type SumType = ReturnType<typeof get_sum> // string


// ----- 推断promise ----
type InferPromise<T> = T extends Promise<infer U> ? U : never
type Infer1 = InferPromise<Promise<string>>
type Infer2 = InferPromise<Promise<number>>


//  -------- demo ---------
class Subject {
  constructor(public subject_name: string, public subject_number: number) {
    this.subject_name = subject_name
    this.subject_number = subject_number
  }
}
const chinese = new Subject('chinese', 120)
const math = new Subject('math', 150)
const english = new Subject('english', 120)

type InferSubject<T> = T extends (infer U) ? U : never

type ChineseType = InferSubject<typeof chinese>
type MathType = typeof math


class Player {
  private firstName: string
  private lastName: string
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get fullName() {
    return this.firstName + this.lastName
  }
  say() {
    console.log('hello')
  }
}

type PlayerType = ConstructorType<Player>

type ConstructorParametersType<T> = T extends new (...args: infer P) => any ? P : never
type ConstructorType<T> = new (...args: any[]) => T

type PlayerParametersType = ConstructorParametersType<typeof Player>  // [firstName: string, lastName: string]
type PlayerObjectType = ConstructorType<typeof Player>


type IDs = number[]
type Names = string[]

type Unpacked<T> = T extends Names ? string : (T extends IDs ? number : T)
type IdType = Unpacked<IDs>
type NameType = Unpacked<Names>

// 使用infer改写
type ElementOf<T> = T extends Array<infer E> ? E : T
type TupleToString = ElementOf<Names>  // string
type TupleToNumber = ElementOf<IDs>    // number


type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
type T5 = Foo<{a: string; b: number}>


export {

}

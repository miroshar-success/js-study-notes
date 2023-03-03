const a: any = true
const b: any = undefined
const c: any = null
const d: any = 123
const e: any = '123'
const f: any = {}

const a1: unknown = 1

let x: any
const a2: boolean = x
const b2: string = x
const c2: null = x
const d2: undefined = x
const e2: object = x
const f2: number[] = x

// const a3: string = a1

let b1: unknown
b1 = 123
b1 = undefined
b1 = null
b1 = '123'
b1 = false

// ----------- 类型推断 -----------
let m = 0 // number
const n = 0 // 0

class Animal {
}
class Dog extends Animal {
}
class Cat extends Animal {
}
const array = [new Animal(), new Dog(), new Cat()]  // Animal []
const animals = [new Dog(), new Cat()]  // (Dog|Cat)[]

// ----------- 数组为可放宽类型 ---------------
const foo = [0] // number[]

const players = ['kyrie', 'irving', 30] // (string|number)[]

export {

}
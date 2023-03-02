// ---------------- 类型守卫 ---------------
// 1. typeof
const get_number = (x: number[] | undefined | null) => {
  if (typeof x === 'object') {
    console.log('object-x', x)
  } else {
    console.log(x)
  }
}

// 2 instanceof
const f = (object: Date | RegExp) => {
  if (object instanceof Date) {
    console.log(object) // Date
  } else {
    console.log(object) //RegExp
  }
}

// 3 in 类型守卫
interface A {
  x: number
}
interface B {
  y: string
}

const log = (x: A | B) => {
  if ('x' in x) {
    console.log(x); // A
  } else {
    console.log(x)  // B
  }
}

// &&
const m = (x: number | undefined | null) => {
  if (x !== undefined && x !== null) {
    console.log(x)  // number
  } else {
    console.log(x)
  }
}

// ||
const g = (x: number | undefined | null) => {
  if (x === undefined || x === null) {
    console.log(x)  // undefined / null
  } else {
    console.log(x)  // undefined
  }
}


const f0 = (x: string | number, y: number | boolean) => {
  if (x === y) {
    console.log(x, y) // number number
  } else {

  }
}

// ------------ 自定义类型守卫函数 --------------
type TypeA = { a: string }
type TypeB = { b: string }

function isTypeA (x: TypeA | TypeB): x is TypeA {
  return (x as TypeA).a !== undefined
}
function isTypeB (x: TypeB | TypeA): x is TypeB {
  return (x as TypeB).b !== undefined
}

const n = (x: TypeA | TypeB) => {
  if (isTypeA(x)) {
    console.log(x)
  } else {
    console.log(x)
  }
}

// ------------- 可辨识联合类型 ---------------
interface Square {
  kind: 'suare',
  size: number
}
interface Circle {
  kind: 'circle',
  radius: number
}

const get_area = (x: Square | Circle) => {
  if (x.kind === 'circle') {
    console.log(x)  // Circle
    console.log(Math.PI * Math.pow(x.radius, 2))
  } else {
    console.log(x)  // Square
  }
}

// ---------- 判别式属性 -----------
interface C {
  kind: 0
  c: number
}
interface D {
  kind: 1;
  d: number
}

type T = C | D
function print (x: T) {
  if (x.kind === 0) {
    console.log(x)  // C
  } else {
    console.log(x)  // D
  }
}

// ------------ 多个判别式属性 -----------
type M = {
  kind: true,
  type: 'A'
}
type N = {
  kind: false,
  type: 'B'
}
type MNType = M | N
const print_m_n = (x: MNType) => {
  if (x.kind === true) {
    console.log(x)  // M
  } else {
    console.log(x)  // N
  }
}

export {

}
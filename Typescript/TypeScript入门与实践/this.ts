// --------------- this -------------
// ----------- noImplicitThis -----------
function this_fn (this: { name: string }) {
  console.log(this.name)
}
// this_fn()


// --------------- 定义一个纯函数 不想让函数代码依赖于 this的值 ---------------
function this_void(this:void, x: number, y: number) {
  console.log(this)
  return x + y
}
console.log(this_void(1, 3))  // 4
console.log(this_void(3, 5))  // 8

interface A {
  f(x: boolean): string
}

interface B {
  f: { (x: boolean): string }
}

interface C {
  f: (x: boolean) => string
}

const object_1: A = {
  f: function(a) {
    return `hello ${a}`
  }
}

const object_2: B = {
  f: (a) => `Hello ${a}`
}

const object_3: C = {
  f: x => `Hello ${x}`
}

// ----------- 字符串索引签名 -------------
interface StringInterface {
  // 接口中所有属性的类型必须能够赋值给number类型
  [indexName: string]: number
  a: number
  b: 0 | 1
  c: 2
  // d: '1'
}

// ----------- 数值索引签名 -----------
interface NumberInterface {
  [indexName: number]: string
}
const color: NumberInterface = ['red', 'green', 'blue']

// ------------ 同时存在数值类型和字符串类型索引 ----------------
interface NumberStringInterface {
  [property: string]: string | boolean
  [property: number]: boolean
}
const number_string_object: NumberStringInterface = {
  'a': 'a',
  'b': true,
  'c': false,
  1: true
}
// 数值索引签名能够表示的属性集合是字符串索引签名能够表示的属性集合的子集


// ------------------ 可选属性与方法 -----------------
interface FooInterface {
  x: string
  f(): number
}
const _foo: FooInterface = {
  x: '123',
  f: () => 345
}

interface FooOptionalInterface {
  x?: string;
  f?(): number
}

const foo_x: FooOptionalInterface = {
  x: '345'
}
const foo_y: FooOptionalInterface = {
  f: () => 123
}


// ----------------- 只读属性 --------------
interface ReadonlyInterface {
  readonly x: string
  readonly y: boolean
}
const readonly_obj: ReadonlyInterface = {
  x: '123',
  y: false
}
// readonly_obj.x = '123'

// ---------- 同时存在只读和非只读 ----------
type ReadonlyWithNormalProperty = {
  x: string
  readonly [property: string]: string
}
const readonly_property_with_normal_property: ReadonlyWithNormalProperty = {
  x: '123',
  y: '456'
}
readonly_property_with_normal_property.x = '456'
// readonly_property_with_normal_property.y = '123' // 报错


// --------------- 接口的继承 -----------------
interface Shape {
  name: string
}
interface Style {
  color: string
}
interface Circle extends Shape, Style {
  radius: number
}

const white_circle:Circle = {
  name: 'circle',
  radius: 10,
  color: 'white'
}




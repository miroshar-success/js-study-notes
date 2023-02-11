class Singleton {
  private static instance?: Singleton
  private name: string
  constructor(name = 'hello') {
    this.name = name
  }
  static getInstance() {
    if (!Singleton.instance) Singleton.instance = new Singleton()
    return Singleton.instance
  }
}
console.log(Singleton.getInstance())

// -------------- 参数成员 ---------------
/**
 * 为形式参数添加一个可访问性修饰符 或者 readonly修饰符, 该形式参数就成了参数成员
*/
class ClassA {
  constructor(
    public x: number,
    protected y: number,
    private z: string,
    readonly m: boolean
  ) {}
}
const class_a = new ClassA(1, 2, '3', false)
console.log(class_a)

// ------------ 继承 ------------
class ColorClass {
  constructor(public color: string) {
    this.color = color
  }
  switch_color () {
    this.color = this.color === 'black' ? 'white' : 'black'
  }
}
class DerivedColorClass extends ColorClass {

}

const color_class_1 = new DerivedColorClass('white')
const color_class_2 = new DerivedColorClass('black')

color_class_1.switch_color()
color_class_2.switch_color()

console.log(color_class_1, color_class_2)
// { color: 'black' }     { color: 'white' }

function ColorBaseFunction(this: any) {
  this.colors = ['red', 'blue', 'red']
}
// @ts-ignore
const color_1 = new ColorBaseFunction()
// @ts-ignore
const color_2 = new ColorBaseFunction()
color_1.colors.pop()
console.log(color_1, color_2)

// -------------- 继承 -------------
class ShapeConstructor {
  public color: string = 'white'
  constructor() {
    console.log(this.color)
    this.color = 'black'
    console.log(this.color)
  }
}
class CircleShapeConstructor extends ShapeConstructor {
  radius: number = 1
  constructor() {
    super()
    console.log(this.radius)
    this.radius = 2
    console.log(this.radius)
  }
}
const circle_shape = new CircleShapeConstructor()
// white ---> black -----> 1 -----> 2

// ---------- 接口继承 -------------
interface InterfaceClassA {
  x: number
}
interface InterfaceClassB {
  y: number
}
interface InterfaceClassC extends InterfaceClassA, InterfaceClassB {
  z: string
}
const interface_class_c: InterfaceClassC = {
  x: 1,
  y: 2,
  z: '123'
}

interface ColorInterfaceA {
  color: string
}
interface ShapeInterfaceA {
  area(): number
}

class CircleConstructorA implements ColorInterfaceA, ShapeInterfaceA {
  constructor(public radius: number = 1, public color: string) {
    this.radius = radius
  }
  area() {
    return Math.PI * Math.pow(this.radius, 2)
  }
}

// ---------------- 静态属性 -----------------
class StaticClass {
  static version: string = '1.0'
}
console.log(StaticClass.version)  // 1.0
const static_class_object = new StaticClass()
console.log(static_class_object)  // {}

// --------- 抽象类 ------------
class CounterClass {
  private count: number = 0
  constructor(count: number) {
    this.count = count
  }
  increment (number: number): this {
    this.count += number
    return this
  }
  decrement (number: number): this {
    this.count -= number
    return this
  }
  get_count(): number {
    return this.count
  }
}

const counter_class = new CounterClass(0)
const a = counter_class.increment(7).increment(8).increment(8).increment(7).increment(9).increment(11).get_count()
console.log(a)
class Circle {
  public radius: number
  constructor(radius?: number) {
    this.radius = radius || 15
  }
}
// 类声明不会被提升, 应该先声明后使用
const c1 = new Circle(10)
const c2 = new Circle(20)
const c3 = new Circle()
console.log(c1, c2, c3)

//  ----------- strictPropertyInitialization --------------
class ClassPlayer {
  public name: string
  public age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}
const player_kyrie = new ClassPlayer('kyrie', 31)
const player_durant = new ClassPlayer('durant', 32)

class ClassSinger {
  public age: number = 30
  constructor(age: number) {
    this.age = age
  }
}

// ------------- 在方法里初始化 -----------
class InitFunctionClass {
  // 非空类型断言
  public age!: number
  constructor() {
    this.init()
  }
  init() {
    this.age = 20
  }
}

// -------------- readonly ----------------
/**
 * 只读成员变量必须在声明时初始化或者在构造函数里初始化
*/
class ReadonlyClass {
  readonly a = 0
  readonly b: number
  readonly c: number
  constructor() {
    this.b = 0
    this.c = 1
  }
}


class CircleClass {
  radius: number = 1
  constructor(radius: number) {
    this.radius = radius
  }
  area () : number {
    return Math.PI * this.radius * this.radius
  }
}
const circle_1 = new CircleClass(2)
const circle_2 = new CircleClass(3)
console.log(circle_1, circle_2)
console.log(circle_1.area(), circle_2.area())

// ---------------------- 存取器 ----------------------------
class GetSetClass {
  private _foo: number = 0
  get foo (): number {
    return this._foo
  }
  set foo(v: number) {
    this._foo = v
  }
}

const get_set_class1 = new GetSetClass()
console.log(get_set_class1.foo)   // 0
get_set_class1.foo = 234
console.log(get_set_class1.foo)   // 234



// --------------------成员可访问性 -------------------
// 1. public
class BaseClass {
  public a: string = 'hello world'
}
class Derived extends BaseClass {
  public get_a (): string {
    return this.a
  }
}
const derived = new Derived()
console.log(derived.a)
console.log(derived.get_a())

// 2. protected
// 允许在当前类的内部 或者 派生类的内部访问
class ProtectedClass {
  protected firstName: string
  protected lastName: string
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
  }
  fullName () {
    return `${this.firstName} - ${this.lastName}`
  }
}
const protected_player = new ProtectedClass('kyrie', 'irving')
console.log(protected_player.fullName())  // kyrie irving

// 3. private
class PrivateClass {
  private x: string = 'x'
  private y: string = 'y'
  get_x_y() {
    return `${this.x} - ${this.y}`
  }
}
const private_x_y = new PrivateClass()
console.log(private_x_y.get_x_y())  // x - y
// console.log(private_x_y)








class Greeter {
  greeting: string;
  constructor(message:string) {
    this.greeting = message;
  }
  greet() {
    return `Hello, ${this.greeting}`
  }
}


// ---------- 类继承 ---------
/* class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}`)
  }
}
class Dog extends Animal {
  bark() {
    console.log('Woof, Woof!')
  }
}
const dog = new Dog()
dog.bark() */


// ------------------------ 继承 --------------------------
class Animal {
  name:string
  constructor(name:string) {
    this.name = name
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m`);
  }
}

class Snake extends Animal {
  constructor(name:string) {
    super(name)
  }
  move(distanceInMeters = 5){
    super.move(distanceInMeters)
  }
}
class Horse extends Animal {
  constructor(name: string){
    super(name)
  }
  move(distanceInMeters = 45){
    super.move(distanceInMeters)
  }
}
const sam = new Snake('Sammy the Python')
const tom:Animal = new Horse('Tommy the Palomino')
sam.move()
tom.move(34)


// -------------- 公共,私有与受保护的修饰符 ------------
class Player {
  public name: string
  private age: number // 不能在类的外部访问
  public team: string
  public constructor(name:string){
    this.name = name;
    this.age = 30
    this.team = 'Nets'
  }
  public skill(s:string):void {
    console.log(`${this.name}‘s skill is ${s}`)
  }
}
const kyrie = new Player('kyrie')
kyrie.skill('crossover')


// --------------------- 比较private和protected ---------------
// protected 在派生类中仍然可以访问
class Person {
  protected name: string  // 只能在person及其子类中访问
  public age: number
  constructor(name: string, age:number = 40){
    this.name = name;
    this.age = age
  }
}
class Employee extends Person {
  private department: string  // 只能在Employee中访问
  constructor(name: string, department:string) {
    super(name, 40)
    this.department = department
  }
  public getElevatorPitch() {
    console.log(this.age)
    return `Hello, my name is ${this.name} and I work in ${this.department}`
  }
}

const howard = new Employee('howard', 'sale')

const person = new Person('kyrie', 20)


// --------------- readonly修饰符 -----------------
class Octopus {
  readonly name: string
  readonly numberOfLengths: number = 0;
  constructor(name:string) {
    this.name = name;
  }
}
const dad = new Octopus('Man with the 8 strong legs')



// --------------------- 存取器 --------------------
class Singer {
  fullName: string
}

const singer = new Singer()
singer.fullName = 'jay chou';
if(singer.fullName){
  console.log(singer.fullName)
}

// -------- 验证密码是否正确 ---------
/* const password = 'secret keyword';
class Game {
  private _fullName:string
  get fullName():string{
    return this._fullName
  }
  set fullName(value:string) {
    if(password && password === 'secret keyword'){
      this._fullName = value;
    }else{
      console.log('Error: Unauthorized update of Game!')
    }
  }
}
const game = new Game()
game.fullName = 'Bob Smith'; */


// ------------------- 静态属性 ------------------
class Grid {
  static origin = {x : 0, y: 0}
  calculateDistanceFromOrigin(point:{x:number, y:number}){
    const xDist = point.x - Grid.origin.x;
    const yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale:number){}
}
const grid1 = new Grid(1.0)
const grid2 = new Grid(5.0)
console.log(grid1.calculateDistanceFromOrigin({x:2,y:3}))
console.log(grid2.calculateDistanceFromOrigin({x:3,y:4}))


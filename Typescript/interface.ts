// --------------------- 接口 -------------------
interface LabelledValue{
  label:string
}
function printLabel(labeledObj:LabelledValue){
  console.log(labeledObj.label)
}


// ------- 可选属性 -----
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color:string; area:number}{
  const newSquare = {color:'white', area:100}
  if(config.color){
    newSquare.color = config.color;
  }
  if(config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare
}

createSquare({color:'red'})


// ------- 只读属性 ------
interface Point{
  readonly x: number
  readonly y: number
}
const p1:Point = {x:10, y:20}
console.log(p1.x)
// p1.x = 123   readonly

// ------- readonlyArray<T> --------- 数组创建后不能被改变
const _array:ReadonlyArray<number> = [1,2,3,4,5];
// _array[1] = 12


interface Player{
  firstName?:string
  lastName?:string
  [propName:string]: any
}

function getPlayerFullName(player:Player):string {
  return player.firstName + player.lastName
}

console.log(getPlayerFullName({firstName:'hello', lastName:'world'}))


//------- 函数 --------
interface SearchFunction {
  (source:string, substring:string):boolean;
}
const mySearchFunction:SearchFunction = (source:string, substring:string) => {
  const result = source.search(substring)
  return result > -1
}


// -------- 索引签名 --------
interface StringArray {
  [index:number]: string
}
const myArray = ['Bob', 'Fred', 'Kyrie', 'Lebron']
const bob:string = myArray[0]
/*
共支持两种类型索引签名: 字符串和数字, 但是数字类型的返回值必须是字符串索引返回值的子类型
*/

class Animal {
  name:string
}
class Dog extends Animal {
  breed: string
}

interface NotOkay {
  [x:number]: Dog;
  [y:string]: Animal
}

/* interface NotOkay1 { // 会报警告, x 应该是 y的子类型
  [x:number]: Animal;
  [y:string]: Dog
} */



// ---------- 实现接口 ---------
/* interface ClockInterface {
  currentTime: Date
  setTime(d:Date)
}

class Clock implements ClockInterface {
  currentTime: Date
  constructor(h:number, m:number){
  }
  setTime(d:Date){
    this.currentTime = d
  }
} */

// ------ 区分静态方法和实例方法 ---------
interface ClockConstructor {
  new (h:Number, minute:number): ClockInterface
}
interface ClockInterface {
  tick()
}

function createClock(ctor:ClockConstructor, hour:number, minute:number):ClockInterface{
  return new ctor(hour,minute)
}

class DigitalClock implements ClockInterface {
  constructor(h:number, m:number){}
  tick(){
    console.log('beep, beep')
  }
}
class AnalogClock implements ClockInterface{
  constructor(h:number, m:number){}
  tick() {
    console.log('tick tick')
  }
}

// ------- 继承接口 --------
interface Shape {
  color: string
}
interface Square extends Shape {
  sideLength: number
}
const square = <Square>{}
square.color = 'hello'
square.sideLength = 123;

// ---------- 继承多个接口 -------
interface PenStroke {
  penWidth: number
}
interface Block extends Shape, PenStroke {

}

// ----------------------------- 混合类型 -----------------------------

interface Counter {
  (start:number): string;
  interval:number;
  reset():void
}
function getCounter():Counter {
  const counter = <Counter>function(start:number) {}
  counter.interval = 123;
  counter.reset = () => {}
  return counter
}

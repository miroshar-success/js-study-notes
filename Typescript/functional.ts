const anys = []
anys.push(1)
anys.push('oh no')
anys.push({anything: 'goes'})


let o = {x: 'hello world', extra:1}
let o2: {x: string} = o


type One = {p: string}
interface Two {
  p: string;
}
class Three {
  p = 'hello'
}
let x:One = {p: 'hi'}
let two:Two = x
two = new Three()

// ---------------------------------------------------- Unions
function pad(s:string, n:number, direction:'left'|'right'):string {
  console.log(s,n,direction)
  return direction + s + n
}
pad('123',1,'left')
pad('123',1,'right')

let s: 'left' | 'right' = 'right'
pad('123',1, s)


// 
const str:string = 'I am a string'
console.log(str)

// const sym:symbol = Symbol('123')

// ------------------------------------------ Type aliases
type Size = [number,number]
let singer:Size = [100,100]

const CIRCLE:string = 'CIRCLE'
const SQUARE:string = 'SQUARE'
const TRIANGLE: string = 'TRIANGLE'

type Shape = 
| {kind: 'circle'; radius: number}
| {kind: 'square'; x: number}
| {kind: 'triangle'; x:number; y:number}

function getArea(s: Shape):number {
  if(s.kind === 'circle'){
    return Math.PI * Math.pow(s.radius,2)
  }else if (s.kind === 'square' ){
    return Math.pow(s.x, 2)
  }else {
    return (s.x * s.y) / 2
  }
}
getArea({kind:'circle',radius:2})


const obj1:object = {}
const obj2:object = []
const obj3:object = function(){}

const arr1: Array<string> = ['1','2'];
const arr2: number [] = [1,2,3]

// -------------------------- Type parameters
function liftArray<T>(t:T):Array<T> {
  return [t]
}


// --------------------- 枚举
enum PostStatus {
  Draft = 6,
  UnPublished,
  Published
}
console.log(PostStatus.Draft)


// --------------------------- readonly and const
const array:number[] = [1,2,3,4,5]
array.push(102)
array[0]

// ---- readonly
// interface Rx {
//   readonly x : number
// }
// let rx:Rx = {x : 1};
// rx.x

interface ReadOnlyInterface {
  readonly y: string;
}
let my_object:ReadOnlyInterface = {
  y: '123'
}
console.log(my_object.y)

let arr3:ReadonlyArray<number> = [1,2,3]
let arr4:readonly number[] = [1,2,3]
// arr3.push(123)  // error
// arr4.push(345)  // error

// -----------------------  类型断言
const numbers:number [] = [100,120,120,300]
const res = numbers.find(item => item > 0)
const number1 = res as number;


// ---------------------------- 接口
interface Post {
  title: string;
  content: string;
  subtitle?: string;
  readonly summary: string;
}
function getPostDetail(post:Post){
  console.log(post.title, post.content)
}


// ----------------------------------------- class
class Person {
  private name: string;
  public age: number;
  protected gender: boolean;
  constructor(name: string, age: number){
    this.name = name;
    this.age = age
    this.gender = true;
  }
  sayHi(msg: string): void{
    console.log('message:', msg)
  }
  sayHello():void{
    console.log(this.gender)
  }
  static create(name:string,age:number){
    return new Person(name,age)
  }
}

const tom = new Person('tom',20)
// console.log(tom.name)  // error
console.log(tom.age)
// console.log(tom.gender) // error
Person.create('kyrie',123)



// --------------------------------- 接口
interface Eat{
  eat(food:string): void
}
interface Run {
  run(distance:number): void
}

class Men implements Eat, Run{
  eat(food:string):void{
    console.log(food)
  }
  run(distance:number) {
    console.log(distance)
  }
}
class Animal implements Eat,Run {
  eat(food:string){
    console.log(food)
  }
  run(distance:number){
    console.log(distance)
  }
}


// -------------------------- 泛型 
function createNumberArray(length:number, value:number): number [] {
  const array = Array<number>(length).fill(value)
  return array
}
function createArray<T>(length:number, value:T): T[] {
  const array = Array<T>(length).fill(value)
  return array
}
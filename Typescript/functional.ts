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
// --------- basic ----------
const message:string = 'hello world'
const height: number = 30
const pi: number = 3.14
const flag: boolean = true

const ages:number[] = [10,20,30]
const players: string[] = ['kyrie', 'lebron', 'durant']

// using any disables all further type checking.
const object:any = {firstName: 'kyrie', lastName:'irving'}
console.log(object.firstName)
console.log(object.age)
object.say()

// noImplicitAny
/*
when you do not specify a type, and TypeScript can not infer it from context, the compiler will
typically default to any
*/

// function
/*
TypeScript allows you to specify the types of both the input and output values of functions.
*/
function greet(message: string) {
  return `Hello, ${message}`
}
greet('World')

function plus(a: number, b: number): number {
  return a + b
}
plus(1, 2)

// Anonymous function
const names = ['Alice', 'Bob', 'Eve'];
names.forEach(function(s) {
  console.log(s.toUpperCase())
})


// Object Types
function print(point: {x: number, y:number}) {
  console.log(point.x, point.y)
}
print({x:1, y:2})

// optional properties
function fullName(player: {firstName: string, lastName: string, age?: number}): string{
  console.log(player.age?.toString()) // modern javascript syntax
  // console.log(player.age.toString()) // Error
  if(player.age !== undefined) {
    player.age.toString()
  }
  return `${player.firstName} - ${player.lastName}`
}
fullName({
  firstName: 'kyrie',
  lastName: 'irving'
})



// --- union types -----
function printId(id: number | string) {
  console.log(id.toString())  // common methods
  // narrow
  if(typeof id === 'string') {
    console.log(id.toUpperCase())
  }else{
    console.log(id)
  }
}
printId(123)
printId('123')

/*
TypeScript will only allow an operation if it is valid for every member of the union.
For example, if you have the union string|number, you can not use methods that are only available
on string
*/

function welcomePeople(peoples: string[] | string) {
  if(Array.isArray(peoples)) {
    console.log(`Hello, ${peoples.join(' and ')}`)
  } else {
    console.log(`Hello, ${peoples}`)
  }
}

/*
Sometimes you will have a union where all the members have something in common. For example, both
arrays and string have a slice method. If every member in a union has a property in common, you can
use that property without narrowing
*/
function say(x: string[] | string) {
  return x.slice(0, 3)
}


//  ------------- Type Aliases  -------------
/*
It's common to want to use the same type more than once and refer to it by a single name
*/
type Players = {
  firstName: string;
  lastName: string;
}
function getFullName(p: Players) {
  console.log(p.firstName + '-' + p.lastName)
}

/*
You can actually use a type alias to give a name to any type at all, not just an object type
*/
type ID = number | string;

// ----------- interface -----------
/* An interface declaration is another way to name an object type */
interface People {
  name: string
  age: number
  sex: string
}
function introduce(p: People): void {
  console.log(`My name is ${p.name}, and I am ${p.age} years old`)
}
introduce({
  name: 'wade',
  age: 39,
  sex: 'male'
})


/*
The key distinction between Type aliases and interface is that a type cannot be re-opened to add
new properties vs an interface which is always extendable.
*/

interface Animal {
  name: string
}
interface Bear extends Animal {
  honey: boolean
}

type CellPhone = {
  name: string
}
type IPhone = CellPhone & {
  color: string
}

/*
A type cannot be changed after being created.
*/



// --------- Type Assertions ---------
/*
Sometimes you will have information about tye type of a value that TypeScript can not know about.
*/

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const input = <HTMLInputElement>document.getElementById('input')


// ---------- Literal Types ----------
let secret: 'hello' = 'hello'
secret = 'hello'
// secret = 'world' // Error

/*
By combining literals into unions, you can express a much more useful concept -- for example, functions that
only accept a certain set of known values.
*/
function compare(a: string, b: string): -1 | 0 | 1 {
  return a == b ? 0 : a > b ? 1 : -1
}


// ------------- literal interface --------------
function fetch(data: {
  url: string,
  method: 'GET' | 'POST'
}) {

}
const requestObject = {
  url: 'https://www.baidu.com/api/',
  method: 'GET'
} as const
fetch({
  url: requestObject.method,
  method: requestObject.method
})
/*
Argument of type 'string' is not assignable to parameter of type 'GET' | 'POST'
*/

/*
as const suffix acts like const but for the type system, ensuing that all properties are assigned the
literal type instead of a more general version like string or number
*/


// Non-null Assertion Operator
function m1(book?: string | null) {
  // book: string | undefined | null
  console.log(book?.toString())
  console.log(book!.toString())
}

const symbol: Symbol = Symbol.for('hello')
const s2: Symbol = Symbol('world')


const max_number: bigint = BigInt(1000000)


// ------ 联合类型和交叉类型 ------
type type1 = {
  firstName: string
  lastName: string
}
type type2 = {
  age: number
}

type PersonType = type1 & type2
const person:PersonType = {
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30
}

type UnionPersonType = type1 | type2
const union_person: UnionPersonType = {
  age: 32
}


export {

}

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

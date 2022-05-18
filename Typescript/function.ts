/**
 * we can use a type alias to name a function type
 *
 */
type GreetFunction = (a: string) => void
const greeter: GreetFunction = (message) => {
  console.log(message)
}
greeter('hello')


// --------- Call signatures ---------
type DescribableFunction = {
  description: string;  // 函数的属性
  (title:string) : string // 函数参数
}
const description: DescribableFunction = (message) => {
  return message
}
description.description = '你好'
console.log(description('Hello') + '-' + description.description) // Hello-你好


// -------- Generic Functions --------
function firstElement<Type>(array:Type[]): Type {
  return array[0]
}
console.log(firstElement<string>(['hello', 'world'])) // hello
console.log(firstElement<number>([1,2,3]))            // 1
console.log(firstElement<boolean>([false, true]))     // false


function map<I, U>(array: I[], func: (arg: I) => U): U[] {
  return array.map(func)
}
map(['1', '2', '3'], (n) => Number.parseInt(n, 10))



// ----------- 泛型约束 ----------
function longest<Type extends {length: number}>(a: Type, b: Type) {
  if(a.length >= b.length) {
    return a
  } else {
    return b
  }
}
console.log(longest([1,2], [3,4,5,6,7]))  // [ 3, 4, 5, 6, 7 ]
console.log(longest([1,2,3,4,5], [1, 2])) // [ 1, 2, 3, 4, 5 ]

// --------- constrained values -----------
function minimumLength<Type extends {length: number}>(obj: Type, minimum: number): Type {
  if(obj.length >= minimum) {
    return obj
  } else {
    return {
      ...obj,
      length: minimum
    }
  }
}

// ------- Specifying Type Arguments --------
function combine<Type>(arr1: Type[], arr2:Type[]): Type [] {
  return [...arr1, ...arr2]
}

function filter<T>(array: T[], func:(arg: T) => boolean): T[] {
  return array.filter(func)
}
console.log(filter<number>([1,2,3,4,5], (n) => n > 5))



// ------- Optional Parameters ----------
function calc(x?: number): void{
  console.log(x)
}

calc(1)         // 1
calc(undefined) // undefined
calc()          // undefined


// --------- optional parameters in callbacks ---------
function foreach(array: any[], callback:(arg: any, index: number) => void) {
  for(let i = 0, length = array.length; i < length; i++) {
    callback(array[i], i)
  }
}
foreach([1,2,3,4,5],(item) => {
  console.log(item) // 1 2 3 4 5
})
foreach(['kyrie', 'wade', 'lebron', 'durant'], player => {
  console.log(player) // kyrie wade lebron durant
})
/*
In JavaScript, if you call a function with more arguments than there are parameters, the extra arguments are
simply ignored, TypeScript the same way. Functions with fewer parameters can always take the place of functions
with more parameters
*/

/*
Some JavaScript functions can be called in a variety of argument counts and types.
*/
function date(timestamp: number): Date
function date(m: number, d: number, y: number): Date;
function date(timestamp: number, d?:number, y?:number): Date {
  if(d !== undefined && y !== undefined) {
    return new Date(timestamp, d, y)
  }
  return new Date(timestamp)
}
console.log(date(2022, 5, 17))
console.log(date(1652791785619))

/*
The signature of the implementation is not visible from the outside, when writing an overloaded function,
you should always have two or more signatures above the implementation of the function.
*/

function get_length(s: string): number
function get_length(array: number[]): number
function get_length(s:string | number[]): number {
  return s.length
}
console.log(get_length([1,2,3,4,5]))    // 5
console.log(get_length('hello world'))  // 11

// ------ 函数重载 ------
type MessageType = 'image' | 'audio' | 'text'
type Message = {
  title: string
  id: number
  type: MessageType
}
const messages: Message[] = [
  {
    id: 1,
    title: 'Vue.js',
    type: 'text'
  },
  {
    id: 2,
    title: 'React',
    type: 'image'
  },
  {
    id: 3,
    title: 'Redux',
    type: 'audio'
  },
  {
    id: 4,
    title: 'Vuex',
    type: 'text'
  },
  {
    id: 5,
    title: 'React-Redux',
    type: 'image'
  }
]
function get_message_list(id: number): Message []
function get_message_list(type: MessageType): Message[]

function get_message_list(type: number | MessageType):Message[] {
  if(typeof type === 'number') {
    const find = messages.find(m => m.id === type)
    if(find) return [find]
    return []
  }else{
    return messages.filter(m => m.type === type)
  }
}
console.log(get_message_list(4))  // [ { id: 4, title: 'Vuex', type: 'text' } ]
console.log(get_message_list('image'))
/*
[
  { id: 2, title: 'React', type: 'image' },
  { id: 5, title: 'React-Redux', type: 'image' }
]
*/

// ------------- Declaring this in a function ------------
const user = {
  age: 30,
  firstName: 'kyrie',
  lastName: 'irving',
  fullName() {
    return this.firstName + this.fullName
  }
}


// ------ rest parameters and arguments ------
function multiply(n: number, ...m: number[]) {
  return m.map(x => x * n)
}
console.log(multiply(2,2,3,4,5,6,7,8))
/*
[4,  6,  8, 10, 12, 14, 16]
*/

const args = [8, 5] as const
console.log(Math.atan2(...args))


// ---------- parameter destructuring ----------
function increment ({a, b, c}: {a:number; b:number; c:number}): number {
  return a + b + c
}
increment({a: 10, b: 20, c: 30})


type voidFunc = () => void
const hello1:voidFunc = () => 123
const hello2:voidFunc = () => true
const hello3:voidFunc = () => false
const hello4:voidFunc = () => '123'
console.log(hello1(), hello2(), hello3(), hello4()) // 123  true  false '123'


const source = [1, 2, 3, 4, 5]
const dest = [0]
source.forEach(el => dest.push(el))
console.log(dest) // [ 0, 1, 2, 3, 4, 5 ]

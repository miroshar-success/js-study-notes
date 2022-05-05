// ----------- operate -------------
// the keyof operator takes an object type and produces a string or numeric literal union of its keys.

type Point = {
  x: number
  y: number
}
type P = keyof Point


type ArrayMap = {
  [n: number]: string
}
type M = keyof ArrayMap

interface Player {
  firstName: string
  lastName: string
  age: 30
}

type PlayerKey = keyof Player


interface Singer {
  [key: string]: string
}
type SingerKey = keyof Singer


// ----------- typeof ------------
const s = 'hello'
const n: typeof s = 'hello'


type Predicate = (x: boolean) => boolean
type K = ReturnType<Predicate>


function f() {
  return {
    x: 10,
    y: 3
  }
}

type P1 = ReturnType<typeof f>
const o1: P1 = {
  x: 10,
  y: 3
}
// Remember that values and types aren't the same thing. To refer to the type that the values f has,
// we use typeof

type role = 'a' | 'b' | 'c'
const role_a: role = 'a'


// ------------- indexed access types ---------------
type Person = {age: number; name: string; alive: boolean}
type Age = Person['age']

type Person1 = Person['age' | 'name']
type Person2 = Person[keyof Person]
type AliveOrName = 'alive' | 'name'
type Person3 = Person[AliveOrName]


// ---------- get the type of an array's elements --------
const PersonArray = [
  {name: 'Alice', age: 15},
  {name: 'Bob', age: 23},
  {name: 'Eve', age: 38}
]
type PersonIndex = typeof PersonArray[number]
type age = typeof PersonArray[number]['age']

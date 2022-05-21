// --------------- Generics ---------------
/*
The identity function is a function that will return back whatever is passed in.
*/
function identity<Type>(arg: Type): Type {
  return arg
}
console.log(identity<number>(123))      // 123
console.log(identity<string>('123'))    // 123
console.log(identity<boolean>(false))   // false
console.log(identity<null>(null))       // null


interface GenericIdentifyFunction <Type> {
  (input: Type): Type
}
const identify_number:GenericIdentifyFunction<number> = (arg) => {
  return arg * 2
}
const identify_string:GenericIdentifyFunction<string> = arg => {
  return arg + '!'
}
console.log(identify_number(123))     // 246
console.log(identify_string('hello')) // hello!

// -------- Generic Classes --------
class GenericPoint<T> {
  private x: T
  private y: T
  constructor(x:T, y: T) {
    this.x = x
    this.y = y
  }
  toString() {
    if(typeof this.x === 'number' && typeof this.y === 'number') {
      return this.x + this.y
    }else{
      return this.x + '-' + this.y
    }
  }
}
const point_number = new GenericPoint<number>(1, 2)
const point_string = new GenericPoint<string>('1', '2')
console.log(point_number.toString(), point_string.toString()) // 3  1-2
/*
Generic classes are only generic over their instance side rather than their static side,
so when working with classes, static members can not use the class's type parameter.
*/


// --------------- Generic Constrains --------------
function loggingLength<T extends {length: number}>(arg: T): number {
  return arg.length
}
console.log(loggingLength([1, 2, 3, 4, 5, 6]))  // 6
console.log(loggingLength('hello world!'))      // 12



// ------------ Using Type Parameters in Generic Constraints ------------
function getProperty<Type, Key extends keyof Type>(obj:Type, key:Key) {
  return obj[key]
}
const car = {
  price: 1000000,
  color: 'red'
}
console.log(getProperty(car, 'color'))    // 'red'
console.log(getProperty(car, 'price'))    // 100000
// console.log(getProperty(car, 'm'))  // error



// --------------- keyof ---------------
type Triangle = { width: number; height: number;}
type TriangleProps = keyof Triangle   // 'width' | 'height'

type MapArray = {[k: string]: boolean}
type MapKey = keyof MapArray          // string | number


// ----------- typeof type operator ---------------
/*
TypeScript adds a typeof operator you can use in a type context to refer to the type of a
variable of property.
*/
const msg: string = 'Hello World!';
type MsgType = typeof msg   // string

type PredicateFunction = (x: boolean) => boolean
type PredicateFunctionType = ReturnType<PredicateFunction>  // boolean

function m1() {
  return {
    x: 10,
    y: 3
  }
}
type ReturnValueType = ReturnType<typeof m1>  // {x: number; y: number}



// -------- Indexed Access Types -----------
/*
We can use an indexed access type to look up a specific property on another type
*/
type Passenger = {
  age: number;
  name: string;
  alive: boolean;
}
type PassengerAge = Passenger['age']                  // number
type PassengerName = Passenger['name']                // string
type AgeOrName = Passenger['age' | 'name']            // string | number
type PassengerProperty = Passenger[keyof Passenger]   // string | number | boolean


/*
Another example of indexing with an arbitrary type is using number to get the type of an
array's elements.
*/
const Players = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23},
  { name: 'Eve', age: 38}
]
type PlayerObject = typeof Players[number]
/*
{name: string; age: number}
*/


// ----------- Mapped Types ---------
type OptionsFlagsProperty<Type> = {
  [property in keyof Type]: boolean
}
type Flags = {
  darkMode: () => void;
  newUserProfile: () => void;
}
type typeFlagsReturnType = OptionsFlagsProperty<Flags>
/*
{
  darkMode: boolean
  newUserProfile: boolean
}
*/

// -------- mapping modifiers --------
/*
There area two additional modifiers which can be applied during mapping: readonly and ?
which affect mutability and optional respectively!

You can remove or add these modifiers by prefixing with - or +. If you do not
add a prefix, then + is assumed.
*/
type CreatePerson<Type> = {
  -readonly [property in keyof Type]: Type[property]
}
type ReadonlyPerson = {
  readonly age: number;
  readonly firstName: string;
  readonly lastName: string;
}
type PersonRemoveReadonly = CreatePerson<ReadonlyPerson>
/*
{
  age: number;
  firstName: string;
  lastName: string;
}
*/

type MaybePerson = {
  id: number;
  name?: string;
  age?: number;
}
type RemoveOptional<Type> = {
  [property in keyof Type]-? : Type[property]
}
type ConfirmPerson = RemoveOptional<MaybePerson>
/*
{
  id: number;
  name: string;
  age: number;
}
*/

// ----------- Template Literal Types ------------

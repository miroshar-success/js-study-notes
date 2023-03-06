// ------- Object Type --------
function greet(person: {name: string; age: number}): string {
  return 'Hello' + person.name
}

interface Custom {
  name: string;
  age: number
}
function say(person: Custom): string {
  return 'Hello' + person.name
}

type Staff = {
  name: string;
  age: number
}
function hi(person: Staff): string {
  return 'Hello' + person.name
}

// ----------- Property Modifiers -----------
/*
Each property in an object type can specify a couple of things: the type, whether the
property is optional, and whether the property can be written to.
*/

interface PaintOptions {
  shape: string
  x?: number;
  y?: number
}
function paint(opts: PaintOptions) {
  if(opts.x && opts.y) return opts.x * opts.y
}
console.log(paint({shape: 'square', x:10, y:10})) // 100
console.log(paint({shape: 'square'}))             // undefined

/*
setting defaults for unspecified values is so common that JavaScript has syntax to support it.
*/
function paintShape({shape, x = 0, y = 0}: PaintOptions) {
  return x * y
}
console.log(paintShape({shape: 'square', x:10, y:10}))  // 100
console.log(paintShape({shape: 'square'}))              // 0


// ------------ readonly ----------
type StaffProps = {
  readonly age: number
}
function getStaff(s: StaffProps) {
  // s.age = 20 can not assign to prop because it is a read-only property
  return s.age
}

/* readonly 表示值不能被重写 */

type IncrementProps = {
  readonly count: {
    value: number
  }
}
function increment(s: IncrementProps) {
  s.count.value += 1
}
const increment_object = {
  count: { value: 1}
}
increment(increment_object)
increment(increment_object)
console.log(increment_object) // { count: { value: 3 } }


interface Talker {
  name: string;
  age: number
}
interface ReadonlyTalker {
  readonly name: string
  readonly age: number
}
const talker: Talker = {
  name: 'kyrie',
  age: 30
}
const readonlyTalker:ReadonlyTalker = talker
talker.age += 1
console.log(readonlyTalker) // { name: 'kyrie', age: 31 }



// -------- index signatures -------
interface StringArray {
  [index: number]: string
}
const talkers: StringArray = ['1', '2', '3', '4', '5']

interface NumberDirectory {
  [index: string]: number | string
  length: number
  name: string
}

interface ReadonlyStringArray {
  readonly [index: number]: string
}

// --------- extending types -------
/*
Is is pretty common to have types that might be more specific versions of other types.
The extends keyword on an interface allows us to effectively copy members from other named types,
and add whatever members we want.
*/
interface BasicAddress {
  name?: string
  street?: string
  city: string
}
interface AddressWithUnit extends BasicAddress {
  unit: string
}

interface Colorful {
  color: string
}
interface Circle {
  radius: number
}
interface ColorfulCircle extends Colorful, Circle {
  color: 'red',
  radius: 10
}

// -------------- Intersection Types ------------
type TypeColorfulCircle = Colorful & Circle
/*
Here, we have intersected Colorful and Circle to produce a new type that has all the members of
Colorful and Circle
*/


// ------ Generic Object Types -------
interface Box<Type> {
  contents: Type
}
const box1: Box<string> = {
  contents: '12345'
}
const box2: Box<number> = {
  contents: 12345
}

type Container<Type> = {
  goods: Type
}
const container1:Container<string[]> = {
  goods: ['1', '2']
}
const container2:Container<number[]> = {
  goods: [1, 2, 3]
}


// --------------- Array -------------
/*
interface Array<Type> {
  length: number;
  pop(): Type | undefined;
  push(items: Type[] ): number;
}
*/

// ------- ReadonlyArray -------
/*
The ReadonlyArray is a special type that describes arrays that should not be changed
*/
const readonlyStringArray: ReadonlyArray<string> = ['1' , '2', '3']
// readonlyStringArray[0] = '2'  // error
// readonlyStringArray.push('4')  // error



// --------- Tuple Types ----------
/*
A tuple type is another sort of Array type that knows exactly how many elements it contains,
and exactly which types it contains at specific positions.
*/
const stringHash:[number, string] = [1, '1']
const numbers: [number, number, number] = [1, 2, 3]

/*
tuples can have optional properties by writing a question mark after an element's type
*/
type OptionalTuple = [number, number, string?]
const optionalArray1 = [1, 2, '1']
const optionalArray2 = [1, 2]

type StringNumberBooleans = [string, number, ...boolean []]
// type StringBooleanNumbers = [string, ...boolean[], number]
// type BooleanStringNumber = [...boolean[], string, number]
// 扩展运算符必须在最末尾
const stringNumberBooleanArray: StringNumberBooleans = ['1', 2, false, true, false]

export {}

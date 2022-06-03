/*
Enums allow a developer to define a set of named constants.
*/
// ---------- numeric enums -----------
enum Direction {
  LEFT,
  RIGHT,
  UP,
  DOWN
}
function respond(recipinet: string, message: Direction): void {
  console.log(recipinet, message)
}
respond('hello', Direction.DOWN)  // 3


enum Color {
  RED = 'red',
  BLUE = 'blue',
  YELLOW = 'yellow'
}

function getColor(message: string) {
  console.log(Color, message)
}
getColor(Color.BLUE)
getColor(Color.RED)
getColor(Color.RED)
/*
{ RED: 'red', BLUE: 'blue', YELLOW: 'yellow' } blue
{ RED: 'red', BLUE: 'blue', YELLOW: 'yellow' } red
{ RED: 'red', BLUE: 'blue', YELLOW: 'yellow' } red
*/


// computed and constant numbers
enum FileAccess {
  None,
  Read = 1 << 2,
  Write = 1 << 1,
  ReadWrite = Read | Write,
  G = '123'.length
}

console.log(FileAccess.None, FileAccess.Read, FileAccess.Write, FileAccess.ReadWrite, FileAccess.G)
// 0 4 2 6 3


// -------- union enums and enum member -------
enum ShapeKind {
  Circle,
  Square
}
interface Circle {
  kind: ShapeKind.Circle
  radius: number
}
interface Square {
  kind: ShapeKind.Square,
  sideLength: number
}

const circle: Circle = {
  kind: ShapeKind.Circle,
  radius: 100
}
const square: Square = {
  kind: ShapeKind.Square,
  sideLength: 200
}

console.log(circle, square) // { kind: 0, radius: 100 } { kind: 1, sideLength: 200 }

// ------- string enums ------
enum Message {
  Success = 'Success',
  Warn = 'Warn',
  Error = 'Error'
}
// string enums do not have auto-incrementing behavior.


// ----------- Enums at runtime --------
enum E {
  X,
  Y,
  Z
}
console.log('e:', E)
/*
{ '0': 'X', '1': 'Y', '2': 'Z', X: 0, Y: 1, Z: 2 }
*/

// ----------- Enums at compile time ----------
/*
Even though Enums are real objects that exist at runtime, the keyof keyword works differently you might
expect for typical objects. Instead, use keyof typeof to get a Type that represents all Enum keys
as strings
*/
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG
}
type LogLevelStrings = keyof typeof LogLevel
// type LogLevelStrings = "ERROR" | "WARN" | "INFO" | "DEBUG"

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key]
  if(num <= LogLevel.WARN) {
    console.log("Log level key is:", key);  // 'ERROR'
    console.log("Log level value is:", num);  // 0
    console.log("Log level message is:", message);
  }
}
printImportant('ERROR', 'This is a message')

// Keep in mind that string enum members do not get a reverse mapping generated at all.
enum Size_1 {
  Big = 'big',
  Small = 'small',
  Middle = 'middle'
}
enum Size_2 {
  Big,
  Small,
  Middle
}
console.log('size:' ,Size_1, Size_2)  // { Big: 'big', Small: 'small', Middle: 'middle' }
/*
{
  '0': 'Big',
  '1': 'Small',
  '2': 'Middle',
  Big: 0,
  Small: 1,
  Middle: 2
}
*/

// --------- const enum Enum ---------
/*
Const enum members are inlined at use sites.They are completely removed during compilation.
*/
const enum Follow {
  Up,
  Down,
  Left,
  Right
}
const directions = [Follow.Down, Follow.Left, Follow.Right, Follow.Up]
console.log(directions)
/* [ 1, 2, 3, 0 ] */


const enum Code {
  SUCCESS_CODE = 0,
  ERROR_CODE = 100 * 2,
  WARNING_CODE = SUCCESS_CODE * 3
}
const codes = [Code.ERROR_CODE, Code.SUCCESS_CODE, Code.WARNING_CODE]
console.log(codes)  // [ 200, 0, 0 ]

const enum BackCode {
  SUCCESS_CODE = 'success',
  ERROR_CODE = 'error',
  WARNING_CODE = 'warning'
}
const back_codes = [BackCode.ERROR_CODE, BackCode.SUCCESS_CODE, BackCode.WARNING_CODE]
console.log(back_codes) // [ 'error', 'success', 'warning' ]


// ----------- object vs enum
const enum EDirection {
  Up,
  Down,
  Left,
  Right
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3
} as const

console.log('oDirection', ODirection) // { Up: 0, Down: 1, Left: 2, Right: 3 }

function walk(dir: EDirection) {
  console.log(dir)
}
walk(EDirection.Down)
walk(EDirection.Left)


type DirectionValue = typeof ODirection[keyof typeof ODirection]

export {

}

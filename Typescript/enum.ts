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
respond('hello', Direction.DOWN)


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



// ----------- Enums at runtime --------
enum E {
  X,
  Y,
  Z
}
function f(obj: {X: number}) {
  console.log(obj.X)  // 0
  // @ts-ignore
  console.log(obj.Y)  // 1
}
f(E)


// ----------- Enums at compile time ----------
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG
}
type LogLevelStrings = keyof typeof LogLevel
console.log(typeof LogLevel)  // object
function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key]
  if(num <= LogLevel.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}
printImportant('ERROR', 'This is a message')


// --------- const enum Enum ---------
const enum Follow {
  Up,
  Down,
  Left,
  Right
}
let directions = [Follow.Down, Follow.Left, Follow.Right, Follow.Up]
console.log(directions)
/* [ 1, 2, 3, 0 ] */

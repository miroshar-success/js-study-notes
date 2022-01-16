enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

const up:Direction = Direction.Up
const down:Direction = Direction.Down
console.log(up, down) // 1 2


enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue'
}
const red:Color = Color.Red
const green:Color = Color.Green
const blue:Color = Color.Blue
console.log(red, green, blue) // red  green   blue


// --------------- 常数枚举 --------------
const enum Enum {
  A = 1,
  B = 2
}

const a:Enum = Enum.A
const b:Enum = Enum.B
console.log(a, b)

const enum Directions {
  Up,
  Down,
  Left,
  Right
}
const directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
console.log('directions', directions) // [0,1,2,3]

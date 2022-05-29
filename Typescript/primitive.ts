// -------------------------- 原始类型 --------------------
// 布尔值
const isDone:boolean = false;

// 数字
const decLiteral:number = 6
const hexLiteral:number = 0xf00d
const binaryLiteral:number = 0b1010
const octalLiteral:number = 0o744

// 字符串
const player:string = 'bob'
console.log(player) // bob

// --- 模版字符串 ----
const singer:string = `${player}`;
const age:number = 37
const sentence:string = `${player} is ${age} years old`;


// ---- 数组 -----
const player_list: string[] = ['kyrie','lebron']
player_list.push('wade')
console.log(player_list.length)
const numberArray:Array<number> = [1,2,3]

// --- 元祖 ----
const stringArray:[number, string] = [1,'1'];
console.log(stringArray[0], stringArray[1]) // 1 '1'


// -------- 枚举 -------
enum Color {
  Red,
  Green,
  Blue
}
const red:Color = Color.Red;
const green:Color = Color.Green;
const blue:Color = Color.Blue;
console.log(red, green, blue) // 0 1 2

enum Direction {
  Left = 'left',
  Right = 'right',
  Top = 'top',
  Down = 'down'
}
const left:Direction = Direction.Left;
console.log(left) // left

// ------ any ------
const notSure:any = 4;
console.log(notSure.toFixed(2))


// ----- void ------
function greeting(name:string):void{
  console.log(`hello, ${name}`)
}

// ----- null和undefined ------   可以赋值给所有类型，是所有类型的自类型
const not_sure_1:any = null
const not_sure_2:any = undefined;


// ----- never -------  表示那些永不存在的值的类型,是任何类型的子类型,可以赋值给任何类型。
// 没有类型是never的子类型或者可以赋值给never类型
function getResult():never{
  throw new Error('error')
}

// ----- 类型断言 ------
const stringValue:any = 'This is a string';
const stringLength:number = (<string>stringValue).length
const stringLength_1:number = (stringValue as string).length

// ---- 元素 --------

const players: string[] = ['kyrie', 'lebron']
players[0] = 'irving'

const readonly_players: Readonly<string[]> = ['kyrie', 'lebron']
// readonly_players[0] = 'irving' // 报错

const readonly_singers = ['jay', 'mayday'] as const
// readonly_singers[0] = 'wang'  // readonly
// 不用添加数组元素的类型

export {

}
